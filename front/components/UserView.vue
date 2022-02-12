<script>
export default {
	name: "UserView",
	props:
	{
		user:
		{
			type: Object,
			required: true
		},
	}
}
</script>

<template>
	<div class="profile">
		<div class="info">
			<div class="photo_status">
				<div class="profile_photo">
					<img :src="user.profile_photo"/>
				</div>
				<p class="status">
					<span v-if="user.online">online</span>
					<span v-else>Last seen at 19/11/21</span>
				</p>
			</div>
			<div class="name_bio_score">
				<div class="name_score">
					<h1 class="name">{{ user.name }}</h1>
					<span class="score">{{ user.score }}</span>
				</div>
				<p class="biography">{{ user.biography }}</p>
				<div class="heart_button" :class="{filled: user.liked}">
					<svg data-v-7f30ecda="" viewBox="0 0 24 24" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path data-v-7f30ecda="" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
				</div>
			</div>
		</div>
		<div class="photos_container">
			<div class="photo" v-for="photo in user.photos">
				<img :src="user.profile_photo"/>
			</div>
		</div>
		<div class="interests_div">
			<h2>Interests</h2>
			<div class="interests_container">
				<div class="interest" v-for="interest in user.interests">
					#{{ interest.name }}
				</div>
			</div>
		</div>
		<div class="action_buttons">
			<div class="report_button">Report</div>
			<div class="block_button">Block</div>
		</div>
	</div>
</template>

<style scoped>

.profile
{
	display: flex;
	flex-direction: column;
	width: 40rem;
	max-width: 100%;
	margin: 0 auto;
	padding: 1rem;
}

.info
{
	display: flex;
	align-items: center;
}

.photo_status
{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 1rem;
}

.profile_photo
{
	width: 10rem;
}

.profile_photo img
{
	width: 100%;
	border-radius: 100%;
}

.status
{
	text-align: center;
	margin: 0.5rem 0;
}

.name_bio_score
{
	margin: 0 1rem;
}

.name_bio_score p
{
	margin: 0.5rem 0;
}

.name_score
{
	display: flex;
	justify-content: space-between;
}

.name_bio
{
	display: flex;
	justify-content: space-between;
}

.info .name
{
	font-size: 2rem;
	font-weight: normal;
}

.score
{
	font-size: 2rem;
	color: #49F67A;
}

.heart_button
{
	width: 3.5rem;
	margin-left: auto;
	cursor: pointer;
}

.heart_button svg
{
	width: 100%;
	fill: transparent;
}

.heart_button.filled svg
{
	fill: red;
	stroke: red;
}

.photos_container
{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 1rem 0;
	overflow-x: auto;
}

.photos_container .photo
{
	flex-shrink: 0;
	width: 7.5rem;
	height: 10rem;
	margin: 0 0.5rem;
}

.photos_container img
{
	width: 100%;
	height: 100%;
}

.interests_div h2
{
	font-weight: normal;
	font-size: 1.75rem;
	margin: 0.5rem 0;
}

.interests_container
{
	display: flex;
	padding-left: 1rem;
}

.interest
{
	padding: 0 0.25rem;
}

.action_buttons
{
	display: flex;
	justify-content: center;
	margin-top: 2rem;
	padding: 1rem 0;
}

.action_buttons div
{
	padding: 0.5rem 1rem;
	min-width: 10rem;
	border: solid 1px white;
	cursor: pointer;
	text-align: center;
	margin: 0 0.25rem;
}

</style>