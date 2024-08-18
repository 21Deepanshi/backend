const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// POST route to handle registration
router.post('/register', (req, res) => {
    const { bvcId, fullName, address, status, fee } = req.body;

    // Basic form validation
    if (!bvcId || !fullName || !address || !status) {
        return res.status(500).json({ message: 'All fields are required' });
    }

    const registrationData = { bvcId, fullName, address, status, fee };

    // Path to the JSON file
    const filePath = path.join(__dirname, 'data', 'confirmedRegistration.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
    let registrations = [];
    if (!err && data) {
        registrations = JSON.parse(data);
    }

    //add the new registration data
    registrations.push(registrationData);

    fs.writeFile(filePath, JSON.stringify(registrations, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving registration' });
        }
        return res.status(200).json({ message: 'Registration successful', registrationData });
        });
    });
});

module.exports = router;
