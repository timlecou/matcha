<script>
export default {
	name: "Likes",
	data()
	{
		return {
			users: []
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
	}
}
</script>

<template>
	<div class="likes">
		<div class="item" v-for="user in users">
			<div class="photo_container">
				<img :src="require(`~/assets/${user.photos[0]}`)"/>
			</div>
			<p>{{ user.username }}</p>
			<p class="date">Aujourd'hui</p>
		</div>
	</div>
</template>

<style scoped>

.likes
{
	display: flex;
	flex-direction: column;
}

.item
{
	display: flex;
	align-items: center;
	padding: 0.5rem 1rem;
}

.photo_container
{
	flex: 0 0 auto;
	width: 3rem;
	height: 3rem;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 1rem;
}

.date
{
	width: -webkit-fill-available;
	text-align: right;
}

</style>