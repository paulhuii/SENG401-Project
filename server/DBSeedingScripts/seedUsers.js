const mongoose = require('mongoose');
const User = require('../models/User.js');
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');


// configure dotenv to read from .env files
dotenv.config();

const data = [
    // Recruiters
    {
        name: 'Emily Johnson',
        username: 'recruiter1',
        email: 'EmilyJohnson@email.com',
        password: 'Recruiter1!',
        role: 'Recruiter',
        gender: 'Female',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Liam Johnson',
        username: 'recruiter2',
        email: 'LiamJohnson@email.com',
        password: 'Recruiter2!',
        role: 'Recruiter',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Sophia Martinez',
        username: 'recruiter3',
        email: 'SophiaMartinez@email.com',
        password: 'Recruiter3!',
        role: 'Recruiter',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Noah Brown',
        username: 'recruiter4',
        email: 'NoahBrown@email.com',
        password: 'Recruiter4!',
        role: 'Recruiter',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Olivia Taylor',
        username: 'recruiter5',
        email: 'Olivia Taylor@email.com',
        password: 'Recruiter5!',
        role: 'Recruiter',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'William Thomas',
        username: 'recruiter6',
        email: 'WilliamThomas@email.com',
        password: 'Recruiter6!',
        role: 'Recruiter',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Emma Brown',
        username: 'recruiter7',
        email: 'EmmaBrown@email.com',
        password: 'Recruiter7!',
        role: 'Recruiter',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'James Hall',
        username: 'recruiter8',
        email: 'JamesHall@email.com',
        password: 'Recruiter8!',
        role: 'Recruiter',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Ava White',
        username: 'recruiter9',
        email: 'AvaWhite@email.com',
        password: 'Recruiter9!',
        role: 'Recruiter',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Benjamin Perez',
        username: 'recruiter10',
        email: 'BenjaminPerez@email.com',
        password: 'Recruiter10!',
        role: 'Recruiter',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },

    // Job Seekers
    {
        name: 'Evelyn Turner',
        username: 'jobseeker1',
        email: 'EvelynTurner@email.com',
        password: 'Jobseeker1!',
        role: 'Jobseeker',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Oliver Martinez',
        username: 'jobseeker2',
        email: 'OliverMartinez@email.com',
        password: 'Jobseeker2!',
        role: 'Jobseeker',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Isabella Clark',
        username: 'jobseeker3',
        email: 'IsabellaClark@email.com',
        password: 'Jobseeker3!',
        role: 'Jobseeker',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Elijah Wilson',
        username: 'jobseeker4',
        email: 'ElijahWilson@email.com',
        password: 'Jobseeker4!',
        role: 'Jobseeker',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Mia Lewis',
        username: 'jobseeker5',
        email: 'MiaLewis@email.com',
        password: 'Jobseeker5!',
        role: 'Jobseeker',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Lucas Anderson',
        username: 'jobseeker6',
        email: 'LucasAnderson@email.com',
        password: 'Jobseeker6!',
        role: 'Jobseeker',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Amelia Rodriguez',
        username: 'jobseeker7',
        email: 'AmeliaRodriguez@email.com',
        password: 'Jobseeker7!',
        role: 'Jobseeker',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Mason Wright',
        username: 'jobseeker8',
        email: 'MasonWright@email.com',
        password: 'Jobseeker8!',
        role: 'Jobseeker',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Harper Carter',
        username: 'jobseeker9',
        email: 'HarperCarter@email.com',
        password: 'Jobseeker9!',
        role: 'Jobseeker',
        gender: 'Female',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
    {
        name: 'Ethan Moore',
        username: 'jobseeker10',
        email: 'EthanMoore@email.com',
        password: 'Jobseeker10!',
        role: 'Jobseeker',
        gender: 'Male',
        uniqueID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
        jobs: []
    },
];

async function seedUserData() {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to the database');

        // Hash passwords before inserting user data
        const hashedData = data.map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password, 10) // Hash password with bcrypt
        }));

        await User.insertMany(hashedData);
        console.log('User Data seeded');

        mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error seeding User data:', error);
    }
}

module.exports = seedUserData;
