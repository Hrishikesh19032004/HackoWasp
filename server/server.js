const express = require('express');
const mongoose = require('mongoose');
const donorRoutes = require('./routes/donorRoutes');
const receiverRoutes = require('./routes/receiverRoutes');
const foodPostRoutes = require('./routes/foodPostRoutes');
const path = require('path');
require('dotenv').config();
const cors = require("cors");
const bodyParser = require('body-parser');
const Razorpay = require("razorpay")



const app = express();
const PORT = 5000;
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
  
  // app.use(cors(corsOptions));
  // Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix

// Middleware
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/Rubix', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));



  app.post('/orders', async(req, res) => {
    const razorpay = new Razorpay({
        key_id: "rzp_test_GcZZFDPP0jHtC4",
        key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    })
  
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "receipt#1",
        payment_capture: 1
    }
  
    try {
        const response = await razorpay.orders.create(options)
  
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
  })
  
  
  app.get("/payment/:paymentId", async(req, res) => {
    const {paymentId} = req.params;
  
    const razorpay = new Razorpay({
        key_id: "rzp_test_GcZZFDPP0jHtC4",
        key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    })
    
    try {
        const payment = await razorpay.payments.fetch(paymentId)
  
        if (!payment){
            return res.status(500).json("Error at razorpay loading")
        }
  
        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        })
    } catch(error) {
        res.status(500).json("failed to fetch")
    }
  })
// Routes
const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  itemName: { type: String, required: true },
  itemQty: { type: Number, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  foodBankName: { type: String, required: true },
  foodBankCity: { type: String, required: true },
  foodBankDescription: { type: String, required: true },
  foodBankLatitude: { type: String, required: true },
  foodBankLongitude: { type: String, required: true },
});

const Donation = mongoose.model("Donation", donationSchema);

// Routes
app.post("/api/donations", async (req, res) => {
    try {
      // Log the incoming request body to see the data
      console.log("Incoming donation data:", req.body);
  
      const donation = new Donation(req.body);
      await donation.save();
      res.status(201).json({ message: "Donation added successfully", donation });
    } catch (error) {
      console.error("Error while adding donation:", error); // Log the error for better debugging
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Error adding donation", error });
    }
  });
  
  

app.get("/api/donations", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
});
app.use('/api/donors', donorRoutes);
app.use('/api/receivers', receiverRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

app.use('/api/food-posts', foodPostRoutes); // Add the new route

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
