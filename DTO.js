// Message
{
	to_id: Number,
	content: string
}

// Update Profile
user:
{
	username: "yass.490",
	email: "yass@gmail.com",
	last_name: "El Alouani",
	first_name: "Yassine",
	biography: "Hey ! Je suis Sirine, ceci est ma biographie. Mon github c est Sirine-dev hahaha",
	gender: "Male",
	sexual_orientation: "Female",
	location:
	{
		long: number,
		lat: number
	},
	interests:
	[
		"3",
		"petits",
		"interets"
	]
}

// Search
{
	username: string,
	min_age: number,
	max_age: number,
	min_score: number,
	max_score: number,
	location:
	{
		long: number,
		lat: number
	}
}

// Filtres suggestions
{
	min_age: number,
	max_age: number,
	min_score: number,
	max_score: number,
	location:
	{
		long: number,
		lat: number
	},
	tags: string[]
}


/* WEBSOCKETS */

// • Un utilisateur se connecte:
{
	event_name = "new_connection",
	data:
	{
		user_id: 0
	}
}

// • Un utilisateur se deconnecte:
{
	event_name = "new_like",
	data:
	{
		user_id: 0
	}
}

// • L’utilisateur a reçu un “like”:
	{
		event_name = "new_like",
		data:
		{
			user_id: 0
		}
	}

// • L’utilisateur a reçu une visite.
	{
		event_name = "new_visit",
		data:
		{
			user_id: 0
		}
	}


// • L’utilisateur a reçu un message.
{
	event_name = "new_message",
	data:
	{
		match_id: 0,
		user_id: 0,
		content: string
	}
}

// • Un utilisateur “liké” a “liké” en retour.
{
	event_name = "new_match",
	data:
	{
		user_id: 0
	}
}

// • Un utilisateur matché ne vous “like” plus.
{
	event_name = "new_unlike",
	data:
	{
		user_id: 0
	}
}
