const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API route for registration
const registrationRoutes = require('./registration');
app.use('/api', registrationRoutes);

const viewRegistrationRoutes = require('./server');
app.use('/api', viewRegistrationRoutes);

//start the server
app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is running and the app is listening on port: " + PORT);
    }else{
        console.log("Error: server cannot start.", error);
    }
});
