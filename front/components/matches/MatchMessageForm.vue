<script>

import EmojiSVG from '~/assets/icons/emoji.svg?inline';
import ImageSVG from '~/assets/icons/image.svg?inline';
import EmojiPicker from '~/components/utils/emoji-picker/EmojiPicker.vue';

export default {
	components: { EmojiPicker, EmojiSVG, ImageSVG },
	data()
	{
		return {
			message: "",
			show_emoji_picker: false,
		}
	},
	methods:
	{
		addEmoji(emoji)
		{
			this.message += emoji 
		},

		toggleEmojiPicker()
		{
			this.show_emoji_picker = !this.show_emoji_picker;
		},

		handleSubmit(e)
		{
			e.preventDefault();
			alert(this.message)
		}
	}
}

</script>

<template>
	<form class="message_form" @submit="handleSubmit">
		<div class="image button emoji_button">
			<EmojiSVG @click="toggleEmojiPicker"/>
			<div class="fade" @click="toggleEmojiPicker" v-if="show_emoji_picker"></div>
			<div class="emoji_picker_container" v-if="show_emoji_picker">
				<EmojiPicker @emoji_click="addEmoji"/>
			</div>
		</div>
		
		<input type="text" placeholder="Your message..." v-model="message"/>

		<label class="image button file_button" v-if="message.length == 0">
			<ImageSVG/>
			<input type="file"/>
		</label>

		<button class="send_button" v-else>Send</button>
	</form>
</template>

<style scoped>

.message_form
{
	--padding-top: 1rem;

	display: flex;
	align-items: center;
	margin: 1rem;
	margin-top: auto;
	padding: 0.5rem var(--padding-top);
	border: solid 1px var(--separator-color);
	border-radius: 2rem;
}

input
{
	background: inherit;
	font-size: 1rem;
	margin: 0 1rem;
	border: none;
}

.image
{
	width: 2rem;
	height: 2rem;
}

.button svg
{
	cursor: pointer;
}

.file_button input
{
	display: none;
}

.emoji_button
{
	position: relative;
}

.emoji_picker_container
{
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, calc(-100% - var(--padding-top)));
}

.fade
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: transparent;
}

.send_button
{
	color: var(--primary-blue);
	background: none;
	font-size: 1rem;
}

</style>