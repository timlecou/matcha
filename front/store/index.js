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
	online_users: [],
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
	SET_USER(state, user)
	{
		state.user = user;
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

	ADD_ONLINE_USER(state, user_id)
	{
		state.online_users.push(user_id);
	},

	REMOVE_ONLINE_USER(state, user_id)
	{
		let index = state.online_users.findIndex(u => u.id == user_id);
		if (index != -1)
			state.online_users.splice(index, 1);
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
			store.commit('ADD_ONLINE_USER', data.user_id);
		});

		socket.on('disonnect', data =>
		{
			store.commit('REMOVE_ONLINE_USER', data.user_id);
		});

		socket.on('new_like', data =>
		{
			store.dispatch('addNotification', {
				event_type: "new_like",
				text: "X vous a liké",
				metadata: {}
			});
		});

		socket.on('new_visit', data =>
		{
			store.commit('REMOVE_ONLINE_USER', data.user_id);
		});

		socket.on('test_notif', data =>
		{
			store.dispatch('addNotification', {
				event_type: "new_visit",
				text: "X a regardé votre profile",
				metadata: {}
			});
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

		// Unlike ?
	},

	login(store, {email, password})
	{
		return new Promise((resolve, reject) =>
		{
			this.$axios.post('http://localhost:4000/login', {email, password})
			.then(res =>
			{
				store.commit("SET_ACCESS_TOKEN", res.data.token);
				store.commit("SET_USER", res.data.user);
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
	},

	uploadPhotos(store, photos)
	{
		return new Promise((resolve, reject) =>
		{
			let formData = new FormData();
			for (let photo of photos)
				formData.append("files[]", photo);
			this.$axios.post(`http://localhost:4000/users/${store.state.user.id}/photos`, formData,
			{
				headers:
				{
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(res =>
			{
				resolve();
			})
			.catch(err => reject(err));
		})
	},

	updateProfile(store, user_datas)
	{
		return new Promise((resolve, reject) =>
		{
			console.log(user_datas);
			this.$axios.put(`http://localhost:4000/users/${store.state.user.id}`, user_datas)
			.then (res =>
			{
				resolve(res);
			})
			.catch(err => reject(err));
		});
	}
};

export const getters = {};