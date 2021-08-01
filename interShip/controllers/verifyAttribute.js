


const Joi = require('@hapi/joi');
const { Mongoose } = require('mongoose');

const registerValidation = data =>{
    const Schema = Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        phone: Joi.string().min(7).required(),
        role: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
        
    });  

    return Schema.validate(data);
};

const loginValidation =data =>{
    const Schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(7).required(),
        

    });  

    return Schema.validate(data);
};

module.exports.registerValidation =registerValidation;
module.exports.loginValidation = loginValidation;