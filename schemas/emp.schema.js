var joi = require('joi');

var empSchema ={
    body:{
    //id:joi.string.required(),
    FirstName:joi.string().required(),
    MiddleName:joi.string().allow(null).allow(""),
    LastName:joi.string().required(),
    Gender:joi.string().required(),
    DateOfBirth:joi.string().required(),
    Email:joi.string().required(),
    Phone:joi.number().required(),
    Designation:joi.string().required(),
    Project:joi.string().required(),
    Module:joi.string().required(),
    City:joi.string().required(),
    State:joi.string().required(),
    Country:joi.string().required(),
    PostalCode:joi.number().required(),
    isDeleted:joi.number().required()
    }
}

module.exports={
    empSchema:empSchema
}