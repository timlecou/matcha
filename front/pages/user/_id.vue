<script>
import UserView from '../../components/UserView.vue'
export default {
	components: { UserView },
	name: "UserViewPage",
	data()
	{
		return {
			user:
			{
				id: 1,
				name: "Yassine",
				profile_photo: "/images/photo-1.jpeg",
				biography: "Hey ! Je suis Sirine, ceci est ma biographie.Mon github c est Sirine-dev hahaha",
				online: true,
				score: 97.5,
				liked: false,
				photos:
				[
					{
						id: 0,
						path: "/images/photo-1.jpeg"
					},
					{
						id: 1,
						path: "/images/photo-1.jpeg"
					},
					{
						id: 2,
						path: "/images/photo-1.jpeg"
					},
					
				],
				interests:
				[
					{
						id: 0,
						name: "bio",
					},
					{
						id: 1,
						name: "geek",
					},
					{
						id: 2,
						name: "Islam",
					},
				]
			}
		}
	},
	asyncData({ params })
	{
		return {id: params.id}
	},
}
</script>

<template>
	<div class="user_view">
		<UserView :user="user"/>
	</div>	
</template>

<style scoped>

</style>
