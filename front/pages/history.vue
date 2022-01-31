<script>
export default {
	name: "History",
	beforeRouteEnter(to, from, next)
	{
		next(vm =>
		{
			if (!vm.$store.state.is_logged_in)
				next('/sign_in')
		})
	},
}
</script>

<template>
	<div class="history">
		<h1>History</h1>
		<div class="nav">
			<NuxtLink to="/history/visits">Visits</NuxtLink>
			<NuxtLink to="/history/likes">Likes</NuxtLink>
		</div>
		<div class="view">
			<NuxtChild/>
		</div>
	</div>
</template>

<style scoped>

h1
{
	font-weight: normal;
	text-align: center;
	width: 100%;
}

.nav
{
	display: flex;
	align-items: center;
	width: fit-content;
	margin: 1rem auto;
	font-size: 1.25rem;
}

.nav > *
{
	position: relative;
	display: block;
	margin: 0 1rem;
	padding: 0.5rem 1rem;
}

.nav *:after
{
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0.125rem;
	transform: translateX(-50%);
	transition: all 0.125s;
	background: #9c0f48;
}

.nav .nuxt-link-active:after
{
	width: 100%;
}

.view
{
	margin: 1rem;
	margin: 0 auto;
}

</style>