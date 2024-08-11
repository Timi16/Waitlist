const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');

// @route POST /api/waitlist
// @desc Add a new entry to the waitlist
router.post('/', async (req, res) => {
  const { name, email, phoneNumber, brandName } = req.body;

  // Basic validation
  if (!name || !email || !phoneNumber || !brandName) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    // Check for existing email
    let existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return res.status(400).json({ msg: 'Email already exists in the waitlist' });
    }

    // Create new waitlist entry
    let entry = new Waitlist({ name, email, phoneNumber, brandName });
    await entry.save();

    // Log the details to the console
    console.log(`New Waitlist Entry Added:
      Name: ${name},
      Email: ${email},
      Phone Number: ${phoneNumber},
      Brand Name: ${brandName}
    `);

    res.status(201).json(entry);
  } catch (err) {
    console.error('Error adding to the waitlist:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
