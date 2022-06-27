<script>

import HomeSVG from '~/assets/icons/home.svg?inline';
import DirectSVG from '~/assets/icons/direct.svg?inline';
import HeartSVG from '~/assets/icons/heart.svg?inline';
import AvatarSVG from '~/assets/icons/avatar.svg?inline';
import NotificationPopup from './notification/NotificationPopup';

export default {
	name: 'Header',
	components: { HomeSVG, DirectSVG, HeartSVG, AvatarSVG, NotificationPopup },
	data()
	{
		return {
			search: '',
			show_notification_popup: false
		}
	}
}

</script>

<template>
	<div class="header">
		<div class="content">
			<NuxtLink to="/browse" class="brand">Matcha</NuxtLink>

			<div class="search_bar">
				<input type="text" placeholder="Rechercher"/>
			</div>

			<nav>
				<div>
					<NuxtLink to="/browse">
						<HomeSVG/>
					</NuxtLink>
				</div>
				<div>
					<NuxtLink to="/matches">
						<DirectSVG/>
					</NuxtLink>
				</div>
				<div class="notification_link">
					<a href="#" @click="show_notification_popup = !show_notification_popup">
						<HeartSVG/>
					</a>
					<NotificationPopup v-if="show_notification_popup"/>
				</div>
				<div>
					<NuxtLink to="/profile">
						<AvatarSVG/>
					</NuxtLink>
				</div>
			</nav>
		</div>
		<div class="popup_fade" @click="show_notification_popup = !show_notification_popup" v-if="show_notification_popup" ></div>
	</div>
</template>

<style scoped>

.header
{
	display: flex;
	align-content: center;
	justify-content: center;
	width: 100%;
	background: white;
	position: sticky;
	top: 0;
	z-index: 1;
}

.content
{
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 0 auto;
	padding: 0.75rem 2rem;
	border-bottom: solid 1px var(--separator-color);
}

.content > *
{
	flex: 1 0 33.33%;
}

.brand
{
	font-family: 'Qwitcher Grypen', cursive;
	font-size: 2rem;
}

.search_bar
{
	padding: 0 1rem;
}

input
{
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	font-size: 16px;
}

input::placeholder
{
	font-size: 1rem;
}

nav
{
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

nav > div:not(:first-child)
{
	margin-left: 1.5rem;
}

.popup_fade
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: -1;
}

@media screen and (max-width: 550px)
{
	.header
	{
		position: static;
	}

	.brand
	{
		width: 100%;
		text-align: center;
	}

	.search_bar
	{
		display: none;
	}

	nav
	{
		position: fixed;
		bottom: 0;
		width: 100%;
		justify-content: space-around;
		padding: 0.5rem 0;
		background: var(--primary-background-color);
		border-top: solid 1px var(--separator-color);
	}
}

</style>