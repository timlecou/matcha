<script>
export default {
	name: "SearchBar",
	data()
	{
		return {
			show_filters: true,

			search_username: "",
			min_age: 0,
			max_age: 100,
			min_score: 0,
			max_score: 100,
			location: null,
			tags: [],

			active_section: null,
			
			search_location: "",
			autocomplete_service: null,
			autocomplete_token: null,
			autocomplete_suggestions: [],
			geocoder: null,

			new_tag_value: "",
		}
	},
	mounted()
	{
		this.autocomplete_service = new google.maps.places.AutocompleteService();
		this.autocomplete_token = new google.maps.places.AutocompleteSessionToken();
		this.geocoder = new google.maps.Geocoder();
	},
	methods:
	{
		activeSection(name)
		{
			if (this.active_section == name)
				this.active_section = null;
			else
				this.active_section = name;
		},
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
		async changeLocation()
		{
			if (this.search_location.length > 0)
			{
				this.autocomplete_suggestions = (await this.autocomplete_service.getPlacePredictions(
				{
					input: this.$refs.location_input.value,
					sessionToken: this.autocomplete_token
				})).predictions;
			}
		},
		selectSuggestion(suggestion)
		{
			this.location = suggestion.description;
			this.autocomplete_suggestions = [];
			this.search_location = this.location;
		},
		addTag()
		{
			this.tags.push(this.new_tag_value);
			this.new_tag_value = "";
		}
	}
}
</script>

<template>
	<div class="search_bar">
		<div class="input_container">
			<input placeholder="Recherchez votre match" type="text" v-model="search_username" id="search_input" @keypress.enter="search"/>
			<div class="filters_button" @click="show_filters = !show_filters">
				<svg viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path fill="currentColor" d="M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"></path>
				</svg>
			</div>
		</div>
		<div class="filters_container" v-if="show_filters">
			<div class="filter" :class="{active: active_section == 'age_min'}">
				<div class="header" @click="activeSection('age_min')">
					<p class="name">Age min</p>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
						<polygon fill="currentColor" points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
						<rect fill="none" width="32" height="32"/>
					</svg>
				</div>
				<div class="content">
					<input type="range" v-model="min_age" min="0" max="100"/>
					<p class="value">{{ min_age }}</p>
				</div>
			</div>
			<div class="filter" :class="{active: active_section == 'age_max'}">
				<div class="header" @click="activeSection('age_max')">
					<p class="name">Age max</p>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
						<polygon fill="currentColor" points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
						<rect fill="none" width="32" height="32"/>
					</svg>
				</div>
				<div class="content">
					<input type="range" v-model="max_age" min="0" max="100"/>
					<p class="value">{{ max_age }}</p>
				</div>
			</div>
			<div class="filter" :class="{active: active_section == 'score_min'}">
				<div class="header" @click="activeSection('score_min')">
					<p class="name">Score minimum</p>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
						<polygon fill="currentColor" points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
						<rect fill="none" width="32" height="32"/>
					</svg>
				</div>
				<div class="content">
					<input type="range" v-model="min_score" min="0" max="100"/>
					<p class="value">{{ min_score }}</p>
				</div>
			</div>
			<div class="filter" :class="{active: active_section == 'score_max'}">
				<div class="header" @click="activeSection('score_max')">
					<p class="name">Score maximum</p>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
						<polygon fill="currentColor" points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
						<rect fill="none" width="32" height="32"/>
					</svg>
				</div>
				<div class="content">
					<input type="range" v-model="max_score" min="0" max="100"/>
					<p class="value">{{ max_score }}</p>
				</div>
			</div>
			<div class="filter location_filter" :class="{active: active_section == 'location'}">
				<div class="header" @click="activeSection('location')">
					<p class="name">Location</p>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
						<polygon fill="currentColor" points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
						<rect fill="none" width="32" height="32"/>
					</svg>
				</div>
				<div class="content">
					<input type="text" ref="location_input" v-model="search_location" @input="changeLocation"/>
					<div class="suggestions_container">
						<div class="suggestion" @click="selectSuggestion(suggestion)" v-for="suggestion in autocomplete_suggestions">
							<p>{{ suggestion.description }}</p>
							<div class="location_icon">
								<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264.018 264.018" style="enable-background:new 0 0 264.018 264.018;">
									<g>
										<path fill="currentColor" d="M132.009,0c-42.66,0-77.366,34.706-77.366,77.366c0,11.634,2.52,22.815,7.488,33.24c0.1,0.223,0.205,0.442,0.317,0.661
											l58.454,113.179c2.146,4.154,6.431,6.764,11.106,6.764c4.676,0,8.961-2.609,11.106-6.764l58.438-113.148
											c0.101-0.195,0.195-0.392,0.285-0.591c5.001-10.455,7.536-21.67,7.536-33.341C209.375,34.706,174.669,0,132.009,0z
											M132.009,117.861c-22.329,0-40.495-18.166-40.495-40.495c0-22.328,18.166-40.494,40.495-40.494s40.495,18.166,40.495,40.494
											C172.504,99.695,154.338,117.861,132.009,117.861z"/>
										<path fill="currentColor" d="M161.81,249.018h-59.602c-4.143,0-7.5,3.357-7.5,7.5c0,4.143,3.357,7.5,7.5,7.5h59.602c4.143,0,7.5-3.357,7.5-7.5
											C169.31,252.375,165.952,249.018,161.81,249.018z"/>
									</g>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="filter tags_filter" :class="{active: active_section == 'tags'}">
				<div class="header" @click="activeSection('tags')">
					<p class="name">Tags</p>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
						<polygon fill="currentColor" points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
						<rect fill="none" width="32" height="32"/>
					</svg>
				</div>
				<div class="content">
					<div>
						<div class="tags_container">
							<div class="tag" v-for="tag in tags">#{{ tag }}</div>
						</div>
						<div class="input_container">
							<input type="text" placeholder="Tags..." @keypress.enter="addTag" v-model="new_tag_value"/>
							<div class="tag_suggestions"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="search_button" @click="search">
				Search
			</div>
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

.filters_button
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

.filter
{
	display: flex;
	flex-direction: column;
	width: 100%;
	border-bottom: solid 1px rgba(255, 255, 255, 0.2);
}

.filter .header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	cursor: pointer;
}

.filter .header svg
{
	transition: all 0.25s;
}

.filter.active .header svg
{
	transform: rotateZ(90deg);
}

.filter .header svg
{
	width: 1.5rem;
}

.filter .content
{
	display: flex;
	padding: 0 1rem;
	max-height: 0;
	overflow: hidden;
	transition: all 0.5s;
}

.filter.active .content
{
	padding: 1rem;
	max-height: 5rem;
}

.filter .value
{
	margin: 0 0.5rem;
}

.filter input
{
	width: calc(100% - 2rem);
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

.location_filter .content
{
	flex-direction: column;
}

.location_filter.active .content
{
	max-height: 100vh;
	overflow-y: auto;
}

.location_filter input
{
	font-size: 1rem;
	width: 100%;
}

.location_filter .suggestion
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 1rem;
}

.location_filter .suggestion p
{
	padding: 0.5rem 0;
}

.location_icon
{
	display: none;
	width: 1.5rem;
}

.suggestion:hover .location_icon
{
	display: block;
}

.location_icon svg
{
	width: 100%;
}

.location_filter .suggestion:hover
{
	cursor: pointer;
}

.tags_filter.active .content
{
	max-height: 20rem;
	overflow: auto;
}

.tags_filter .content > div
{
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
	background: white;
}

.tags_container
{
	display: flex;
	flex-wrap: wrap;
}

.tag
{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem 0.5rem;
	margin: 0.25rem 0.125rem;
	background: #ff33cc;
	height: 2rem;
}

.tags_filter .input_container
{
	width: fit-content;
}

.tags_filter input
{
	font-size: 1rem;
	width: 100%;
	padding: 0.5rem 0.5rem;
}

</style>