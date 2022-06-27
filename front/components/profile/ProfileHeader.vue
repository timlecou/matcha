<script>

export default {
	props:
	{
		user:
		{
			type: Object,
			required: true
		}
	},
	computed:
	{
		main_photo()
		{
			return this.user.photos[this.user.photos.length - 1].path;
		}
	}
}
</script>

<template>
	<header>
		<div class="image">
			<img :src="main_photo"/>
		</div>
		<section class="user_info">
			<div>
				<h1>{{ user.username }}</h1>
				<NuxtLink to="/settings" class="edit_profile_button">Edit profile</NuxtLink>
			</div>
			<div class="stat_container">
				<p>
					<span class="bold">5</span>
					photos
				</p>
				<p>
					<span class="bold">133</span>
					matches
				</p>
				<p>
					<span class="bold">202</span>
					likes
				</p>
			</div>
			<div class="details_container">
				<div class="names">
					<p class="bold">
						{{ user.first_name }} {{ user.last_name }}
					</p>
				</div>
				<div class="biography">
					{{ user.biography }}
				</div>
				<div class="tags_container">
					<div class="tag" v-for="tag in user.tags" :key="`tag_${tag}`">#{{ tag }}</div>
				</div>
			</div>
		</section>
	</header>
</template>

<style scoped>

header
{
	display: flex;
	align-items: center;
}

h1
{
	margin: 0;
}

header .image
{
	width: 9rem;
	height: 9rem;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 2rem;
	flex: 0 0 auto;
}

.user_info
{
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
}

.user_info > div
{
	display: flex;
	align-items: center;
	margin: 1rem;
}

.edit_profile_button
{
	padding: 0.4rem 0.75rem;
	font-weight: 600;
	letter-spacing: 0.25px;
	border-radius: 0.25rem;
	border: solid 1px var(--separator-color);
	font-size: 0.9rem;
	margin-left: 1.25rem;
	text-align: center;
}

.stat_container p
{
	margin-right: 2.5rem;
}

.stat_container p:last-child
{
	margin-right: 0;
}

div.details_container
{
	flex-direction: column;
	align-items: flex-start;
}

.biography
{
	margin: 0.5rem 0;
}

.tags_container
{
	display: flex;
	flex-wrap: wrap;
}

.tag
{
	color: var(--tag-color);
	margin: 0 0.5rem 0.25rem 0;
	cursor: pointer;
}

@media screen and (max-width: 500px)
{
	header
	{
		flex-wrap: wrap;
		justify-content: center;
	}

	.user_info > div
	{
		flex-wrap: wrap;
	}

	.edit_profile_button
	{
		width: 100%;
		margin: 0.5rem 0 0 0;
	}

	.stat_container p
	{
		margin-right: 1rem;
		justify-content: center;
	}
	
	.stat_container p:last-child
	{
		margin-right: 0;
	}

	h1
	{
		width: 100%;
		text-align: center;
	}
}

</style>