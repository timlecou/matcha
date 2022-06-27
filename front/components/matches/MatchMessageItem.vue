<script>
export default {
	props:
	{
		message:
		{
			type: Object,
			required: true
		}
	},
	data()
	{
		return {
			me_id: 0
		}
	},
	computed:
	{
		main_photo()
		{
			return this.message.user.photos[0].path;
		}
	}
}
</script>

<template>
	<div class="message_item" :class="{me: message.user.id == me_id}">
		<div class="image">
			<img :src="main_photo"/>
		</div>
		<p>{{ message.content }}</p>
	</div>
</template>

<style scoped>

.message_item
{
	display: flex;
	align-items: center;
	margin: 0.5rem 0;
	max-width: 50%;
}

.message_item.me
{
	margin-left: auto;
	flex-direction: row-reverse;
}

.image
{
	width: 1.75rem;
	height: 1.75rem;
	border-radius: 100%;
	overflow: hidden;
	margin: 0 0.5rem;
	flex: 0 0 auto;
}

p
{
	margin: 0;
	padding: 0.75rem 1rem;
	border: solid 1px var(--highlight-background);
	border-radius: 1.25rem;
	font-size: 0.9rem;
}

.me p
{
	background: var(--highlight-background);
}

@media screen and (max-width: 600px)
{
	.message_item
	{
		max-width: 75%;
	}
}

</style>