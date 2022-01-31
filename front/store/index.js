import io from 'socket.io-client';

export const state = () =>
({
	access_token: null,
	is_logged_in: false,
	user:
	{
		id: -1
	},
	users: [],
	notifications:
	[
		{
			type: "new_message",
			text: "Nao vous a envoyé un message.",
			meta_data:
			{
				user_id: 1,
			}
		},
		{
			type: "new_like",
			text: "Test vous a liké.",
			meta_data:
			{
				user_id: 1,
			}
		},
	],
	matches:
	[
		{
			id: 1,
			user:
			{
				id: 1,
				name: "Yass",
				photo: "/images/photo-1.jpeg"
			},
			last_update_time: "10:03",
			messages:
			[
				{
					id: 1,
					author:
					{
						id: 1,
						name: "Yass"
					},
					text: "Salam Aleykoum bg ca va ?"
				},
				{
					id: 2,
					author:
					{
						id: 2,
						name: "Me"
					},
					text: "Aleykoum salam ca va et toi ?"
				},
			]
		},
		{
			id: 2,
			user:
			{
				id: 1,
				name: "Nao",
				photo: "/images/photo-2.png"
			},
			last_update_time: "10:03",
			messages:
			[
				{
					id: 1,
					author:
					{
						id: 1,
						name: "Yass"
					},
					text: "Salam Aleykoum bg ca va ?"
				},
				{
					id: 2,
					author:
					{
						id: 2,
						name: "Me"
					},
					text: "Aleykoum salam ca va et toi ?"
				},
			]
		},
	],
})
  
export const mutations =
{
	SET_ACCESS_TOKEN(state, token)
	{
		state.access_token = token;
		state.is_logged_in = true;
	},
	SET_USER_ID(state, id)
	{
		state.user.id = id;
	},
	SET_USERS(state, users)
	{
		state.users = users;
	},

	ADD_MATCH_MESSAGE(state, {match_id, message})
	{
		state.matches.find(match => match.id == match_id)
		.messages.push(message);
	},

	ADD_NOTIF(state, notification)
	{
		state.notifications.push(notification);
	},
};

export const actions =
{
	addNotification(store, {event_type, text, metadata})
	{
		let notif = {
			type: event_type,
			text: text,
			meta_data: metadata
		};
		store.commit('ADD_NOTIF', notif);
	},

	initWebsockets(store)
	{
		console.log(store.state.access_token);
		const socket = io('http://localhost:4000', {
			query: {
				access_token: store.state.access_token
			}
		});

		socket.on('new_connection', data =>
		{
			alert(data.user_id);
		});

		socket.on('test_notif', data =>
		{
			console.log("Receive ", data);
		});

		socket.on('new_message', data =>
		{
			store.commit('ADD_MATCH_MESSAGE', {match_id: data.match_id, message: data.message});
			store.dispatch('addNotification', {
				event_type: "new_message",
				text: "Vous avez recu un nouveau message",
				metadata: {}
			});
		});
	},

	login(store, {email, password})
	{
		return new Promise((resolve, reject) =>
		{
			this.$axios.post('http://localhost:4000/login', {email, password})
			.then(res =>
			{
				store.commit("SET_ACCESS_TOKEN", res.data.token);
				store.commit("SET_USER_ID", res.data.userId);
				this.$axios.interceptors.request.use((config) =>
				{
					config.headers['Authorization'] = "Bearer " + store.state.access_token;
					return config;
				},
				(error) =>
				{
					return Promise.reject(error);
				});
				store.dispatch('initWebsockets');
				store.dispatch('loadUsers');
				resolve();
			})
			.catch(err => reject(err));
		})
	},

	loadUsers(store)
	{
		return new Promise((resolve, reject) =>
		{
			this.$axios.get('http://localhost:4000/users')
			.then(res =>
			{
				store.commit('SET_USERS', res.data);
				resolve();
			})
			.catch(err => reject(err));
		})
	}
};

export const getters = {};