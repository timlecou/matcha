class User {
    id;
    username;
    email;
    password;
    birth_date;
    lastSignIn;
    latitude;
    longitude;
    gender;
    sexual_orientation;
    online;
    biography;
    score;
    first_name;
    last_name;
    activated;
	activation_token;
}

let users = new Array(45);
products.map(async (p, index) =>
{
	await p.save((err, result) =>
	{
		if (index === products.length - 1)
		{
			console.log("DONE!");
			mongoose.disconnect();
		}
	});
});
console.log(users);