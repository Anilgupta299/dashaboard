const mongoose=require("mongoose");
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected successfylly");
    }catch(error){
        console.log("MongoDb connected error",error.message);
        throw error;
    }
};
module.exports= connectDb;