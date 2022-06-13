<script>

import VueScrollTo from 'vue-scrollto';

export default {
	layout: 'auth',
	data()
	{
		return {
			is_login_visible: 0
		}
	},
	methods:
	{
		visibilityChanged(isVisible, entry)
		{
			this.is_login_visible = isVisible;
		}
	}
}

</script>

<template>
	<div class="index">
		<div class="background"></div>
		<section class="overview">
			<h1>Matcha</h1>
			<NuxtLink class="sign_in_button" to="/browse">Explore profiles</NuxtLink>
		</section>
	</div>
</template>

<style scoped>

.index
{
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
}

.overview
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100vw;
	height: 100vh;
	color: var(--primary-background-color);
}

.background
{
	position: fixed;
	top: 0;
	left: 0;
	background-image: url("https://tinder.com/static/build/184abbc6dbfb37e127d91e1695d0a468.webp");
	background-size: cover;
	width: 100%;
	height: 100%;
	filter: brightness(0.6);
	z-index: -1;
}

h1
{
	font-family: 'Qwitcher Grypen', cursive;
	text-align: center;
	font-size: 15vw;
	margin: 0;
}

#auth_container
{
	display: flex;
	justify-content: space-around;
	padding: 3rem 0;
	overflow: hidden;
}

#auth_container > *:first-child
{
	opacity: 0;
	transform: translateY(15vh);
	transition: transform 0.5s, opacity 1s;
}

.in_view#auth_container > *:first-child
{
	opacity: 1;
	transform: translateY(0vh);
}

.sign_in_button
{
	padding: 1rem 2rem;
	font-size: 1.1rem;
	border-radius: 1.5rem;
	width: 15rem;
	max-width: 80%;
	text-align: center;
	background: linear-gradient(45deg,rgb(0, 149, 246),rgb(1 72 118));
}

</style>