process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require("axios");

const category = process.argv[2] || "inspirational";

async function getQuote(){
    try{
        const res = await axios.get(`http://api.quotable.io/random?tags=${category}`);
        console.log(`\n ${res.data.content} = ${res.data.author}\n`);
    }catch(err){
        console.error("error frcthing qoute: ",err.message);
    }
}

getQuote();