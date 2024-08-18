const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router(); // Use express.Router instead of app

// Route to get all confirmed registrations
router.get('/view', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'confirmedRegistration.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ message: 'Error reading registration file' });
        }

        try {
            const registrations = JSON.parse(data);
            res.status(200).json(registrations);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            res.status(500).json({ message: 'Error parsing registration file' });
        }
    });
});

module.exports = router;
