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
			selected_match: null
		}
	},
}
</script>


<template>
	<div class="chat">
		<MatchList :matches="matches" @select_match="selected_match = $event"/>
		<MatchView :match="selected_match"/>
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
