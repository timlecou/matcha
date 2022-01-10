<script>
export default {
	name: "FiltersContainer",
	data()
	{
		return {
			active_section: null,

			min_age: 0,
			max_age: 100,
			min_score: 0,
			max_score: 100,
			location: null,
			tags: [],

			new_tag_value: "",

			autocomplete_service: null,
			autocomplete_token: null,
			autocomplete_suggestions: [],

			search_location: "",
			autocomplete_service: null,
			autocomplete_token: null,
			autocomplete_suggestions: [],
			geocoder: null,
		}
	},
	created()
	{
		this.autocomplete_service = new google.maps.places.AutocompleteService();
		this.autocomplete_token = new google.maps.places.AutocompleteSessionToken();
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
	}
}
</script>

<template>
	<div class="filters_container">
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
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264.018 264.018" style="enable-background:new 0 0 264.018 264.018;"><g><path fill="currentColor" d="M132.009,0c-42.66,0-77.366,34.706-77.366,77.366c0,11.634,2.52,22.815,7.488,33.24c0.1,0.223,0.205,0.442,0.317,0.661l58.454,113.179c2.146,4.154,6.431,6.764,11.106,6.764c4.676,0,8.961-2.609,11.106-6.764l58.438-113.148c0.101-0.195,0.195-0.392,0.285-0.591c5.001-10.455,7.536-21.67,7.536-33.341C209.375,34.706,174.669,0,132.009,0zM132.009,117.861c-22.329,0-40.495-18.166-40.495-40.495c0-22.328,18.166-40.494,40.495-40.494s40.495,18.166,40.495,40.494C172.504,99.695,154.338,117.861,132.009,117.861z"/><path fill="currentColor" d="M161.81,249.018h-59.602c-4.143,0-7.5,3.357-7.5,7.5c0,4.143,3.357,7.5,7.5,7.5h59.602c4.143,0,7.5-3.357,7.5-7.5C169.31,252.375,165.952,249.018,161.81,249.018z"/></g></svg>
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
	</div>
</template>

<style scoped>


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

input[type="text"]
{
	width: calc(100% - 2rem);
	font-size: 1.2rem;
	padding: 0.5rem 1rem;
	border-radius: 1.25rem;
	outline: none;
	border: none;
}

</style>