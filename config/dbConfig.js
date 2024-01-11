import mongoose from "mongoose";

// mongoose.connect(`${mongoUrl}/${process.env.DB_NAME||"library_prod"}`)
// .then(suc=>{console.log("mongodb connect on host "+ suc.connection.host)})
// .catch(err=>{
//     console.log(err);
//     console.log("canot nongodb");
//     process.exit(1);
// })
export const connectToDb = async ()=>{
try{
    const mongoUrl=process.env.BD_CONNECT||"mongodb://localhost:27017"
    let con=await mongoose.connect(`${mongoUrl}/${process.env.DB_NAME||"library_prod"}`)
    console.log("mongodb connect on host "+ con.connection.host)
}
catch (err){
    console.log(err);
    console.log("canot nongodb");
    process.exit(1);
}}
