<script>

import axios from 'axios'
import Header from '../components/Header.vue';
import Swiper from '../components/Swiper-v2.vue';

export default {
	components: { Header, Swiper },
	data()
	{
		return {
			users: []
		}
	},
	mounted()
	{
		this.$axios.get('http://localhost:4000/users')
		.then(async res =>
		{
			let users = res.data;
			for (let user of users)
			{
				let res = await this.$axios(`http://localhost:4000/users/${user.id}/photos`);
				user['photos'] = res.data;
			}
			this.users = users;
		})
		.catch(err =>
		{
			console.error("Cannot load users");
		});
	},
	beforeRouteEnter(to, from, next)
	{
		next(vm =>
		{
			if (!vm.$store.state.is_logged_in)
				next('/sign_in')
		})
	},
	methods:
	{
		next(index)
		{
			this.users.splice(index, 1);
		}
	}
}
</script>

<template>
	<div class="container">
		<Swiper :user="user" v-for="(user, index) in users" :key="'swiper_' + user.id" @skip="next(index)"/>
	</div>
</template>

<style>

.container
{
  margin: 0 auto;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.flex
{
	display: flex;
}

</style>
