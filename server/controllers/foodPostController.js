const FoodPost = require('../models/FoodPost');
const Receiver = require('../models/Receiver');
const Donor = require('../models/Donor');
const nodemailer = require('nodemailer');

// efzcyerpssnyoipd
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'audra81@ethereal.email',
        pass: 'esTqFyT6jWxdc4jgg4'
    }
});
  
  const sendNotificationEmail = async (email, foodPickup, receiverLocation) => {
    const mailOptions = {
      from: "aryavjain1708@gmail.com",
      to: "aryavjain170804@gmail.com",
      subject: 'New Receiver Selected for Donation',
      text: `A receiver has been selected for a food donation.
      Pickup Location: ${foodPickup}
      Receiver Location: ${receiverLocation}`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  


// exports.applyForFoodPost = async (req, res) => {
//     const foodPostId = req.params.id;
  
//     try {
//       const foodPost = await FoodPost.findById(foodPostId);
  
//       if (!foodPost) {
//         return res.status(404).json({ error: 'Food post not found' });
//       }
  
//       if (foodPost.appliedReceivers.includes(req.receiver.id)) {
//         return res.status(400).json({ error: 'You have already applied for this donation' });
//       }
  
//       // Add receiver to the list of applicants
//       foodPost.appliedReceivers.push(req.receiver.id);
//       await foodPost.save();
  
//       res.status(200).json({ message: 'Application submitted successfully', foodPost });
//     } catch (error) {
//       res.status(500).json({ error: 'Error applying for food post', details: error.message });
//     }
//   };
exports.applyForFoodPost = async (req, res) => {
  const foodPostId = req.params.id;
  const { receiverName } = req.body;

  try {
    const foodPost = await FoodPost.findById(foodPostId);

    if (!foodPost) {
      return res.status(404).json({ error: 'Food post not found' });
    }

    if (foodPost.appliedReceivers.some(receiver => receiver.name === receiverName)) {
      return res.status(400).json({ error: 'You have already applied for this donation' });
    }

    // Ensure receiverName is valid and not undefined
    if (!receiverName) {
      return res.status(400).json({ error: 'Receiver name is required' });
    }

    // Add receiver's name to the list of applicants
    foodPost.appliedReceivers.push({ name: receiverName });
    await foodPost.save();

    res.status(200).json({ message: 'Application submitted successfully', foodPost });
  } catch (error) {
    console.error('Error applying for food post:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error applying for food post', details: error.message });
  }
};


//   exports.selectReceiver = async (req, res) => {
//     const { id } = req.params; // Food Post ID
//     const { receiverId } = req.body; // Receiver ID provided by the donor
  
//     try {
//       // Check if the food post exists
//       const foodPost = await FoodPost.findById(id);
//       if (!foodPost) {
//         return res.status(404).json({ error: 'Food post not found' });
//       }
  
//       // Check if the receiver exists
//       const receiver = await Receiver.findById(receiverId);
//       if (!receiver) {
//         return res.status(404).json({ error: 'Receiver not found' });
//       }
  
//       // Verify that the donor is the creator of the food post
//       if (foodPost.donor.toString() !== req.donor._id.toString()) {
//         return res.status(403).json({ error: 'Not authorized to select receiver for this food post' });
//       }
  
//       // Optionally, check if the receiver has applied for the food post
//       if (!foodPost.appliedReceivers.includes(receiverId)) {
//         return res.status(400).json({ error: 'Receiver did not apply for this food post' });
//       }
  
//       // Process the selection (you can log or notify the receiver here)
//       console.log(`Food post "${foodPost.foodName}" assigned to receiver "${receiver.name}"`);
  
//       // Increment the donor's points
//       const donor = await Donor.findById(req.donor._id);
//       if (donor) {
//         donor.points += 10; // Add 10 points for each selection
//         await donor.save();
//       }
  
//       // Remove the food post from the database
//       await FoodPost.findByIdAndDelete(id);
  
//       res.status(200).json({ message: 'Receiver selected and food post deleted successfully', points: donor.points });
//     } catch (error) {
//       console.error('Error selecting receiver:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
exports.selectReceiver = async (req, res) => {
    const { id } = req.params; // Food Post ID
    const { receiverId } = req.body; // Receiver ID provided by the donor
  
    try {
      // Check if the food post exists
      const foodPost = await FoodPost.findById(id);
      if (!foodPost) {
        return res.status(404).json({ error: 'Food post not found' });
      }
  
      // Check if the receiver exists
      const receiver = await Receiver.findById(receiverId);
      if (!receiver) {
        return res.status(404).json({ error: 'Receiver not found' });
      }
  
      // Verify that the donor is the creator of the food post
      if (foodPost.donor.toString() !== req.donor._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to select receiver for this food post' });
      }
  
      // Optionally, check if the receiver has applied for the food post
      if (!foodPost.appliedReceivers.includes(receiverId)) {
        return res.status(400).json({ error: 'Receiver did not apply for this food post' });
      }
  
      // Notify all donors with pickup location and receiver's location
      const donors = await Donor.find(); // Fetch all donors
      const notifications = donors.map(async (donor) => {
        await sendNotificationEmail(donor.email, foodPost.pickupLocation, receiver.location);
      });
      await Promise.all(notifications); // Wait for all notifications to be processed
  
      // Remove the food post from the database
      await FoodPost.findByIdAndDelete(id);
  
      res.status(200).json({
        message: 'Receiver selected and food post deleted successfully. All donors have been notified.',
      });
    } catch (error) {
      console.error('Error selecting receiver:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
exports.createFoodPost = async (req, res) => {
    const { foodName, quantity, expirationDate, category, pickupLocation, contactDetails } = req.body;
  
    try {
      // Check if expiration date is valid
      const currentDate = new Date();
      const expDate = new Date(expirationDate);
  
      if (expDate <= currentDate) {
        return res.status(400).json({
          error: 'Expiration date must be a future date',
        });
      }
  
      // Create a new food post
      const newFoodPost = new FoodPost({
        donor: req.donor.id, // From the verified donor in middleware
        foodName,
        quantity,
        expirationDate,
        category,
        pickupLocation,
        contactDetails,
        photo: req.file ? req.file.path : null, // Save photo path if uploaded
      });
  
      await newFoodPost.save();
      res.status(201).json({ message: 'Food post created successfully', foodPost: newFoodPost });
    } catch (error) {
      res.status(500).json({ error: 'Error creating food post', details: error.message });
    }
  };
  

// Get all food posts
// exports.getAllFoodPosts = async (req, res) => {
//   try {
//     const foodPosts = await FoodPost.find().populate('donor', 'name number email'); // Populate donor info
//     res.status(200).json(foodPosts);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching food posts', details: error.message });
//   }
// };
exports.getAllFoodPosts = async (req, res) => {
  try {
    const foodPosts = await FoodPost.find()
      .populate('donor', 'name number email') // Populate donor info
      .populate('appliedReceivers', 'name location photo'); // Populate receiver info (applied receivers)
    
    // Add the full image URL for each food post
    const foodPostsWithImageUrls = foodPosts.map(post => {
      const imageUrl = post.photo ? `http://localhost:5000/uploads/${post.photo}` : null;
      return { ...post.toObject(), imageUrl }; // Add imageUrl to the response object
    });

    res.status(200).json(foodPostsWithImageUrls); // Send the enriched food posts data
  } catch (error) {
    res.status(500).json({ error: 'Error fetching food posts', details: error.message });
  }
};
