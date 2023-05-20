const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Middleware starts here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use(cors());
app.use(express.json());
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Middleware Ends here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MongoDB codes Starts here>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1nqrclq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const theCollection = client.db("toyGem").collection("toyCollection");

    // 1. POST/CREATE
    app.post("/users", async (req, res) => {
      const user = req.body;
      body.createdAt = new Date();
      console.log("new toy", user);
      const result = await theCollection.insertOne(user);
      res.send(result);
    });

    // 2. GET/READ
    app.get("/users", async (req, res) => {
      const cursor = theCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // 3. GET specific user by ID
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("fetching user", id);
      const query = { _id: new ObjectId(id) };
      const result = await theCollection.findOne(query);
      res.send(result);
    });

    // 4. PUT/UPDATE user by ID
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log("updating user", id);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          name: user.name,
          img: user.img,
          sellerName: user.sellerName,
          sellerEmail: user.sellerEmail,
          subCategory: user.subCategory,
          price: user.price,
          rating: user.rating,
          quantity: user.quantity,
          description: user.description,
        },
      };
      const result = await theCollection.updateOne(
        filter,
        updatedUser,
        options
      );
      res.send(result);
    });

    // 5. DELETE user by ID
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("deleting user", id);
      const query = { _id: new ObjectId(id) };
      const result = await theCollection.deleteOne(query);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // get data by email
    app.get("/mytoys/:email", async (req, res) => {
      const result = await theCollection
        .find({
          sellerEmail: req.params.email,
        })
        .toArray();
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MongoDB codes Ends here>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get("/", (req, res) => {
  res.send(" Alhamdulillah! ToyGem server running.....");
});

// starting the server here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.listen(port, () => {
  console.log(`Alhamdulillah the server running at the ${port} port`);
});
