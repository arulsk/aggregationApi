const mongoose = require('mongoose');

const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost/userDetail');
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = main

