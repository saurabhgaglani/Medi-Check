//Communicates with Client to get data from it.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Blockchain = require('./index')
const d = new Blockchain();


async function getData()
    {
        try
        {
            await fetch('https://api.github.com/users/saurabhgaglani').then(response => response.json()).then(data => 
            {
                const map1 = new Map();
                let login = data.login;
                let id =  data.id;
                map1.set('login', login);
                map1.set('id', id);
                d.createNewBlock(1,'27/10/2020', login);
                
            });
        }

        catch(e)
        {
            console.log(e);
        }


    }

    getData()
