import mongoose from"mongoose";
import { prodModel } from "../Model/product.js";

const getAllProducts= async (req,res)=>{

    let { search } = req.query;
    let perProd=req.query.perProd || 1;
    let prod = req.query.prod || 9;
    
    let ex1 = new RegExp(`${search}`)
    try{
        let filter = {};
        if(search)
        filter.name = ex1;


        let allProd=await prodModel.find(filter)
        .skip(prod*(perProd-1))
        .limit(prod)


        res.json(allProd)
    }
    catch (err){
       res.status(400).send("error in out details "+err.message)
     
    }
}

const getProdbyId= async (req,res,next)=>{
    try{
      if(!mongoose.isValidObjectId(req.params.prodid))
             return res.status(400).send("not ok");
       let prod =await prodModel.findById(req.params.prodid) 
       if(!prod)    
            return res.status(400).send("not have this product");  
        res.json(prod)
    }
    catch (err){
       res.status(400).send("error in out details "+err.message)
    }
}

const deleteProdbyId= async (req,res)=>{
    try{
      if(!mongoose.isValidObjectId(req.params.prodid))
             return res.status(400).send("not ok");

       let prod =await prodModel.findByIdAndDelete(req.params.prodid) 

       if(!prod) 
           return res.status(400).send("not have this product"); 

        res.json(prod)
    }
    catch (err){
       res.status(400).send("error in delete details "+err.message)
    }
}


const updateProd= async (req,res)=>{
    try{
      if(!mongoose.isValidObjectId(req.params.prodid))
             return res.status(400).send("not ok");

       let prodToUpdate =await prodModel.findById(req.params.prodid) 

       if(!prodToUpdate) 
           return res.status(400).send("not have this product"); 
        await prodModel.findByIdAndUpdate(req.params.prodid,req.body);
        let prod = await prodModel.findById(req.params.prodid);
        res.json(prod)
    }
    catch (err){
       res.status(400).send("error in delete details "+err.message)
    }
}

const addProd= async (req,res)=>{
    let { name,price,company}=req.body;
    if(!name||!price)
        return res.status(404).send("name and price are required")

    try{
       let sameprod= await prodModel.find({name,price});
       if(sameprod.length >0)
           return res.status(409).send("a prod whith this name and price is exist") 
        let newProd = new prodModel({name,price,company}) 
        await newProd.save();
        res.json(newProd);
    
    }
    catch (err){
       res.status(400).send("error in add details "+err.message)
    }
}
 export {getAllProducts,getProdbyId,deleteProdbyId,updateProd,addProd}