import mongoose from "mongoose";

const prodSchema=mongoose.Schema({
    name:{type:String, required:true},
    price:Number,
    company:String
})

export const prodModel =mongoose.model("products",prodSchema)