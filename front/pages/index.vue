<script>

import axios from 'axios'
import Header from '../components/Header.vue';
import Swiper from '../components/Swiper.vue';

export default {
	components: { Header, Swiper },
	layout: 'index',
	data()
	{
		return {
			users:
			[
				{
					id: 0,
					name: "Test 1",
					photos:
					[
						{
							id: 0,
							url: "/images/photo-2.png"
						},
						{
							id: 1,
							url: "/images/photo-4.jpg"
						}
					],
				},
			]
		}
	}
}
</script>

<template>
	<div class="container">
		<Swiper :user="user" v-for="user in users" :key="'swiper_' + user.id"/>
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
