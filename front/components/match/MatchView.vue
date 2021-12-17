<script>
export default {
	name: "MatchView",
	data()
	{
		return {
			message: ""
		}
	},
	props:
	{
		match:
		{
			type: Object | null,
			required: true,
		}
	},
	methods:
	{
		sendMessage()
		{
			console.log(this.message)
			this.message = "";
		}
	}
}
</script>

<template>
	<div class="match_view">
		<div class="header" v-if="match">
			<div class="photo">
				<img :src="require(`~/assets${match.user.photo}`)"/>
			</div>
			<p class="name">{{ match.user.name }}</p>
		</div>
		<div class="message_list" v-if="match">
			<div class="message" :class="{me: message.author.id == 2}" v-for="message in match.messages">
				<p>{{ message.text }}</p>
			</div>
		</div>
		<div class="input_bar" v-if="match">
			<input id="message_input" type="text" v-model="message" :placeholder="'Dites salam à ' + match.user.name" @keypress.enter="sendMessage"/>
			<div class="send_button" @click="sendMessage">Envoyer</div>
		</div>
	</div>
</template>

<style scoped>

.match_view
{
	display: flex;
	flex-direction: column;
	width: 66.66%;
}

.header
{
	display: flex;
	align-items: center;
	padding: 0.5rem 1rem;
}

.header .photo
{
	width: 2.5rem;
	height: 2.5rem;
}

.photo img
{
	width: 100%;
	height: 100%;
	border-radius: 100%;
}

.header .name
{
	width: -webkit-fill-available;
	width: -moz-available;
	text-align: center;
	margin: 0;
	font-size: 1.25rem;
}

.message_list
{
	width: 100%;
	height: -moz-available;
	height: -webkit-fill-available;
	overflow-y: auto;
	padding: 0.5rem;
}

.message
{
	padding: 1rem;
	margin: 0.25rem 0;
    background: #00bfa5;
    width: fit-content;
	max-width: 80%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
}

.message.me
{
	margin-left: auto;
	background: #0189fe;
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 0;
}

.input_bar
{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
}

#message_input
{
	width: 100%;
	padding: 0.5rem 0.75rem;
	outline: none;
	font-size: 1rem;
	border-top-left-radius: 1rem;
	border-bottom-left-radius: 1rem;
	border: none;
}

.send_button
{
	padding: 0.5rem 1rem;
	background: #0189fe;
	border-top-right-radius: 1rem;
	border-bottom-right-radius: 1rem;
	cursor: pointer;
}

</style>
