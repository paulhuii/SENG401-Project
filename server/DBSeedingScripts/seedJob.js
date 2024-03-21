const mongoose = require('mongoose');
const Job = require('../models/Job.js');
const dotenv = require("dotenv");

// configure dotenv to read from .env files
dotenv.config();
// Define sample job data
const jobData = [
    {
        title: 'Software Engineer',
        jobType: 'Full-time',
        location: 'San Francisco, CA',
        salary: '$100,000 - $120,000',
        contact: 'john.doe@example.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        postedBy: '5f760dad3e3f8b3d2f22b8f4', // Replace with actual recruiter ObjectId
        jobID: new mongoose.Types.ObjectId(),
        applicants: [] // Replace with actual applicant ObjectIds
        
    },
    {
        title: 'Marketing Manager',
        jobType: 'Part-time',
        location: 'New York, NY',
        salary: '$80,000 - $90,000',
        contact: 'jane.smith@example.com',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        postedBy: '5f760dad3e3f8b3d2f22b8f4', // Replace with actual recruiter ObjectId
        jobID: new mongoose.Types.ObjectId(),
        applicants: [] // Replace with actual applicant ObjectIds
    },
    {
        title: 'Data Scientist',
        jobType: 'Full-time',
        location: 'Seattle, WA',
        salary: '$120,000 - $150,000',
        contact: 'alex.jones@example.com',
        description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        postedBy: '5f760dad3e3f8b3d2f22b8f4', // Replace with actual recruiter ObjectId
        jobID: new mongoose.Types.ObjectId(),
        applicants: [] // Replace with actual applicant ObjectIds
    },
    {
        title: 'Graphic Designer',
        jobType: 'Contract',
        location: 'Los Angeles, CA',
        salary: '$60,000 - $70,000',
        contact: 'emily.wilson@example.com',
        description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
        postedBy: '5f760dad3e3f8b3d2f22b8f4', // Replace with actual recruiter ObjectId
        jobID: new mongoose.Types.ObjectId(),
        applicants: [] // Replace with actual applicant ObjectIds
    },
    {
        title: 'Project Manager',
        jobType: 'Full-time',
        location: 'Chicago, IL',
        salary: '$90,000 - $110,000',
        contact: 'david.brown@example.com',
        description: 'Maecenas faucibus mollis interdum. Cras justo odio, dapibus ac facilisis in.',
        postedBy: '5f760dad3e3f8b3d2f22b8f4', // Replace with actual recruiter ObjectId
        jobID: new mongoose.Types.ObjectId(),
        applicants: [] // Replace with actual applicant ObjectIds
    },
    {
        title: 'Customer Service Representative',
        jobType: 'Full-time',
        location: 'Houston, TX',
        salary: '$40,000 - $50,000',
        contact: 'sarah.wilson@example.com',
        description: 'Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor.',
        postedBy: '5f760dad3e3f8b3d2f22b8f4', // Replace with actual recruiter ObjectId
        jobID: new mongoose.Types.ObjectId(),
        applicants: [] // Replace with actual applicant ObjectIds
    }

];

// Function to seed job data
async function seedJobData() {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to the database');

        // Insert job data into the database
        await Job.insertMany(jobData);
        console.log('Job data seeded successfully');

        // Close the database connection
        mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error seeding job data:', error);
    }
}

module.exports = seedJobData;
