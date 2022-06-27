<script>
import MatchViewHeader from './MatchViewHeader.vue';
import MatchMessageItem from './MatchMessageItem.vue';
import DirectSVG from '~/assets/icons/direct-surrounded.svg?inline';
import MatchMessageForm from './MatchMessageForm.vue';

export default {
	components: { MatchMessageItem, MatchViewHeader, DirectSVG, MatchMessageForm },
	props:
	{
		match:
		{
			type: Object | null,
			required: true
		},
	},
	methods:
	{
		goBack()
		{
			this.$emit('go_back');
		},

		showDetails()
		{
			this.$emit('show_details');
		}
	}
}
</script>

<template>
	<section>
		<div v-if="match">
			<MatchViewHeader :match="match" @go_back="goBack" @show_details="showDetails"/>

			<div class="messages_container">
				<MatchMessageItem :message="message" v-for="message in match.messages" :key="`message_${message.id}`"/>
			</div>

			<MatchMessageForm/>
		</div>
		<div class="select_match" v-else>
			<div class="direct_icon">
				<DirectSVG/>
			</div>
			<p class="title">Your match messages</p>
			<p>Send private messages or start a new discussion with a match.</p>
			<button class="send_button">Send a message</button>
		</div>
	</section>
</template>

<style scoped>

section
{
	display: flex;
	width: 66.66%;
}

section > div
{
	display: flex;
	flex-direction: column;
	width: 100%;
}

.messages_container
{
	padding: 1rem 2rem;
	overflow: auto;
	margin-bottom: 1rem;
}

.select_match
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.direct_icon
{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5.5rem;
	height: 5.5rem;
	max-width: 100%;
}

.select_match > *
{
	margin: 0.5rem 0;
}

.title
{
	font-size: 1.5rem;
}

.send_button
{
	padding: 0.5rem 1rem;
	background: var(--primary-blue);
	color: white;
	font-weight: 600;
	letter-spacing: 0.25px;
	border-radius: 0.25rem;
}

</style>