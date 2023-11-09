const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pzjaifg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    console.log('mongodb connected')

    const foodCollections = client.db('ManageKitchen').collection('foods')
    app.post('/foods', async(req,res) =>{

        const foods = req.body;
       
        const result = await foodCollections.insertOne(foods)
        res.send(result)
    })

    app.get('/foods', async(req,res) =>{
        const query = {}
        const cursor =  foodCollections.find(query)
        const foods = await cursor.limit(3).toArray()
        res.send(foods)
    })
    app.get('/foods/:id', async(req,res) =>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const food = await foodCollections.findOne(query)
        res.send(food)
    })

  }
finally {
    
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('samiras kitchen')
})

app.listen(port, () =>{
    console.log(`sa iras kitchen running on ${port}`)
})
//samirasKitchen

//X9A2oJqcLbqTwWjY