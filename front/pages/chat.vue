<script>
import MatchList from '../components/match/MatchList.vue'
import MatchView from '../components/match/MatchView.vue'
export default {
	components: { MatchList, MatchView },
	name: "Chat",
	data()
	{
		return {
			matches:
			[
				{
					id: 1,
					user:
					{
						id: 1,
						name: "Yass",
						photo: "/images/photo-1.jpeg"
					},
					last_update_time: "10:03",
					messages:
					[
						{
							id: 1,
							author:
							{
								id: 1,
								name: "Yass"
							},
							text: "Salam Aleykoum bg ca va ?"
						},
						{
							id: 2,
							author:
							{
								id: 2,
								name: "Me"
							},
							text: "Aleykoum salam ca va et toi ?"
						},
					]
				},
				{
					id: 2,
					user:
					{
						id: 1,
						name: "Nao",
						photo: "/images/photo-2.png"
					},
					last_update_time: "10:03",
					messages:
					[
						{
							id: 1,
							author:
							{
								id: 1,
								name: "Yass"
							},
							text: "Salam Aleykoum bg ca va ?"
						},
						{
							id: 2,
							author:
							{
								id: 2,
								name: "Me"
							},
							text: "Aleykoum salam ca va et toi ?"
						},
					]
				},
			],
			// Object are copied by reference with '=' operator
			selected_match: null,

			// For little screen
			show: 'list'
		}
	},
	beforeRouteEnter(to, from, next)
	{
		next(vm =>
		{
			if (!vm.$store.state.is_logged_in)
				next('/sign_in')
		})
	},
	methods:
	{
		selectMatch(match)
		{
			this.selected_match = match;
			this.show = 'chat';
		}
	}
}
</script>


<template>
	<div class="chat">
		<MatchList :show="show == 'list'" :matches="matches" @select_match="selectMatch"/>
		<MatchView :show="show == 'chat'" :match="selected_match" @back="show = 'list'"/>
	</div>
</template>

<style scoped>

.chat
{
	display: flex;
	border-top: solid 1px white;
	width: 100%;
	height: calc(100vh - 4.25rem);
	color: white;
}

</style>
