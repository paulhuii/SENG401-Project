const readline = require('readline');
const seedUsers = require('./seedUsers.js');
const seedJobs = require('./seedJob.js');

// Create readline interface to read the user's input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to seed all data
async function seedAll() {
    try {
        await seedUsers();
        await seedJobs();
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        rl.close();
    }
}

// Function to seed user data only
async function seedUsersOnly() {
    try {
        await seedUsers();
    } catch (error) {
        console.error('Error seeding user data:', error);
    } finally {
        rl.close();
    }
}


// Function to seed user data only
async function seedJobsOnly() {
    try {
        await seedJobs();
    } catch (error) {
        console.error('Error seeding user data:', error);
    } finally {
        rl.close();
    }
}

// Function to choose whether to seed all data, user data only, or cancel
const seedDB = async () => {
    console.log("Select an option:");
    console.log("1. Seed all schemas");
    console.log("2. Seed User schemas");
    console.log("3. Seed Job schemas");
    console.log("0. Cancel");

    rl.question("\nEnter your choice: ", async (choice) => {
        switch (choice) {
            case '0':
                console.log("Exiting Seeding Program...\n");
                rl.close();
                break;
            case '1':
                await seedAll();
                break;
            case '2':
                await seedUsersOnly();
                break;
            case '3':
                await seedJobsOnly();
                break;
            default:
                console.log("Invalid choice");
                console.log("Exiting Program...\n");
                rl.close();
        }
    });
};

seedDB();
