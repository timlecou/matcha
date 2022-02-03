<script>
import { MarkerClusterer } from "@googlemaps/markerclusterer";


export default {
	name: "Map",
	data()
	{
		return {
			show_info_window: false,
			info_window:
			{
				position:
				{
					lat: 0,
					lng: 0,
				},
				user: null
			},
		}
	},
	beforeRouteEnter(to, from, next)
	{
		next(vm =>
		{
			if (!vm.$store.state.is_logged_in)
				next('/sign_in')
		})
	},
	mounted()
	{
		const map = new google.maps.Map(document.getElementById('map'),
		{
			center: {lat: 48.856614, lng: 2.3522219},
			zoom: 8
		});

		let markers = [];
		for (let user of this.users)
		{
			if (user.location.x === null || user.location.y === null)
				continue ;
			markers.push(new google.maps.Marker(
			{
				position: {lat: user.location.x, lng: user.location.y},
				map: map,
				icon: require("~/assets/images/output.png")
			}));
		}

		// const marker = new google.maps.Marker(
		// {
		// 	position: {lat: 48.856610, lng: 2.3522218},
		// 	map: map,
		// 	icon: require("~/assets/images/output.png")
		// });
		// const marker2 = new google.maps.Marker(
		// {
		// 	position: {lat: 48.790367, lng: 2.455572},
		// 	map: map,
		// 	icon: require("~/assets/images/output.png")
		// });
		// const marker3 = new google.maps.Marker(
		// {
		// 	position: {lat: 48.801408, lng: 2.130122},
		// 	map: map,
		// 	icon: require("~/assets/images/output.png")
		// });
		let cluster = new MarkerClusterer({markers, map})
	},
	computed:
	{
		users()
		{
			return this.$store.state.users;
		}
	},
	methods:
	{
		showProfile(e)
		{
			console.log(e);
		}
	}
}
</script>

<template>
	<div class="map">
		<div id="map"></div>
		<!-- <google-map id="map" ref="Map">
			<google-map-marker
				:title="'user.name'"
				:position="user.position"
				:label="user.name + 'label'"
				:clickable="true"
				:draggable="false"
				:visible="true"
				@click="showProfile"
				v-for="user in users"
				:key="'user_' + user.id"
			/>
		</google-map> -->
	</div>
</template>

<style scoped>

#map
{
	width: 100%;
	height: calc(100vh - 4.25rem);
}

</style>
