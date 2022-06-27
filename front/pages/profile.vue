<script>

import CameraSVG from '~/assets/icons/camera.svg?inline';
import HeartFilledSVG from '~/assets/icons/heart-filled.svg?inline';
import HeartHalfSVG from '~/assets/icons/heart-half.svg?inline';
import PhotosViewer from '../components/profile/PhotosViewer.vue';
import ProfileHeader from '../components/profile/ProfileHeader.vue';

export default {
	components: { ProfileHeader, CameraSVG, HeartFilledSVG, HeartHalfSVG, PhotosViewer },
	data()
	{
		return {
			selected_category: 'photos',	// 'photos' | 'matches' | 'likes'
			user:
			{
				id: 1,
				username: "chinowheel",
				first_name: "Chino",
				last_name: "Wheel",
				biography: "Je suis un super test de profil. J'aime la bécane et Tatiana :)",
				photos:
				[
					{
						id: 0,
						path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
					},
					{
						id: 1,
						path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
					},
					{
						id: 2,
						path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
					},
					{
						id: 4,
						path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
					},
					{
						id: 5,
						path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
					},
					{
						id: 6,
						path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
					},
				],
				tags:
				[
					"abc", "def", "tech", "dev", "manger", "hand", "basket"
				]
			}
		}
	},
	methods:
	{
		setSelectedCategory(new_cat)
		{
			this.selected_category = new_cat;
		}
	}
}
</script>

<template>
	<div class="profile">
		<ProfileHeader :user="user"/>
		<section class="categories_container">
			<div class="category" :class="{active: selected_category == 'photos'}" @click="setSelectedCategory('photos')">
				<div class="icon">
					<CameraSVG/>
				</div>
				<span>Photos</span>
			</div>
			<div class="category" :class="{active: selected_category == 'matches'}" @click="setSelectedCategory('matches')">
				<div class="icon">
					<HeartFilledSVG/>
				</div>
				<span>Matches</span>
			</div>
			<div class="category" :class="{active: selected_category == 'likes'}" @click="setSelectedCategory('likes')">
				<div class="icon">
					<HeartHalfSVG/>
				</div>
				<span>Likes</span>
			</div>
		</section>
		<PhotosViewer :photos="user.photos"/>
	</div>
</template>

<style scoped>

.profile
{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 1.5rem;
}

.categories_container
{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-top: 2.75rem;
	border-top: solid 1px var(--separator-color);
}

.category
{
	display: flex;
	text-transform: uppercase;
	letter-spacing: 1px;
	padding: 1rem 0;
	font-size: 0.85rem;
	cursor: pointer;
	color: var(--secondary-text-color);
}

.category:not(:last-child)
{
	margin-right: 3.75rem;
}

.category.active
{
	color: var(--primary-text-color);
	border-top: solid 1px var(--primary-text-color);
}

.icon
{
	width: 1rem;
	height: 1rem;
	margin-right: 0.25rem;
}

</style>