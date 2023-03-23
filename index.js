const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple Node Server Running');
});

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gmail.com' },
];
/* app.get('/users',(req,res)=>{
    if(req.query.name){
        const search = req.query.name;
        const filtered = users.filter(usr=>usr.name.toLowerCase().indexOf(search)>=0)
        res.send(filtered);
    }else{

        res.send(users);
    }
}); */

//user:dbuser1
//password: bOycYsPKgjuFjOSh


const uri = "mongodb+srv://dbuser1:bOycYsPKgjuFjOSh@cluster0.rbhccf3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
       
            const collection = client.db("simpleNode").collection("users");
            // perform actions on the collection object
            //const user = {name:"Anik", email:"anik2@gmail.com" }
           // const result = await collection.insertOne(user)

           app.get('/users', async (req,res)=>{
            const cursor = collection.find({});
            const users = await cursor.toArray();
            res.send(users);
           })
            app.post('/users',async (req,res)=>{
                const user = req.body;
                const result = await collection.insertOne(user);
                console.log(result);
                user.id = result.insertedId;
                res.send(user)
            })
       
    }
    finally{

    }
}
run().catch(console.dir)


/* app.post('/users',(req,res)=>{
    console.log('Post api called');
    const user = req.body;
    user.id = users.length + 1
    users.push(user);
    console.log(user);
    res.send(user)
}) */

app.listen(port, () => {
    console.log(`Simple not server running on port ${port}`);
})