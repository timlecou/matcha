<script>

import MatchDetails from '../components/matches/MatchDetails.vue'
import MatchList from '../components/matches/MatchList.vue'
import MatchView from '../components/matches/MatchView.vue'

export default {
	components: { MatchList, MatchView, MatchDetails },
	data()
	{
		return {
			selected_match: null,
			current_view: 'list', // 'list' | 'chat' | 'details'
			matches:
			[
				{
					id: 0,
					date: new Date(2022, 5, 22, 10, 0, 0),
					user:
					{
						id: 1,
						username: "Yassine",
						photos:
						[
							{
								id: 0,
								path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
							}
						],
					},
					messages:
					[
						{
							id: 0,
							user:
							{
								id: 1,
								photos:
								[
									{
										id: 0,
										path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
									}
								],
							},
							content: "Bonjour je te contacte car j'ai créé un super composant permettant d'utiliser des émojis dans ton application web !",
							date: new Date()
						},
						{
							id: 1,
							user:
							{
								id: 0,
								photos:
								[
									{
										id: 0,
										path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
									}
								],
							},
							content: "WOW 😮 ! Avec quel framework puis-je l'utiliser ?",
							date: new Date()
						},
						{
							id: 2,
							user:
							{
								id: 1,
								photos:
								[
									{
										id: 0,
										path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
									}
								],
							},
							content: "Tu peux l'utiliser avec React.js ou avec Vue.js ! Il est disponible sur mon github: yass-dev",
							date: new Date(2022, 5, 22, 10, 22, 0)
						},
						{
							id: 3,
							user:
							{
								id: 0,
								photos:
								[
									{
										id: 0,
										path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
									}
								],
							},
							content: "Il est vraiment chouhette, j'ajoute une star ! 🌟",
							date: new Date(2022, 5, 22, 10, 22, 0)
						},
					]
				}
			]
		}
	},
	methods:
	{
		setSelectedMatch(match)
		{
			this.selected_match = match;
			this.setCurrentView('chat');
		},
		setCurrentView(view)
		{
			this.current_view = view;
		}
	}
}

</script>

<template>
	<div class="matches">
		<MatchList class="match_list" :class="{active: current_view == 'list'}" :matches="matches" :selected_match="selected_match"
					@select_match="setSelectedMatch"/>

		<MatchView class="match_view" :class="{active: current_view == 'chat'}"  :match="selected_match"
					@go_back="setCurrentView('list')" @show_details="setCurrentView('details')"
					v-if="current_view != 'details'"/>

		<MatchDetails class="match_details" :class="{active: current_view == 'details'}" :match="selected_match"
					@hide_details="setCurrentView('chat')"
					v-else/>
	</div>
</template>

<style scoped>

.matches
{
	display: flex;
	height: calc(100vh - 3.75rem);
	width: 100%;
	background: var(--primary-background-color);
}


@media screen and (max-width: 550px)
{
	.matches
	{
		height: calc(100vh - 7rem);
	}

	.match_list,
	.match_view,
	.match_details
	{
		display: none;
	}

	.active
	{
		display: flex;
		width: 100%;
	}
}

</style>