const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const {connection} = require('./config/db')
const {ProductModel} = require('./models/Products')
const {router} = require("./routes/ProductRoutes")



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use('/product', router)

app.get('/', (req, res) => {
    res.send("Welcome to the product catalog")
});




const PORT = process.env.PORT || 4001

app.listen(PORT, async() => {
    await connection;
    try {
        console.log("connected to db");
        
    } catch (error) {
        console.log(error);
        console.log("unable to connect to db");
        
    }
    console.log(`Server started on port http://localhost:${PORT}`)
})