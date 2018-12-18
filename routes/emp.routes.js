const express = require('express');
const router = express.Router();
var logger = require('../util/logger');
const joi=require('express-joi-validator');
const schema = require('../schemas/emp.schema');
const service = require('../services/emp.service');
//var employeeModel = require('../models/emp.model');
// const connection=require('../database/connection');
// const util=require('../util/statuscodes');
// const empModel = require('../models/emp.model');


router.post('/postemployee',joi(schema.empSchema),service.postEmployee);
router.get('/getallemployees',service.getAllEmployees);
router.get('/getemployeebyid/:id',service.getEmployeeById);
router.put('/updateemployee/:id',service.updateEmployee);
router.delete('/deleteemployee/:id',service.deleteEmployee);
//Testing purpose
// router.put('/updateemployee', function(req, res) {  
//     var data = {    
//         "id": req.body.id,  
//         "MiddleName": req.body.MiddleName  
//     };  
  
//     employeeModel.Employee.update(data, {  
//         where: {  
//             id: data.id  
//         }  
//     }).  
//     then(function(data) {  
//         res.status(200).json(data);  
//     }, function(error) {  
//         res.status(500).send(error);  
//     });  
// }); 


module.exports = router;
