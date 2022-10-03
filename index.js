const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

let customers = [
    {
        "id":1,
        "name": "Saman",
        "age": 15
    },
    {
        "id": 2,
        "name": "Kasun",
        "age": 15
    },
    {
        "id": 3,
        "name": "Kelum",
        "age": 15
    },
    {
        "id": 4,
        "name": "Nuwan",
        "age": 40
    },
    {
        "id": 5,
        "name": "Nimal",
        "age": 30
    },
    {
        "id": 6,
        "name": "Kamal",
        "age": 60
    },
    {
        "id": 7,
        "name": "Amal",
        "age": 10
    }
];

app.get("/", (req,res) => {
    res.send("<h1>Welcome to our REST API</h1>")
});

app.get("/api/customers", (req, res) => {
    res.send(customers);
});


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log("Listening on port :"+port+"...."));