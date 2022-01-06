<script>
export default {
	name: "Header",
	props:
	{
		fixed:
		{
			type: Boolean,
			required: false,
			default: false
		}
	},
	data()
	{
		return {
			expanded: false,
			notifications:
			[
				{
					text: "Nao vous a envoyé un message."
				},
				{
					text: "Truc a liké votre photo."
				}
			]
		}
	}
}
</script>

<template>
	<header :class="{expanded: expanded, fixed: fixed}">
		<div>
			<div class="links_toggler" @click="expanded = !expanded" v-if="this.$store.state.is_logged_in">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div class="links_container">
				<NuxtLink @click.native="expanded = false" to="/">Home</NuxtLink>
				<NuxtLink @click.native="expanded = false" to="/chat">Chat</NuxtLink>
				<NuxtLink @click.native="expanded = false" to="/search">Search</NuxtLink>
				<NuxtLink @click.native="expanded = false" to="/map">Map</NuxtLink>
				<NuxtLink @click.native="expanded = false" to="/profile">Profile</NuxtLink>
			</div>
		</div>
		<div class="right">
			<div class="notification_container" v-if="this.$store.state.is_logged_in">
				<div class="notification_button">	
					<svg viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<title>notification-solid</title>
						<path fill="currentColor" d="M32.85,28.13l-.34-.3A14.37,14.37,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15A10.81,10.81,0,0,0,19.21,4.4V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93l-.34.3v2.82H32.85Z"></path>
						<path fill="currentColor" d="M15.32,32a2.65,2.65,0,0,0,5.25,0Z"></path>
						<rect fill="currentColor" x="0" y="0" width="36" height="36" fill-opacity="0"/>
					</svg>
				</div>
				<div class="notification_popup">
					<p class="notification" v-for="notification in notifications">{{ notification.text }}</p>
					<p v-if="notifications.length == 0">Vous n'avez pas de notifications</p>
				</div>
			</div>
			<div class="account_button" v-if="this.$store.state.is_logged_in">
				<div class="profile_photo"></div>
				<div class="profile_popup">
					<p>
						<NuxtLink to="/profile">Edit your profile</NuxtLink>
					</p>
					<p>Logout</p>
				</div>
			</div>
		</div>
		<div class="fade" @click="expanded = false" v-if="expanded">
		</div>
	</header>
</template>

<style scoped>

header
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	width: fit-content;
	padding: 1rem;
	z-index: 1;
}

header.fixed
{
	position: fixed;
	top: 0;
	left: 0;
}

.links_toggler
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	width: 1.75rem;
	height: 1.75rem;
	cursor: pointer;
	z-index: 3;
}

.links_toggler span
{
	width: 100%;
	height: 0.125rem;
	background: white;
	margin: 0.15rem 0;
	transform-origin: center center;
	transition: all 0.25s;
}

header.expanded .links_toggler span
{
	background: #FB53A3;
}

header.expanded .links_toggler span
{
	position: absolute;
	top: 50%;
}

header.expanded .links_toggler span:nth-child(1)
{
	transform: translateY(-50%) rotateZ(45deg);
}

header.expanded .links_toggler span:nth-child(2)
{
	display: none;
}

header.expanded .links_toggler span:nth-child(3)
{
	transform: translateY(-50%) rotateZ(-45deg);
}

.right
{
	display: flex;
	align-items: center;
	display: none;
}

.right > div
{
	margin: 0 0.75rem;
}

.notification_button
{
	width: 2rem;
	cursor: pointer;
	color: white;
}

.notification_button svg
{
	width: 100%;
}

.account_button
{
	position: relative;
	cursor: pointer;
}

.profile_photo
{
	width: 2.25rem;
	height: 2.25rem;
	border-radius: 100%;
	background: #C4C4C4;
}

.fade
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.2);
	z-index: 0;
}

.links_container
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 20rem;
	height: 100vh;
	padding-top: 3rem;
	background: white;
	color: #FB53A3;
	z-index: 2;
	transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
	transform: translateX(-100%);
}

header.expanded .links_container
{
	transform: translateX(0);
}

.links_container a
{
	width: 100%;
	padding: 0.75rem 0;
	font-size: 1.5rem;
	text-align: center;
	cursor: pointer;
}

h1
{
	font-size: 2rem;
	font-weight: normal;
}

a
{
	color: inherit;
	text-decoration: none;
}

.notification_container
{
	position: relative;
}

.notification_popup,
.profile_popup
{
	display: none;
	position: absolute;
	right: 0;
	width: 20rem;
	max-width: 100vw;
	border: solid 1px white;
	padding: 1rem 2rem;
	background: #FB53A3;
	box-shadow: 0px 0px 9px 0px rgba(200, 200, 200,0.7);
	z-index: 2;
}

.account_button:hover .profile_popup
{
	width: 15rem;
	text-align: center;
}

.account_button:hover .profile_popup p:first-child
{
	margin-bottom: 0.25rem;
}

.notification_container:hover .notification_popup,
.account_button:hover .profile_popup
{
	display: block;
}

.notification
{
	margin: 0.25rem 0;
	padding: 0.25rem 0;
	cursor: pointer;
}

@keyframes anim_links_container
{
	from
	{
		
	}
	to
	{
		transform: translateX(0);
	}
}

</style>
