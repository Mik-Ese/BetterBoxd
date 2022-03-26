const mongoose = require('mongoose');
const uri = credentials.mongo_uri;
const UserModel = require('../schemas/user.schema');

async function addUser(user, password, email) {
    try {
        await mongoose.connect(uri);
        var userData = new UserModel({
            username: user,
            password: password,
            email_address: email,
            lists: null
        });
        await userData.save();
        await mongoose.connection.close();
        return 'Successful';
    } catch (error) {
        console.log(error);
        return error;
    }
}

/*
async function removeUser(user) {
    try {
        await mongoose.connect(uri);
        const foundUser = await UserModel.find({username: user});
        
        await mongoose.connection.close();
    }
    catch(error) {
        console.log(error);
        return error;
    }
}
*/

async function getUser(name) {
    try {
        await mongoose.connect(uri);
        const foundUser = await UserModel.find({ username: name });
        console.log(foundUser);
        await mongoose.connection.close();
        return foundUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function checkLogIn(user, password) {
    try {
        await mongoose.connect(uri);
        const foundUser = await UserModel.find({ username: user });
        if (
            foundUser.at(0).username === user &&
            foundUser.at(0).password === password
        ) {
            await mongoose.connection.close();
            await console.log('true');
            return true;
        } else {
            await mongoose.connection.close();
            await console.log('false');
            return false;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    checkLogIn,
    getUser,
    addUser
};

// async function main() {
//     getUser('MattressButter');
// }
// main();
