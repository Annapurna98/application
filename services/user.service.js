var logger = require('../util/logger');
var STATUS_CODES = require('../util/statuscodes');
var userModel = require('../models/user.model');
var bcryptjs = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var uuidv1 = require('uuid/v1')
var jwt = require('jsonwebtoken');

//This is used to add a user
var addUser = async (req,res,next)=>{

    console.log("URL hit to",req.hostname,req.originalUrl);
    logger.info("Entered into post user data service");

    try{
        var payLoad = req.body;
        if(payLoad!=undefined && payLoad!=null)
        {
            bcryptjs.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
                if(err){
                    logger.error(err);
                }
                else{
                    bcryptjs.hash(payLoad.password,salt,async (err,hash)=>{
                    if(err){
                        logger.error(err);
                    }
                    else
                    {
                        try{
                        payLoad.userid = uuidv1();
                        payLoad.isDeleted = 0;
                        payLoad.password = hash;

                        var userData = await userModel.User.create(payLoad);
                        if(userData){
                            res.send(userData);
                        }
                        else{
                            res.send({
                            "statusCode" : STATUS_CODES.BAD_REQUEST,
                            "info" : "User is not registered" ,
                            "error" : userData
                            })
                        }
                        }
                        catch(e){
                            next(e);
                            logger.error(e);
                        }
                    }
                    })
                }

            })
        }

        
    }
    catch(e)
    {
        logger.error(e);
    }
}

//This function is used to login a particular user

var loginUser = async (req,res,next)=>{

    console.log("URL hit to",req.hostname,req.originalUrl);
    logger.info("Entered into post user data service");

    try{
        
        var userData = await userModel.User.findOne({
            where:
            {
                email : req.body.email
            }
        });
        if(userData)
        {
            bcryptjs.compare(req.body.password,userData.password,async (err,isMatch)=>{
               
                if(err)
                logger.error(err);
                if(isMatch)
                {
                    var token = await jwt.sign({email : userData.email},"ANNAPURNA",{expiresIn : '50s'});
                    res.status(STATUS_CODES.OK).send({
                        "statusCode" : STATUS_CODES.OK,
                        "info" : "Login Successful",
                        "user" :{
                            "email" : userData.email,
                            "token" : token
                        }
                    })
                }
                else
                {
                    res.status(STATUS_CODES.BAD_REQUEST).send({
                        "statusCode" : STATUS_CODES.BAD_REQUEST,
                        "error" : "Password doesnot match"
                    })
                }
            })
        }
        else
        {
            res.status(STATUS_CODES.BAD_REQUEST).send({
                "statusCode" : STATUS_CODES.BAD_REQUEST,
                "error" : "E-mail not found"
            })
        }


    }
    catch(e)
    {
        logger.error(e);
    }
}

module.exports = {
    addUser : addUser,
    loginUser : loginUser
}

