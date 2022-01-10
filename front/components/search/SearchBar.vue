<script>
import FiltersContainer from '../FiltersContainer.vue';
import SorterContainer from '../SorterContainer.vue';
export default {
	components: { FiltersContainer, SorterContainer },
	name: "SearchBar",
	data()
	{
		return {
			show_filters: false,
			show_sorter: false,

			search_username: "",
		}
	},
	created()
	{
		this.autocomplete_service = new google.maps.places.AutocompleteService();
		this.autocomplete_token = new google.maps.places.AutocompleteSessionToken();
		this.geocoder = new google.maps.Geocoder();
	},
	methods:
	{
		search()
		{
			let location = {
				longitude: null,
				latitude: null,
			};

			if (this.location)
			{
				this.geocoder.geocode( { 'address': this.location}, function(results, status)
				{
					if (status == google.maps.GeocoderStatus.OK)
					{
						location.latitude = results[0].geometry.location.lat();
						location.longitude = results[0].geometry.location.lng();
						alert(location.latitude + "  ; " + location.longitude);
					}
				});
			}

			this.$emit('search', {
				search: this.search_username,
				min_age: this.min_age,
				max_age: this.max_age,
				min_score: this.min_score,
				max_score: this.max_score,
				location: location
			});
			this.show_filters = false;
		},
	}
}
</script>

<template>
	<div class="search_bar">
		<div class="input_container">
			<div class="filters_button" @click="show_filters = !show_filters">
				<svg viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"></path></svg>
			</div>
			<input placeholder="Recherchez votre match" type="text" v-model="search_username" id="search_input" @keypress.enter="search"/>
			<div class="sort_button" @click="show_sorter = !show_sorter">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6.288 4.293-3.995 4-.084.095a1 1 0 0 0 .084 1.32l.095.083a1 1 0 0 0 1.32-.084L6 7.41V19l.007.117a1 1 0 0 0 .993.884l.117-.007A1 1 0 0 0 8 19V7.417l2.293 2.29.095.084a1 1 0 0 0 1.319-1.499l-4.006-4-.094-.083a1 1 0 0 0-1.32.084ZM17 4.003l-.117.007a1 1 0 0 0-.883.993v11.58l-2.293-2.29-.095-.084a1 1 0 0 0-1.319 1.498l4.004 4 .094.084a1 1 0 0 0 1.32-.084l3.996-4 .084-.095a1 1 0 0 0-.084-1.32l-.095-.083a1 1 0 0 0-1.32.084L18 16.587V5.003l-.007-.116A1 1 0 0 0 17 4.003Z"/></svg>
			</div>
		</div>
		<FiltersContainer v-if="show_filters"/>
		<SorterContainer v-if="show_sorter"/>
		<div class="search_button" @click="search">
			Search
		</div>
	</div>
</template>

<style scoped>

.search_bar
{
	display: flex;
	flex-direction: column;
	width: 80%;
	max-width: 40rem;
}

.search_bar > .input_container
{
	display: flex;
	width: 100%;
	padding: 1rem 0;
}

.filters_button,
.sort_button
{
	display: flex;
	justify-content: center;
	align-self: center;
	width: 2rem;
	margin: 0 0.5rem;
	cursor: pointer;
}

.filters_button svg
{
	width: 100%;
}

input[type="text"]
{
	width: calc(100% - 2rem);
	font-size: 1.2rem;
	padding: 0.5rem 1rem;
	border-radius: 1.25rem;
	outline: none;
	border: none;
}

.search_button
{
	width: 15rem;
	max-width: 100%;
	text-align: center;
	margin: 1rem auto;
	padding: 0.5rem 1rem;
	font-size: 1.25rem;
	border-radius: 2rem;
	border: solid 1px white;
	cursor: pointer;
}

</style>