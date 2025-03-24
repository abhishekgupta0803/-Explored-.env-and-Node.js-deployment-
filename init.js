const mongoose = require('mongoose');
const chat = require("./models/chat.js");
require('dotenv').config();
main().then(() => {
    console.log("Connect to DB");

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URL);

};

const AllChat = ([
    {
        from: "Abhishek",
        to: "Ashi",
        mess: "Hello",
        created_at: new Date(),
    },

    {
        from: "kamal",
        to: "Raju",
        mess: "Homework is done",
        created_at: new Date(),
    },
    {
        from: "Bilal",
        to: "Shradh",
        mess: "My placement package is 90LPA",
        created_at: new Date(),
    },
    {
        from: "Prshant",
        to: "Birju",
        mess: "Where is my notebooks",
        created_at: new Date(),
    },
    {
        from: "Rashmi",
        to: "Naina",
        mess: "motiii",
        created_at: new Date(),
    },
    {
        from: "Bablu",
        to: "Varsha",
        mess: "Hello dii",
        created_at: new Date(),
    },
    {
        from: "Jitendra",
        to: "Tappu",
        mess: "I like it",
        created_at: new Date(),
    },
]);


chat.insertMany(AllChat);