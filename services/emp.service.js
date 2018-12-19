var logger = require('../util/logger');
var STATUS_CODES = require('../util/statuscodes');
var employeeModel = require('../models/emp.model');

//This function is used to insert employee data

var postEmployee = async (req,res,next)=>{
    console.log("URL hit to :",req.hostname,req.originalUrl);
    logger.info("Entered into post Employee service");

    try{
        let payLoad = req.body;
        if(payLoad != undefined)
        {
            let empData = await employeeModel.Employee.create(payLoad);
            res.status(STATUS_CODES.OK).send({
                "statusCode" : STATUS_CODES.OK,
                "info":"Employee Data inserted",
                "employees" : empData
            })
        }
    }
    catch(e)
    {
        next(e);
    }
    }

//Get All employees data

var getAllEmployees = async(req,res,next)=>{
 
//logger
console.log("URL hit to :",req.hostname,req.originalUrl);
//logger.info("URL hit to :",req.hostname);
logger.info("Entered into get AllEmployess Service");
    try 
    {
        let empData =  await employeeModel.Employee.findAll({
            where: {isDeleted:0}
        });
        // console.log()
        res.status(STATUS_CODES.OK).send({
            "statusCode": STATUS_CODES.OK,
            "info": "List of Employees",
            "employees": empData
        })
    }
    catch (e) 
    {
        logger.error(e.message);
        // res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
        //     "statusCode": STATUS_CODES.INTERNAL_SERVER_ERROR,
        //     "info": "List of Employees",
        //     "error": e
        // })
        // next({
        //         "statusCode": STATUS_CODES.INTERNAL_SERVER_ERROR,
        //         "info": "List of Employees",
        //         "error": e
        //     })
    }
    }

//This function is to get Single Employee Data based on Id

var getEmployeeById =  async (req,res,next)=>{

    console.log("URL hit to",req.hostname,req.originalUrl);
    //console.log(req.originalUrl);
    logger.info("Entered into get Employee By id service");
    try{

        var empId = req.params.id;
        let empData = await employeeModel.Employee.findById(empId);

        if(empData !=undefined)
        {
            res.status(STATUS_CODES.OK).send({
                "statusCode": STATUS_CODES.OK,
                "info": "List of Employees",
                "employees": empData
            })
        }
        else
        {
            res.status(STATUS_CODES.NOT_FOUND).send({
                "statusCode":STATUS_CODES.NOT_FOUND,
                "info":"Id not Found",
                "employees":empData
            })
        }
    }
    catch(e)
    {
        next(e);
        logger.error(e)
    }
    }

    //This function is to update the employee based on id

    var updateEmployee =  async (req,res,next)=>{
        console.log("URL hit to",req.hostname,req.originalUrl);
        logger.info("Entered into update employee By id service");
    try{

        var data = {    
            "id": req.params.id,  
            "MiddleName": req.body.MiddleName  
        };  
      
        var empData= employeeModel.Employee.update(data, {  
            where: {  
                id: data.id  
            }  
        })
        var result= await empData;
        if(result !=undefined)
        {
            res.status(STATUS_CODES.OK).send({
                "statusCode": STATUS_CODES.OK,
                "info": "Successfully Updated",
                "employees": empData
            })
        }
        else
        {
            res.status(STATUS_CODES.BAD_REQUEST).send({
                "statusCode":STATUS_CODES.BAD_REQUEST,
                "info":"List of Employees",
                "employees":empData
            })
        }
    }
    catch(e)
    {
        //next(e)
        logger.error(e);
    }
}

//This function is to delete employee information
var deleteEmployee =  async (req,res,next)=>{

    console.log("URl hit to",req.hostname,req.originalUrl);
    logger.info("Entered into delete Employee information by id service");

    try{
        //var empId = req.params.id;
        let empData = await employeeModel.Employee.update({isDeleted : 1},{where:{id:req.params.id}});
        if(empData!=undefined)
        {
            res.status(STATUS_CODES.OK).send({
                "statuscode":STATUS_CODES.OK,
                "info":"Successfully Deleted",
                "employees":empData
            })
        }
        else
        {
            res.status(STATUS_CODES.BAD_REQUEST).send({
                "statuscode":STATUS_CODES.BAD_REQUEST,
                "info":"List of employees",
                "employees":empData
            })
        }
    }
    catch(e)
    {
        logger.error(e.message);
        //console.log(e);
    }
}
module.exports={
    getAllEmployees:getAllEmployees,
    postEmployee:postEmployee,
    getEmployeeById:getEmployeeById,
    updateEmployee:updateEmployee,
    deleteEmployee:deleteEmployee
}