<script>

import * as moment from 'moment';

export default {
	props:
	{
		notification:
		{
			type: Object,
			required: true
		}
	},
	computed:
	{
		isViewButton()
		{
			let x = this.notification.type;
			return (x == 'LIKE' || x == 'VISIT' || x == 'DISLIKE');
		},
		date()
		{
			return moment(this.notification.date).fromNow();
		}
	}
}
</script>

<template>
	<div class="notification_item">
		<div class="description">
			<div class="profile_photo">
				<img :src="notification.user.photo" alt="Profile photo"/>
			</div>
			<p> 
				<NuxtLink :to="`/users/${notification.user.username}`">{{ notification.user.username }}</NuxtLink>
				<span v-if="notification.type == 'LIKE'"> liked your profile.</span>
				<span v-else-if="notification.type == 'VISIT'"> visited your profile.</span>
				<span v-else-if="notification.type == 'MESSAGE'"> sent your a message.</span>
				<span v-else-if="notification.type == 'MATCH'">liked you back.</span>
				<span v-else-if="notification.type == 'DISLIKE'">unliked you.</span>
				
				<span class="date">{{ date }}</span>
			</p>
		</div>
		<div class="action_buttons">
			<button v-if="isViewButton">View</button>
			<button v-else>Message</button>
		</div>
	</div>
</template>

<style scoped>

.notification_item
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	font-size: 0.9rem;
}

.notification_item > div
{
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.profile_photo
{
	overflow: hidden;
	border-radius: 100%;
	width: 3rem;
	height: 3rem;
	display: flex;
    justify-content: center;
	align-items: center;
	border: solid 1px var(--separator-color);
	margin-right: 1rem;
	background: var(--secondary-background-color);
	flex: 1 0 auto;
}

.description
{
	margin-right: 1rem;
}

.description p a
{
	font-weight: 600;
}

button
{
	background: var(--primary-blue);
	color: var(--primary-background-color);
	padding: 0.4rem 1.75rem;
	font-size: 0.8rem;
	border-radius: 0.375rem;
	font-weight: 600;
}

.date
{
	font-size: 0.8rem;
	color: var(--secondary-text-color);
}

</style>