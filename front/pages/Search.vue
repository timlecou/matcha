<script>
import SearchBar from '../components/search/SearchBar.vue';

export default {
	name: "Search",
	components: { SearchBar },
	methods:
	{
		search(search_data)
		{
			console.log(search_data);
		},
	},
}
</script>

<template>
	<div class="search">
		<SearchBar @search="search"/>
		<!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4Io5BFJ2alGrKIY6n5WHAXjpcGfQl13E&callback=initMap"></script> -->
	</div>
</template>

<style scoped>

.search
{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

</style>
