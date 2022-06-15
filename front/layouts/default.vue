<template>
	<div class="layout">
		<Header/>
		<main>
			<Nuxt/>
		</main>
	</div>
</template>

<style scoped>

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

@media screen and (max-width: 500px)
{
	.layout
	{
		padding-top: 0;
		height: calc(100vh - 3.5rem);
		overflow: auto;
	}
}

</style>