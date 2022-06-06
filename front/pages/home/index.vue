<script>

import axios from 'axios'
import Header from '../../components/Header.vue';
import Swiper from '../../components/Swiper-v2.vue';
import FiltersContainer from '../../components/FiltersContainer.vue';

export default {
	components: { Header, Swiper, FiltersContainer },
	data()
	{
		return {
			users: [],
			modal: null,
			show_swiper_info: false
		}
	},
	mounted()
	{
		// this.$axios.get('/api/users')
		// .then(async res => this.users = res.data)
		// .catch(err =>
		// {
		// 	console.error("Cannot load users");
		// });
	},
	beforeRouteEnter(to, from, next)
	{
		next(vm =>
		{
			if (!vm.$store.state.is_logged_in)
				next('/welcome')
		})
	},
	methods:
	{
		next()
		{
			this.users.shift();
			this.show_swiper_info = false;
		},
		like()
		{
			this.$axios.post(`/api/users/${this.$store.state.user.id}/liked/${this.users[0].id}`)
			.then(res =>
			{
				this.liked = true;
				this.next();
			})
			.catch(err =>
			{
				this.$toast.error(err.response.data.error);
			})
		},
		skip()
		{
			this.next();
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
	<div class="home">
		<div class="swipers_container">
			<Swiper :user="user" :index="users.length - 1 - index" :show_info="show_swiper_info && users.length - 1 - index == 0" v-for="(user, index) in reverse_users" :key="'swiper_' + index" @next="next"/>
		</div>
		<div class="buttons_container">
			<div class="left">
				<div class="filters_button button" @click="modal = 'filters'">
					<svg viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"></path></svg>
				</div>
				<div class="sort_button button" @click="modal = 'sorter'">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6.288 4.293-3.995 4-.084.095a1 1 0 0 0 .084 1.32l.095.083a1 1 0 0 0 1.32-.084L6 7.41V19l.007.117a1 1 0 0 0 .993.884l.117-.007A1 1 0 0 0 8 19V7.417l2.293 2.29.095.084a1 1 0 0 0 1.319-1.499l-4.006-4-.094-.083a1 1 0 0 0-1.32.084ZM17 4.003l-.117.007a1 1 0 0 0-.883.993v11.58l-2.293-2.29-.095-.084a1 1 0 0 0-1.319 1.498l4.004 4 .094.084a1 1 0 0 0 1.32-.084l3.996-4 .084-.095a1 1 0 0 0-.084-1.32l-.095-.083a1 1 0 0 0-1.32.084L18 16.587V5.003l-.007-.116A1 1 0 0 0 17 4.003Z"/></svg>
				</div>
			</div>
			<div class="right">
				<div class="skip_button button" @click="skip">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.397 4.554.073-.084a.75.75 0 0 1 .976-.073l.084.073L12 10.939l6.47-6.47a.75.75 0 1 1 1.06 1.061L13.061 12l6.47 6.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L12 13.061l-6.47 6.47a.75.75 0 0 1-1.06-1.061L10.939 12l-6.47-6.47a.75.75 0 0 1-.072-.976l.073-.084-.073.084Z"/></svg>
				</div>
				<div class="like_button button" @click="like">
					<svg role="img" fill="currentColor" viewBox="0 0 24 24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
				</div>
				<div class="info_button button" @click="show_swiper_info = !show_swiper_info">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999Zm-.004 8.25a1 1 0 0 0-.992.885l-.007.116.003 5.502.007.117a1 1 0 0 0 1.987-.002L13 16.75l-.003-5.501-.007-.117a1 1 0 0 0-.994-.882ZM12 6.5a1.251 1.251 0 1 0 0 2.503A1.251 1.251 0 0 0 12 6.5Z"/></svg>
				</div>
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
			<FiltersContainer v-if="modal == 'filters'" :show_location="false"/>
			<SorterContainer v-if="modal == 'sorter'"/>
		</div>
		<div class="fade" @click="modal = null" v-if="modal"></div>
	</div>
</template>

<style scoped>

.swipers_container
{
	margin: 0 auto;
	overflow-y: auto;
	overflow-x: hidden;
}

.buttons_container
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	position: fixed;
	bottom: 10%;
	left: 0;
	padding: 0 1rem;
}

.buttons_container > *
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.buttons_container .button
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
	transition: all 0.25s;
}

.buttons_container .button:hover
{
	color: white;
	background: #fb53a3;
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
	max-width: 90%;
	height: auto;
	max-height: 90%;
	z-index: 9;
	background: #F9E4D4;
    color: #9C0F48;
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
		bottom: 0;
		padding: 0;
	}

	.buttons_container > *
	{
		flex-direction: row;
		justify-content: space-around;
		width: 50%;
	}

	.buttons_container .left
	{
		width: 40%;
	}

	.buttons_container .right
	{
		width: 60%;
	}
}

</style>
