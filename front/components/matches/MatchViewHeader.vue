<script>

import InfoSVG from '~/assets/icons/info.svg?inline';
import LeftChevronSVG from '~/assets/icons/chevron-left.svg?inline';

export default {
	components: { InfoSVG, LeftChevronSVG },
	props:
	{
		match:
		{
			type: Object,
			required: true
		}
	},
	computed:
	{
		main_photo()
		{
			return this.match.user.photos[0].path;
		}
	},
	methods:
	{
		goBack()
		{
			this.$emit('go_back');
		},

		goInfo()
		{
			this.$emit('show_details');
		}
	}
}
</script>

<template>
	<header>
		<div class="back_button" @click="goBack">
			<LeftChevronSVG/>
		</div>
		<div class="user_info">
			<div class="image">
				<img :src="main_photo"/>
			</div>
			<h2>{{ match.user.username }}</h2>
		</div>
		<div class="info_button" @click="goInfo">
			<InfoSVG/>
		</div>
	</header>	
</template>

<style scoped>

header
{
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2.5rem;
	border-bottom: solid 1px var(--separator-color);
}

.back_button
{
	display: none;
	position: absolute;
	left: 1.25rem;
	transform: translateX(-50%)
}

.user_info
{
	display: flex;
	align-items: center;
}

.image
{
	width: 2rem;
	height: 2rem;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 1rem;
}

h2
{
	font-size: 1rem;
	font-weight: 600;
	margin: 0;
}

.info_button
{
	cursor: pointer;
	width: 1.5rem;
	height: 1.5rem;
}

@media screen and (max-width: 550px)
{
	.back_button
	{
		display: block;
	}
}

</style>
