const { faker } = require('@faker-js/faker');
const UserModule = require('../models/user.model');

// class User {
//     id;
//     username;
//     email;
//     password;
//     birth_date;
//     lastSignIn;
//     latitude;
//     longitude;
//     gender;
//     sexual_orientation;
//     online;
//     biography;
//     score;
//     first_name;
//     last_name;
//     activated;
// 	activation_token;
// }

function getRandomArbitrary(min, max)
{
	return Math.random() * (max - min) + min;
}

let users = new Array(45);
for (let i = 0; i < users.length; i++)
{
	let user = new UserModule.User();
	user.username = faker.name.findName();
	user.email = faker.internet.email();
	user.password = "$2b$10$K0zjkDyU67Bq18GHaTScFu78VdJITfQINb.zutPgx4UCj4a2DVk.G";
	user.birth_date = null;
	user.lastSignIn = new Date();
	user.latitude = 48.866669 + getRandomArbitrary(-0.065261, 0.065261);
	user.longitude = 2.33333 + getRandomArbitrary(-0.203208, 0.203208);
	user.gender = getRandomArbitrary(0, 1) == 0 ? 'M' : 'F';
	user.sexual_orientation = getRandomArbitrary(0, 1) == 0 ? 'M' : 'F';
	user.online = false;
	user.biography = faker.hacker.phrase();
	user.score = Math.floor(getRandomArbitrary(20, 250));
	user.first_name = faker.name.firstName();
	user.last_name = faker.name.lastName();
	user.activated = true;
	user.activation_token = "";
	// user.register();
	
	console.log(faker.image.avatar());
};