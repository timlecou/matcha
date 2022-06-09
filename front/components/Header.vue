<script>

import HomeSVG from '~/assets/icons/home.svg?inline';
import DirectSVG from '~/assets/icons/direct.svg?inline';
import HeartSVG from '~/assets/icons/heart.svg?inline';
import AvatarSVG from '~/assets/icons/avatar.svg?inline';

export default {
	name: 'Header',
	components: { HomeSVG, DirectSVG, HeartSVG, AvatarSVG },
	data()
	{
		return {
			search: ''
		}
	}
}

</script>

<template>
	<div class="header">
		<div class="content">
			<p class="brand">Matcha</p>

			<div class="input_container">
				<input type="text" placeholder="Rechercher"/>
			</div>

			<nav>
				<div>
					<NuxtLink to="/">
						<HomeSVG/>
					</NuxtLink>
				</div>
				<div>
					<NuxtLink to="/">
						<DirectSVG/>
					</NuxtLink>
				</div>
				<div>
					<NuxtLink to="/">
						<HeartSVG/>
					</NuxtLink>
				</div>
				<div>
					<NuxtLink to="/">
						<AvatarSVG/>
					</NuxtLink>
				</div>
			</nav>
		</div>
	</div>
</template>

<style scoped>

.header
{
	display: flex;
	align-content: center;
	justify-content: center;
	width: 100%;
	background: white;
}

.content
{
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 0 auto;
	padding: 0.75rem 2rem;
	border-bottom: solid 1px var(--separator-color);
}

.content > *
{
	flex: 1 0 auto;
}

.brand
{
	font-family: 'Qwitcher Grypen', cursive;
	font-size: 2rem;
}

.input_container
{
	margin: 0 1rem;
}

input
{
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	font-size: 16px;
}

input::placeholder
{
	font-size: 1rem;
}

nav
{
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

nav > div:not(:first-child)
{
	margin-left: 1.5rem;
}

</style>