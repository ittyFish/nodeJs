import { User,userValidator,userValidatorFromLogin } from "../Model/user";

export const addUser =async (req, res)=>{
    let validate= userValidator(req.body)
    if(validate.error)
       return res.status(400).json({type:"not valid", message: validate.error.details[0].message})
    let { userName,tz,email}=req.body;

    try{
        let sameUser= await  await User.findOne({$or:[{userName : userName },{tz:tz}]})
        if (sameUser)
         return res.status(409).json({ type: "same user", message: "user with same credentials already exists" })
        let newUser = new User({userName,tz,email});
        await newUser.save();
        return res.json(newUser)
    }
    catch(err){
        res.status(400).json({ type: "error", message: err.message })
    }

    }

    export const login =async (req, res)=>{
        let validate= userValidatorFromLogin(req.body)
        if(validate.error)
           return res.status(400).json({type:"not valid", message: validate.error.details[0].message})
        let { userName,tz,email}=req.body;
    
        try{
            let user= await User.findOne({ password:req.body.password, userName:req.body.username })
            if (!user)
             return res.status(409).json({ type: "no such user", message: "please sign up" })
           user.password="****" 
           return user;
           
        }
        catch(err){
            res.status(400).json({ type: "error", message: err.message })
        }
    
        }
    

