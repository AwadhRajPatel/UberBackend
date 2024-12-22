const mongoose = require('mongoose');

async function connectDb(){
    try{
        await mongoose.connect( process.env.DB_CONNECT);
        console.log("Successfully connected to the mongo db server.....");
    }catch(error) {
      console.log("Not able to mongoose.connect db server");
      console.log(error);
    }
}
   
module.exports = connectDb;
 