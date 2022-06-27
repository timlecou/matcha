<script>
import MatchListItem from './MatchListItem.vue'
export default {
	components: { MatchListItem },
	props:
	{
		matches:
		{
			type: Array,
			required: true
		},
		selected_match:
		{
			type: Object | null,
			required: true
		},
	},
	methods:
	{
		onSelectMatch(match)
		{
			this.$emit('select_match', match);
		}
	}
}
</script>

<template>
	<section>
		<div class="header">
			<h1>Matches</h1>
		</div>
		<div class="matches_container">
			<MatchListItem :match="match" :selected="selected_match && selected_match.id == match.id"
						@select="onSelectMatch(match)"
						v-for="match in matches" :key="`match_${match.id}`"/>
		</div>
	</section>
</template>

<style scoped>

section
{
	display: flex;
	flex-direction: column;
	border-right: solid 1px var(--separator-color);
	height: 100%;
	width: 33.33%;
	flex: 1 0 auto;
}

.header
{
	border-bottom: solid 1px var(--separator-color);
	padding: 0.125rem 0;
}

h1
{
	text-align: center;
	padding: 0.5rem 1rem;
	margin: 0.5rem 0;
}

.matches_container
{
	overflow: auto;
}

</style>