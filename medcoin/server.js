//Communicates with Client to get data from it.

const express = require('express');
const server = express();

server.use(express.urlencoded({extended: false}));
server.use(express.json());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Blockchain = require('./index')
const d = new Blockchain();
var i = 0;



server.listen(3000, ()=>
{
    console.log("****SERVER RUNNING****");
});

async function getData()
    {
        try
        {
            server.post("/", (req, res) => 
            { 
                d.createNewBlock(++i, "27/10/2020", req.body.body)
                res.write(`index ${i} added`)
            });
            
        }

        catch(e)
        {
            console.log(e);
        }


    }

    getData()