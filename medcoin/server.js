//Communicates with Client to get data from it.

const express = require('express');
const server = express();

server.use(express.urlencoded({extended: false}));
server.use(express.json());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Blockchain = require('./index')
const d = new Blockchain();
var i = 4;
const PORT = process.env.PORT || 3000;


server.use(express.urlencoded({extended: false}));
server.use(express.json());


server.listen(PORT, ()=>
{
    console.log("****SERVER RUNNING****");
});



async function getData()
    {
        try
        {
            server.post("/", (req, res) => 
            { 
                d.createNewBlock(++i,+ new Date(), req.body.body)
                res.write(`index ${i} added`)
                res.status(200).end();
            });
            
        }

        catch(e)
        {
            console.log(e);
        }


    }

    getData()