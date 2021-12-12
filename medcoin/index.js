const SHA256 = require('crypto-js/sha256');
const mongoose  = require('mongoose');
const MONGODB_URI = "mongodb+srv://sgaglani:merrychristmas@cluster0.en813.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI, {useNewUrlParser : true, useUnifiedTopology: true});

mongoose.connection.on("connected", () => {
    console.log("connected!!!!!!!!!!!!!!!!!!!!")
});

const Schema = mongoose.Schema;
const mongoblock = new Schema({

            index : String,
            timestamp : String,
            data : String,
            previous_hash : String,
            hash : String,
            nonce : String

});

let block_model = mongoose.model('NewChain', mongoblock);


class Block
{
    constructor(index, timestamp, data, previous_hash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previous_hash = previous_hash;
        this.hash = this.generateHash();
        this.nonce = 0;
    }

    generateHash()
    {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previous_hash + this.nonce).toString();
    }

    mineBlock(difficulty)
    {
        while(this.hash.substring(0,difficulty) != Array(difficulty + 1).join("0"))
        {
            this.nonce += 1;
            this.hash = this.generateHash();

        }
    }


}



   class Blockchain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
        return new Block(0, '25/09/2021', "abcd", "0")
    }

    getLastBlock()
    {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock)
    {
        newBlock.previous_hash = this.getLastBlock().hash; 
        newBlock.mineBlock(2); 
        this.chain.push(newBlock);
    }


    isChainValid()
    {
        for(let i = 1; i< medCoin.length; i++)
        {
            const currentBlock = medCoin[i]
            const previousBlock = medCoin[i-1];

            if(currentBlock.previous_hash == previousBlock.hash)
            {
                return false
            }

             if(currentBlock.hash != currentBlock.generateHash())
            {
                return false;
            }
        }

        return true;
    }

    createNewBlock(index, date, data)
    {
        let medCoin = new Blockchain();
        let nextBlock = new Block(index, date, data)

        medCoin.addBlock(nextBlock);
        const newchain = new block_model(nextBlock)

        //console.log(JSON.stringify(medCoin, null, 5));
        //console.log(medCoin.isChainValid());

        newchain.save((e) => {
            if(e)
            {
                console.log("OOPS")
            }

            else
            {
                console.log("successfully added")
            }
        })
    }
    
}


  




module.exports = Blockchain;
