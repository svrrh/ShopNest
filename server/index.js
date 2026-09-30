require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors");
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
const productRoutes = require('./routes/productRoutes');
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
 
app.get("/",(req,res) =>{
res.send("hello world");
});

app.use('/api/products', productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

async function startServer() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected");
        const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

    }catch(error){
          console.error(error);
          process.exit(1);
    }
    
    
}
startServer();



