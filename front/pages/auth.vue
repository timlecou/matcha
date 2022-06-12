<script>

import ChevronLeftSVG from '@/assets/icons/chevron-left.svg?inline';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register.vue';

export default {
	layout: 'auth',
	components: { Login, Register, ChevronLeftSVG,  },
}

</script>

<template>
	<div class="auth">
		<NuxtLink class="back_button" to="/">
			<ChevronLeftSVG/>
			Back to Home
		</NuxtLink>

		<Login/>
		<div class="separator"></div>
		<Register/>
	</div>
</template>

<style scoped>

.auth
{
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	font-size: 0.875rem;
	width: 100%;
	height: 100%;
	background: var(--primary-background-color);
}

.back_button
{
	display: flex;
	align-items: center;
	position: absolute;
	top: 2rem;
	left: 2rem;
	color: var(--primary-blue);
	font-size: 1rem;
}

.back_button svg
{
	display: block;
	width: 1.25rem;
	margin-right: 0.25rem;
}

.separator
{
	height: 75%;
	width: 1px;
	background: var(--separator-color);
}

</style>