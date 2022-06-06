<script>
import MatchList from '../../components/match/MatchList.vue'
import MatchView from '../../components/match/MatchView.vue'

/**
 * {
 * 		to_id: number,
 * 		content: string
 * }
 */

export default {
	components: { MatchList, MatchView },
	name: "Chat",
	data()
	{
		return {
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
	computed:
	{
		matches()
		{
			return this.$store.state.matches;
		}
	},
	created()
	{
		this.$store.dispatch('loadMatches');
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
	border-top: solid 1px #9c0f48;
	width: 100%;
	height: calc(100vh - 4.25rem);
	color: #9c0f48;
}

</style>
