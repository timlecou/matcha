<script>

import axios from 'axios'
import Header from '../components/Header.vue';
import Swiper from '../components/Swiper-v2.vue';
import FiltersContainer from '../components/FiltersContainer.vue';

export default {
	components: { Header, Swiper, FiltersContainer },
	data()
	{
		return {
			users: [],
			modal: null,
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
		next()
		{
			this.users.shift();
		}
	},
	computed:
	{
		reverse_users()
		{
			let arr = [...this.users];
			return arr.reverse();
		}
	}
}
</script>

<template>
	<div class="container">
		<Swiper :user="user" :index="users.length - 1 - index" v-for="(user, index) in reverse_users" :key="'swiper_' + index" @next="next"/>
		<div class="buttons_container">
			<div class="filters_button" @click="modal = 'filters'">
				<svg viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"></path></svg>
			</div>
			<div class="sort_button" @click="modal = 'sorter'">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6.288 4.293-3.995 4-.084.095a1 1 0 0 0 .084 1.32l.095.083a1 1 0 0 0 1.32-.084L6 7.41V19l.007.117a1 1 0 0 0 .993.884l.117-.007A1 1 0 0 0 8 19V7.417l2.293 2.29.095.084a1 1 0 0 0 1.319-1.499l-4.006-4-.094-.083a1 1 0 0 0-1.32.084ZM17 4.003l-.117.007a1 1 0 0 0-.883.993v11.58l-2.293-2.29-.095-.084a1 1 0 0 0-1.319 1.498l4.004 4 .094.084a1 1 0 0 0 1.32-.084l3.996-4 .084-.095a1 1 0 0 0-.084-1.32l-.095-.083a1 1 0 0 0-1.32.084L18 16.587V5.003l-.007-.116A1 1 0 0 0 17 4.003Z"/></svg>
			</div>
		</div>
		<div class="modal" v-if="modal !== null">
			<div class="header">
				<p class="title">
					<span v-if="modal === 'filters'">Filtres</span>
					<span v-if="modal === 'sorter'">Sort</span>
				</p>
				<div class="close_button" @click="modal = null">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z"/></svg>
				</div>
			</div>
			<FiltersContainer v-if="modal == 'filters'"/>
			<SorterContainer v-if="modal == 'sorter'"/>
		</div>
		<div class="fade" @click="modal = null" v-if="modal"></div>
	</div>
</template>

<style scoped>

.container
{
	margin: 0 auto;
}

.buttons_container
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 10%;
	left: 1rem;
}

.buttons_container > *
{
	width: 3.5rem;
	margin: 0.5rem;
	background: white;
	color: #fb53a3;
	border: solid 1px #fb53a3;
	padding: 0.75rem;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

.modal
{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 30rem;
	max-width: 100%;
	height: auto;
	max-height: 90%;
	z-index: 9;
	background: #fb53a3;
	padding: 1rem;
	overflow-y: auto;
	border-radius: 1rem;
}

.modal .header
{
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.modal .title
{
	font-size: 1.5rem;
	text-align: center;
}

.modal .close_button
{
	position: absolute;
	top: 0.25rem;
	right: 1rem;
	width: 1.5rem;
	cursor: pointer;
}

.fade
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(25, 25, 25, 0.25);
	z-index: 8;
}

@media screen and (max-width: 600px)
{
	.buttons_container
	{
		flex-direction: row;
		top: unset;
		bottom: 0.5rem;
		left: 50%;
		transform: translateX(-50%);
	}
}

</style>
