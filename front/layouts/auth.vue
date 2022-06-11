<template>
	<div class="layout">
		<main>
			<Nuxt/>
		</main>
	</div>
</template>

<style>

.layout
{
	width: 100%;
	display: flex;
	flex-direction: column;
}

main
{
	display: flex;
	justify-content: center;
	padding: 2rem 0;
}

input
{
	background: var(--secondary-background-color);
	border: 0;
	margin: 0;
	outline: 0;
	overflow: hidden;
}

</style>