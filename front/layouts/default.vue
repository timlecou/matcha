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
	overflow-x: hidden;
}

main
{
	display: flex;
	justify-content: center;
	flex: 1 0 auto;
}

@media screen and (max-width: 500px)
{
	.layout
	{
		padding-top: 0;
		height: calc(100vh - 4rem);
		overflow-y: auto;
	}
}

</style>