<script>

import CloseSVG from '~/assets/icons/close.svg?inline';

export default {
	components: { CloseSVG },
	props:
	{
		user:
		{
			type: Object,
			required: true
		}
	},
	data()
	{
		return {
			tag: ""
		}
	},
	computed:
	{
		placeholder()
		{
			const placeholders = ["Tech", "Cat", "Book", "Sport", "Food", "Football", "Basketball", "Baseball", "Nightclub", "Travel"]
			const ret = [
				placeholders[Math.floor(Math.random() * placeholders.length)],
				placeholders[Math.floor(Math.random() * placeholders.length)],
				placeholders[Math.floor(Math.random() * placeholders.length)],
			];
			return ret.join(', ');
		}
	},
	methods:
	{
		handleSubmitTag(e)
		{
			e.preventDefault();
			this.user.tags.push(this.tag);
			this.tag = '';
		}
	}
}
</script>

<template>
	<div class="tags_editor">
		<div class="tags_container">
			<div class="tag" v-for="(tag, index) in user.tags" :key="`tag_${index}`">
				#{{ tag }}
				<div class="remove_button">
					<CloseSVG/>
				</div>
			</div>
		</div>
		<form class="input_form" @submit="handleSubmitTag">
			<input type="text" :placeholder="placeholder" autofocus v-model="tag"/>
			<button class="send_button">Envoyer</button>
		</form>
	</div>
</template>

<style scoped>

.tags_editor
{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	width: 100%;
}

.tags_container
{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 1rem;
}

.tag
{
	position: relative;
	padding: 0.25rem 0.5rem;
	background: var(--primary-blue);
	color: white;
	margin: 0.5rem;
	cursor: pointer;
}

.remove_button
{
	position: absolute;
	top: 0;
	right: 0;
	width: 1rem;
	height: 1rem;
	transform: translate(50%, -50%);
	padding: 0.0625rem;
	background: var(--primary-blue);
	border: solid 1px white;
	border-radius: 100%;
	transition: all 0.125s;
}

.tag:hover .remove_button
{
	background: var(--remove-color);
}

.input_form
{
	display: flex;
	align-items: center;
	margin-top: auto;
	padding: 0.5rem 0.5rem 0.5rem 1rem;
	border: solid 1px var(--separator-color);
	border-radius: 2rem;
	width: 22rem;
	max-width: 100%;
}

input
{
	border: none;
	background: inherit;
}

.send_button
{
	color: var(--primary-blue);
	margin-left: 0.5rem;
	background: inherit;
	font-size: 0.9rem;
}

</style>
