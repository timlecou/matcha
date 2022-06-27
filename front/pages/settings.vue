<script>

import EditProfile from '~/components/settings/EditProfile.vue';
import ChangePassword from '~/components/settings/ChangePassword.vue';
import PhotosEditor from '~/components/settings/PhotosEditor.vue';
import TagsEditor from '~/components/settings/TagsEditor.vue';
import Preferences from '~/components/settings/Preferences.vue';

const user = {
	id: 1,
	username: "chinowheel",
	first_name: "Chino",
	last_name: "Wheel",
	email: "yass@gmail.com",
	tel: "06 10 10 10 10",
	biography: "Je suis un super test de profil. J'aime la bécane et Tatiana :)",
	gender: "Man",
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
			id: 3,
			path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
		},
		{
			id: 4,
			path: "https://cdn.pixabay.com/photo/2022/06/20/20/48/squirrel-7274586_1280.jpg"
		},
	],
	tags:
	[
		"abc", "def", "tech", "dev", "manger", "hand", "basket"
	]
};

const categories = [
	{
		name: "edit_profile",
		component: EditProfile,
		text: "Edit profile",
		props: { user: user }
	},
	{
		name: "photos",
		component: PhotosEditor,
		text: "Photos",
		props: { photos: user.photos }
	},
	{
		name: "tags_editor",
		component: TagsEditor,
		text: "Interests",
		props: { user: user }
	},
	{
		name: "change_password",
		component: ChangePassword,
		text: "Change Password",
		props: {}
	},
	{
		name: "preferences",
		component: Preferences,
		text: "Preferences",
		props: {}
	},
];

export default {
	data()
	{
		return {
			selected_category: categories[0],
			categories: categories,
		}
	},
}

</script>

<template>
	<div class="settings">
		<ul class="categories_list">
			<li class="category" :class="{active: selected_category.name == category.name}"
				@click="selected_category = category"
				v-for="(category, index) in categories" :key="`category_${index}`">
				{{ category.text }}
			</li>
		</ul>
		<div class="category_view">
			<div class="view">
				<component :is="selected_category.component" v-bind="selected_category.props"/>
			</div>
		</div>
	</div>
</template>

<style scoped>

.settings
{
	display: flex;
	width: 100%;
	max-width: 55rem;
	background: var(--primary-background-color);
	margin: 2rem auto;
	border: solid 1px;
}

.categories_list
{
	display: flex;
	flex-direction: column;
	border-right: solid 1px black;
	flex: 0 0 auto;
}

.category
{
	position: relative;
	padding: 1rem 1.25rem 1rem 2rem;
	cursor: pointer;
	transition: all 0.25s;
}

.category::after
{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 0.125rem;
	height: 100%;
}

.category.active
{
	font-weight: 600;
}

.category.active::after
{
	background: black;
}

.category_view
{
	width: 100%;
}

ul
{
	list-style: none;
	margin: 0;
	padding: 0;
}

.view
{
	display: flex;
	width: 100%;
	height: 100%;
}

</style>