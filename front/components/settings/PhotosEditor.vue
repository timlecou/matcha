<script>

import TrashSVG from '~/assets/icons/trash.svg?inline';
import CheckSVG from '~/assets/icons/check-surrounded-filled.svg?inline';

export default {
	components: { TrashSVG, CheckSVG },
	props:
	{
		photos:
		{
			type: Array,
			required: true
		}
	},
	data()
	{
		return {
			selected_photos_index: []
		}
	},
	computed:
	{
		isSelected()
		{
			return (photo) => this.selected_photos_index.includes(photo.id);
		}
	},
	methods:
	{
		handlePhotoOnClick(photo)
		{
			const index = this.selected_photos_index.indexOf(photo.id);

			if (index !== -1)
				this.selected_photos_index.splice(index, 1)
			else
				this.selected_photos_index.push(photo.id);
		}
	},
}
</script>

<template>
	<div class="photos_editor">
		<div class="photos_container">
			<div class="photo" :class="{selected: isSelected(photo)}" @click="handlePhotoOnClick(photo)"
				v-for="photo in photos" :key="`photo_${photo.id}`">
				<img :src="photo.path"/>
				<div class="select_indicator">
					<CheckSVG/>
				</div>
			</div>
		</div>
		<div class="buttons_container">
			<button class="remove_button">Remove</button>
			<button>
				<label>
					Upload
					<input type="file" class="photo_input" accept="image/png, image/jpeg"/>
				</label>
			</button>
		</div>
		<button>Save</button>
	</div>
</template>

<style scoped>

.photos_editor
{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
}

.photos_container
{
	display: flex;
	align-items: center;
	overflow: auto;
}

.photo
{
	position: relative;
	margin: 0.5rem;
	width: 7rem;
	cursor: pointer;
}

.photo .select_indicator
{
	--size: 1rem;
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
	width: var(--size);
	height: var(--size);
	border-radius: 100%;
	border: solid 1px white;
}

.photo.selected .select_indicator
{
	background: white;
	color: var(--primary-blue);
	border: none;
}

.buttons_container
{
	display: flex;
}

button
{
	padding: 0.25rem 1rem;
	border-radius: 0.25rem;
	background: var(--primary-blue);
	color: var(--primary-background-color);
	font-size: 1rem;
	margin: 0.5rem;
}

button,
label
{
	cursor: pointer;
}

.photo_input
{
	display: none;
}

.remove_button
{
	background: var(--remove-color);
}

</style>