import Joi from "joi";
import mongoose from "mongoose";
const minProduct =mongoose.Schema({
    name:String,
    price:Number
})

let userSchema =mongoose.Schema({
    tz:String,
    userName:String,
    email:String,
    product:[minProduct]
})

export const User = mongoose.model("users",userSchema)

export const userValidator = (_user)=>{
    const schema=Joi.object({
        userName:Joi.string().min(3).max(15).required(),
        tz:Joi.string().min(9).max(9).pattern(/^[0-9]{0-9}$/).required(),
        email:Joi.string().email().required()
    });
    return schema.validate(_user)
}

export const userValidatorFromLogin = (_user)=>{
    const schema=Joi.object({
        userName:Joi.string().min(3).max(15).required(),
        password:Joi.string().pattern(new RegExp('[a-zA-Z0-9]{3,15}$')).required()
        
    });
    return schema.validate(_user)
}