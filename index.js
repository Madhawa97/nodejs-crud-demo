const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

let customers = [
    {
        "id":1,
        "name": "Saman",
        "age": 15,
        "phone": 0771234567
    },
    {
        "id": 2,
        "name": "Kasun",
        "age": 15,
        "phone": 0771234567
    },
    {
        "id": 3,
        "name": "Kelum",
        "age": 15,
        "phone": 0771234567
    },
    {
        "id": 4,
        "name": "Nuwan",
        "age": 40,
        "phone": 0771234567
    },
    {
        "id": 5,
        "name": "Nimal",
        "age": 30,
        "phone": 0771234567
    },
    {
        "id": 6,
        "name": "Kamal",
        "age": 60,
        "phone": 0771234567
    },
    {
        "id": 7,
        "name": "Amal",
        "age": 10,
        "phone": 0771234567
    }
];

app.get("/", (req,res) => {
    res.send("<h1>Welcome to our REST API</h1>")
});

app.get("/api/customers", (req, res) => {
    res.send(customers);
});

//--get details of specific customer by id

app.get("/api/customer/:id", (req, res) => {
    const filterCustomer = customers.find((c) => c.id == parseInt(req.params.id))
    if (filterCustomer) {
        res.status(200).send(filterCustomer);
    } else {
        res.status(404).send('<h2>Customer not found.</h2>')
    }
});


//------- add code to validate customer by age
app.get("/api/eligible_customers/:age", (req, res) => {
    const eligibleCustomers = customers.filter((c) => c.age > parseInt(req.params.age))

    res.send(eligibleCustomers);
});

//-----post method--------------------------
app.post("/api/add_customers/", (req, res) => {
    const { error } = validateCustomer(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const newCustomer = {
        id: customers.length + 1,
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
    }

    customers.push(newCustomer);

    res.send(newCustomer);
});

function validateCustomer(customer) {
    const schema = Joi.object({ 
        name: Joi.string().min(3).required(), 
        phone: Joi.number().min(3).required(), 
        age: Joi.number().min(1).required()
    });

    const validation = schema.validate(customer);

    return validation;
}


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log("Listening on port :"+port+"...."));