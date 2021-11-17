<script>
export default {
	name: "Header"
}
</script>

<template>
	<header>
		<div>
			<div class="links_toggler">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="left">
			<div class="notification_button">	
				<svg viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<title>notification-solid</title>
					<path fill="currentColor" d="M32.85,28.13l-.34-.3A14.37,14.37,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15A10.81,10.81,0,0,0,19.21,4.4V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93l-.34.3v2.82H32.85Z"></path>
					<path fill="currentColor" d="M15.32,32a2.65,2.65,0,0,0,5.25,0Z"></path>
					<rect fill="currentColor" x="0" y="0" width="36" height="36" fill-opacity="0"/>
				</svg>
			</div>
			<div class="account_button">
				<div class="profile_photo"></div>
			</div>
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
	padding: 1rem;
	background: #FB53A3;
}

.links_toggler
{
	display: flex;
	flex-direction: column;
	width: 1.75rem;
	cursor: pointer;
}

.links_toggler span
{
	width: 100%;
	height: 0.125rem;
	background: white;
	margin: 0.15rem 0;
}

.left
{
	display: flex;
	align-items: center;
}

.left > div
{
	margin: 0 1rem;
}

.notification_button
{
	width: 2rem;
	cursor: pointer;
}

.notification_button svg
{
	width: 100%;
}

.account_button
{
	cursor: pointer;
}

.profile_photo
{
	width: 2.25rem;
	height: 2.25rem;
	border-radius: 100%;
	background: #C4C4C4;
}

</style>
