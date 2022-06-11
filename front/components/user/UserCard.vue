<script>

import MoreSVG from '~/assets/icons/more-horizontal.svg?inline';
import RightChevronSVG from '~/assets/icons/chevron-right.svg?inline';
import LeftChevronSVG from '~/assets/icons/chevron-left.svg?inline';

export default {
	components: { MoreSVG, RightChevronSVG, LeftChevronSVG },
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
			photo_index: 0,
		}
	},
	computed:
	{
		card_size()
		{
			return '470px';
		}
	},
	methods:
	{
		changePhoto(new_index)
		{
			this.photo_index = new_index;
			if (this.photo_index >= this.user.photos.length)
				this.photo_index = this.user.photos.length - 1;
			else if (this.photo_index < 0)
				this.photo_index = 0;
		}
	}
}

</script>

<template>
	<article class="user_card">
		<header>
			<NuxtLink to="/">
				{{ user.username }}
			</NuxtLink>
			<div class="more_button">
				<MoreSVG/>
			</div>
		</header>
		<section class="images_container">
			<div class="image" :class="{selected: index == photo_index}" :style="{width: card_size, height: card_size}" v-for="(photo, index) in user.photos" :key="photo.id">
				<img :src="photo.path"/>
			</div>
			<div class="photo_swiper right" @click="changePhoto(photo_index + 1)">
				<RightChevronSVG/>
			</div>
			<div class="photo_swiper left" @click="changePhoto(photo_index - 1)">
				<LeftChevronSVG/>
			</div>
			<div class="selectors_container">
				<div class="selector" :class="{selected: index == photo_index}" v-for="(photo, index) in user.photos" :key="photo.id"></div>
			</div>
		</section>
		<section class="description">
			<span class="username">{{ user.username }}:</span>
			<span class="biography">{{ user.biography }}</span>
		</section>
		<section class="tags">
			<a class="tag" v-for="tag in user.tags" :key="tag.id">#{{ tag.name }}</a>
		</section>
		<footer>
		</footer>
	</article>
</template>

<style scoped>

.user_card
{
	display: flex;
	flex-direction: column;
	border: solid 1px var(--separator-color);
	max-width: 100%;
	overflow: hidden;
	border-radius: 0.5rem;
	background: white;
	padding-bottom: 1rem;
}

header
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 1rem;
	border-bottom: solid 1px var(--secondary-separator-color);
}

.more_button
{
	width: 1.5rem;
	height: 1.5rem;
	cursor: pointer;
}

.images_container
{
	position: relative;
	display: flex;
	flex-direction: column;
}

.images_container img
{
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.image:not(.selected)
{
	display: none;
}

.selectors_container
{
	display: flex;
	margin: 0.5rem 0;
	width: 100%;
	justify-content: center;
}

.selector
{
	width: 0.4rem;
	height: 0.4rem;
	background: var(--photo-selector-default-color);
	border-radius: 100%;
	margin-left: 0.25rem;
}

.selector:first-child
{
	margin-left: 0;
}

.selector.selected
{
	background: var(--primary-blue);
}

.description
{
	padding: 1rem;
}

.description .username
{
	font-weight: 600;
}

.photo_swiper
{
	position: absolute;
	top: 50%;
	left: 0.5rem;
	transform: translateY(-50%);
	color: rgba(127, 127, 127, 0.55);
	cursor: pointer;
}

.photo_swiper.right
{
	left: unset;
	right: 0.5rem;
}

.tags
{
	display: flex;
	flex-wrap: wrap;
	padding: 0 1rem;
}

.tag
{
	color: var(--link-color);
	margin: 0 0.125rem;
}

</style>