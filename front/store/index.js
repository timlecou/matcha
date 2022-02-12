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
	notifications: [],
	matches: [],
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
		let match = state.matches.find(match => match.match_id == match_id);
		if (match)
			match.messages.push(message);
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

	SET_MATCHES(state, matches)
	{
		state.matches = matches;
	}
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
		const socket = io('/api', {
			query: {
				access_token: store.state.access_token
			},
			path: '/api/socket.io/'
		});

		socket.on("connect", () => {
			console.log("SOCKET CONNECTED !!!");
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
			console.log(this.$router);
			store.commit('ADD_MATCH_MESSAGE', {match_id: data.match_id, message: data});
			if (data.from_id != store.state.user.id)
			{
				store.dispatch('addNotification', {
					event_type: "new_message",
					text: "Vous avez recu un nouveau message.",
					metadata: {}
				});
			}
		});

		// Unlike ?
	},

	login(store, {email, password})
	{
		return new Promise((resolve, reject) =>
		{
			this.$axios.post('/api/login', {email, password})
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
			this.$axios.get('/api/users')
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
			this.$axios.post(`/api/users/${store.state.user.id}/photos`, formData,
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
			this.$axios.put(`/api/users/${store.state.user.id}`, user_datas)
			.then (res =>
			{
				resolve(res);
			})
			.catch(err => reject(err));
		});
	},

	loadMatches(store)
	{
		return new Promise((resolve, reject) =>
		{
			this.$axios.get(`/api/users/${store.state.user.id}/matches`)
			.then (res =>
			{
				store.commit('SET_MATCHES', res.data);
				resolve(res);
			})
			.catch(err => reject(err));
		});
	},
};

export const getters = {};