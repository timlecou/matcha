<script>
export default {
	name: "MatchView",
	props:
	{
		match:
		{
			type: Object | null,
			required: true,
		},
		show:
		{
			type: Boolean,
			required: true
		}
	},
	data()
	{
		return {
			message: ""
		}
	},
	methods:
	{
		sendMessage()
		{
			this.$axios.post(`/api/matches/${this.match.match_id}/messages`, {content: this.message})
			.then(res =>
			{
				this.message = "";
			})
			.catch(err =>
			{
				this.$toast.error("Cannot send message");
			});
		},
		back()
		{
			this.$emit('back');
		}
	}
}
</script>

<template>
	<div class="match_view" :class="{show: show}">
		<div class="header" v-if="match">
			<div class="back_button" @click="back">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.295 19.716a1 1 0 0 0 1.404-1.425l-5.37-5.29h13.67a1 1 0 1 0 0-2H6.336L11.7 5.714a1 1 0 0 0-1.404-1.424l-6.924 6.822a1.25 1.25 0 0 0 0 1.78l6.924 6.823Z"/></svg>
			</div>
			<div class="photo">
				<img :src="match.photos.paths[0]" v-if="match.photos.paths.length > 0"/>
			</div>
			<p class="name">{{ match.first_name }}</p>
		</div>
		<div class="message_list" v-if="match">
			<div class="message" :class="{me: message == 2}" v-for="message in match.messages">
				<p>{{ message.message }}</p>
			</div>
		</div>
		<div class="input_bar" v-if="match">
			<input id="message_input" type="text" v-model="message" :placeholder="'Dites salam à ' + match.first_name" @keypress.enter="sendMessage"/>
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
	background: white;
	border-radius: 100%;
	overflow: hidden;
	flex: 0 0 auto;
}

.photo img
{
	width: 100%;
	height: 100%;
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
	color: white;
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
	color: white;
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

.back_button
{
	display: none;
}

@media screen and (max-width: 550px)
{
	.back_button
	{
		display: block;
		width: 2rem;
	}

	.photo
	{
		display: none;
	}

	.match_view:not(.show)
	{
		display: none;
		width: 0;
		transition: all 0.25s;
	}

	.match_view.show
	{
		width: 100%;
		flex: 0 0 auto;
	}
}

</style>
