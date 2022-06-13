<script>

import NotificationItem from './NotificationItem';

export default {
	components: { NotificationItem },
	data()
	{
		return {
			notifications: [
				{
					id: 0,
					type: 'LIKE',
					user: {
						id: 0,
						photo: "https://cdn.pixabay.com/photo/2018/01/10/17/24/business-3074325_1280.png",
						username: "Timlecou"
					},
					date: new Date()
				},
				{
					id: 1,
					type: 'VISIT',
					user: {
						id: 0,
						photo: "https://cdn.pixabay.com/photo/2018/01/10/17/24/business-3074325_1280.png",
						username: "Timlecou"
					},
					date: new Date()
				},
				{
					id: 2,
					type: 'MESSAGE',
					user: {
						id: 0,
						photo: "https://cdn.pixabay.com/photo/2018/01/10/17/24/business-3074325_1280.png",
						username: "Timlecou"
					},
					date: new Date()
				},
				{
					id: 3,
					type: 'MATCH',
					user: {
						id: 0,
						photo: "https://cdn.pixabay.com/photo/2018/01/10/17/24/business-3074325_1280.png",
						username: "Timlecou"
					},
					date: new Date()
				},
				{
					id: 4,
					type: 'DISLIKE',
					user: {
						id: 0,
						photo: "https://cdn.pixabay.com/photo/2018/01/10/17/24/business-3074325_1280.png",
						username: "Timlecou"
					},
					date: new Date()
				},
			]
		}
	}
}
</script>

<template>
	<div class="notification">
		<div class="popup">
			<div class="content">
				<NotificationItem :notification="notification" :key="notification.id" v-for="notification in notifications"/>
			</div>
		</div>
	</div>
</template>

<style scoped>

.notification
{
	transform: translateY(1rem);
}

.notification::before
{
	content: '';
	position: absolute;
	left: 50%;
	width: 1rem;
	height: 1rem;
	background: var(--primary-background-color);
	transform: translate(-50%, -50%) rotateZ(45deg);
	box-shadow: 0 0 5px 1px rgba(0, 0, 0, .0975);
	z-index: 1;
}

.popup
{
	position: absolute;
	right: -2rem;
	box-shadow: 0 0 5px 1px rgba(0, 0, 0, .0975);
	width: 35rem;
	max-width: 90vw;
}

.popup,
.content
{
	border-radius: 0.5rem;
}

.content
{
	position: relative;
	width: 100%;
	height: 100%;
	background: var(--primary-background-color);
	z-index: 1;
}

</style>
