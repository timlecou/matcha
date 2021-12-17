<script>
export default {
	name: "Section",
	props:
	{
		title:
		{
			type: String,
			required: true
		},
		default_expanded:
		{
			type: Boolean,
			required: false,
			default: false
		}
	},
	data()
	{
		return {
			expanded: this.default_expanded
		}
	},
}
</script>

<template>
	<section :class="{expanded: expanded}">
		<div class="header" @click="expanded = !expanded">
			<p>{{ title }}</p>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
				<polygon fill="currentColor" points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
				<rect fill="none" width="32" height="32"/>
			</svg>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</section>
</template>

<style scoped>

section
{
	display: flex;
	flex-direction: column;
	margin: 0rem 0;
}

.header
{
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	padding: 0.5rem 0;
}

.header svg
{
	width: 1.5rem;
	height: 1.5rem;
	transition: all 0.25s;
	transform: rotateZ(90deg);
}

.expanded svg
{
	transform: rotateZ(0deg);
}

.content
{
	display: flex;
	flex-direction: column;
	width: 100%;
	max-height: 0;
	overflow: hidden;
	transition: all 0.5s;
}

.expanded .content
{
	max-height: 30rem;
	padding: 1rem 0;
}

</style>