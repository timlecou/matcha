<script>
export default {
	props:
	{
		photos:
		{
			type: Array,
			required: true,
		}
	},
}
</script>

<template>
	<section class="photos_viewer">
		<div class="photo" v-for="photo in photos" :key="`photo_${photo.id}`">
			<img :src="photo.path"/>
		</div>	
	</section>
</template>

<style scoped>

.photos_viewer
{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 0 1rem;
}

.photo
{
	--lateral-margin: 1vw;
	width: 30%;
	cursor: pointer;
	margin: 0.5rem var(--lateral-margin);
	flex: 0 1 auto;
}

</style>