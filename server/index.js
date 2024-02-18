require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/ConnectDB')
const SiteSchema = require('./Models/WebSite')
const CategorySchmea = require('./Models/Category')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;


app.post("/AddNewSite", (req, res) => {
    SiteSchema.create(req.body)
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
});

app.get('/GetSite', (req, res) => {
    SiteSchema.find({})
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
});

app.delete('/DeleteSite/:id', (req, res) => {
    const id = req.params.id;
    SiteSchema.findByIdAndDelete({ _id: id })
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
})

app.post("/AddNewCategory", (req, res) => {
    CategorySchmea.create(req.body)
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
});

app.get('/GetCategory', (req, res) => {
    CategorySchmea.find({})
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
});

app.delete('/DeleteCategory/:id', (req, res) => {
    const id = req.params.id;
    CategorySchmea.findByIdAndDelete({ _id: id })
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
})



const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server Connection Successful!`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();