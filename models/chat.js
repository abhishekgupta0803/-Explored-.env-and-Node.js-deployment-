const mongoose = require('mongoose');
require('dotenv').config();

main().then(()=>{
    console.log("Connect to DB");

}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

}

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    mess:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        required:true,

    },
});

const chat =  mongoose.model("chat",chatSchema);
module.exports = chat;