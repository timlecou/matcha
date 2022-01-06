<script>
export default {
	name: "SwpierV2",
	props:
	{
		user:
		{
			type: Object,
			required: true
		}
	},
	data()
	{
		return {
			photo_index: 0,
			liked: false,
			skiped: false
		}
	},
	methods:
	{
		skip()
		{
			this.skiped = true;
			window.setTimeout(() => this.$emit('skip'), 750);
		},
		like()
		{
			this.$axios.post(`http://localhost:4000/users/${this.$store.state.user.id}/liked/${this.user.id}`)
			.then(res =>
			{
				this.liked = true;
				window.setTimeout(() => this.$emit('skip'), 750);
			})
			.catch(err =>
			{
				alert(err.response.data.error);
			})
		},
		nextPhoto()
		{
			this.photo_index++;
			if (this.photo_index >= this.user.photos.length)
				this.photo_index = 0;
		},
		backPhoto()
		{
			this.photo_index--;
			if (this.photo_index < 0)
				this.photo_index = this.user.photos.length - 1;
		}
	}
}
</script>

<template>
	<div class="swiper" :class="{liked: this.liked, skiped: this.skiped}">
		<div class="image_container">
			<img :src="require(`~/assets/${photo}`)" v-show="key == photo_index" v-for="(photo, key) in user.photos"/>
			<div class="photos_indicator">
				<div class="indicator" @click="photo_index = key" :class="{selected: key == photo_index}" v-for="(photo, key) in user.photos"></div>
			</div>
			<div class="arrow left" @click="backPhoto">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"/></svg>
			</div>
			<div class="arrow right" @click="nextPhoto">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.293 4.293a1 1 0 0 0 0 1.414L14.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0Z"/></svg>
			</div>
		</div>
		<div class="profile_info">
			<h1>{{ user.first_name }} {{ user.last_name }}</h1>
			<p class='biography'>{{ user.biography }}</p>
			<div class="general_informations">
				<div class="item">
					<p class="name">Age</p>
					<p class="value">20</p>
				</div>
				<div class="item">
					<p class="name">Gender</p>
					<p class="value">Male</p>
				</div>
				<div class="item">
					<p class="name">Orientation</p>
					<p class="value">Female</p>
				</div>
				<div class="item">
					<p class="name">Location</p>
					<p class="value">Dijon</p>
				</div>
			</div>

			<div class="interests">
				<div class="interest">Islam</div>
				<div class="interest">Handball</div>
				<div class="interest">Sport</div>
				<div class="interest">Informatique</div>
			</div>

			<div class="buttons_container">
				<div class="skip_button" @click="skip">
					<svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"> <g id="color"> <circle cx="36" cy="36" r="24" fill="#FCEA2B"/> <path fill="#B1CC33" d="M47.1996,51.282c2.4604,0,5.4331,1.947,5.4331,3.6822c0,1.1754-0.9151,2.2-2.2701,2.7388 c0.9556,3.1123-1.2429,4.6605-2.9806,4.8865c-1.0209,0.1328-2.1134-0.4142-2.7863-1.093c0,1.3994-1.1345,2.5339-2.5339,2.5339 c-1.3994,0-2.9144-0.937-2.9144-2.3364c-0.3126,1.0449-1.2813,1.8065-2.428,1.8065c-1.0988,0-2.2616-0.8964-2.6128-1.8743 c-0.3646,1.4932-1.6132,2.2102-2.9144,1.9393c-1.0753-0.2239-1.8354-1.051-1.9545-1.9724 c-0.1766,1.2269-1.5284,2.4373-2.8041,2.4373c-1.3994,0-2.5339-1.1345-2.5339-2.5339c-1.3994,0-3.1504-0.8857-3.1504-2.2852 c0-1.3994,1.1473-2.6613,2.5467-2.6613c-0.6745-0.4553-1.118-1.2267-1.118-2.1017c0-1.3994,1.7368-2.7662,3.1362-2.7662 c-0.1313-0.2663-0.2489-0.5384-0.3522-0.8158c-0.3427-0.9206-0.5273-1.8993-0.5273-2.9141c0-5.4121,5.2516-9.7995,11.7297-9.7995 s11.7297,4.3874,11.7297,9.7995C47.8941,49.1212,47.6491,50.2425,47.1996,51.282z"/> </g> <g id="hair"/> <g id="skin"/> <g id="skin-shadow"/> <g id="line"> <polyline fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="25.1678,26.4126 31.7548,30.4265 25.1678,34.1644"/> <polyline fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="46.8322,26.4126 40.2452,30.4265 46.8322,34.1644"/> <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M54.2197,50.0387C57.217,46.1546,59,41.2854,59,36c0-12.7031-10.2978-23-23-23c-12.7031,0-23,10.2969-23,23 c0,5.9897,2.2896,11.4448,6.0414,15.5376"/> <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M43.2806,19.0706c0.5464,1.4632,1.6142,2.6709,2.9996,3.3911c1.3093,0.8663,2.8945,1.2106,4.4451,0.9702"/> <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M28.7194,19.0706c-0.5464,1.4632-1.6142,2.6709-2.9996,3.3911c-1.3093,0.8663-2.8945,1.2106-4.4451,0.9702"/> <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M47.1996,51.282c2.4604,0,5.4331,1.947,5.4331,3.6822c0,1.1754-0.9151,2.2-2.2701,2.7388 c0.9556,3.1123-1.2429,4.6605-2.9806,4.8865c-1.0209,0.1328-2.1134-0.4142-2.7863-1.093c0,1.3994-1.1345,2.5339-2.5339,2.5339 c-1.3994,0-2.9144-0.937-2.9144-2.3364c-0.3126,1.0449-1.2813,1.8065-2.428,1.8065c-1.0988,0-2.2616-0.8964-2.6128-1.8743 c-0.3646,1.4932-1.6132,2.2102-2.9144,1.9393c-1.0753-0.2239-1.8354-1.051-1.9545-1.9724 c-0.1766,1.2269-1.5284,2.4373-2.8041,2.4373c-1.3994,0-2.5339-1.1345-2.5339-2.5339c-1.3994,0-3.1504-0.8857-3.1504-2.2852 c0-1.3994,1.1473-2.6613,2.5467-2.6613c-0.6745-0.4553-1.118-1.2267-1.118-2.1017c0-1.3994,1.7368-2.7662,3.1362-2.7662 c-0.1313-0.2663-0.2489-0.5384-0.3522-0.8158c-0.3427-0.9206-0.5273-1.8993-0.5273-2.9141c0-5.4121,5.2516-9.7995,11.7297-9.7995 s11.7297,4.3874,11.7297,9.7995C47.8941,49.1212,47.6491,50.2425,47.1996,51.282z"/> </g> </svg>
				</div>
				<div class="like_button" @click="like">
					<svg role="img" fill="red" viewBox="0 0 48 48" v-if="liked"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
					<svg role="img" fill="currentColor" viewBox="0 0 24 24" v-else><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.swiper
{
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #ebebeb;
	color: black;
	transition: all 0.5s cubic-bezier(.32,.42,.93,.72);
}

.swiper.liked
{
	transform-origin: bottom left;
	transform: scale(0.5) translate(100vw, 100vh);
}

.swiper.skiped
{
	transform-origin: bottom right;
	transform: scale(0.5) translate(-100vw, 100vh);
}

.image_container
{
	position: relative;
	width: 55%;
	height: 100%;
	background: white;
	border-top-right-radius: 0.75rem;
	border-bottom-right-radius: 0.75rem;
	overflow: hidden;
}

.image_container img
{
	width: 100%;
	height: 100%;
}

.photos_indicator
{
	display: flex;
	position: absolute;
	top: 1rem;
	right: 1rem;
}

.photos_indicator .indicator
{
	width: 0.5rem;
	height: 0.5rem;
	background: grey;
	border: solid 1px grey;
	margin: 0 0.125rem;
	border-radius: 100%;
	cursor: pointer;
}

.photos_indicator .indicator.selected
{
	background: white;
}

.arrow
{
	position: absolute;
	top: 50%;
	left: 1rem;
	transform: translateY(-50%);
	width: 2rem;
	height: 2rem;
	color: white;
}

.arrow.right
{
	right: 1rem;
	left: unset;
}

.profile_info
{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 45%;
	height: 97.5%;
	background: white;
	box-shadow: -5px 0px 16px 0px #42424269;
	padding: 1rem;
	overflow: auto;
}

h1
{
	margin: 1rem auto;
	text-align: center;
	font-weight: normal;
	letter-spacing: 2px;
}

.buttons_container
{
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.like_button,
.skip_button
{
	width: 3rem;
	margin: 1rem auto;
	color: #404040;
	cursor: pointer;
}

.skip_button
{
	width: 3.5rem;
}

.general_informations
{
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: space-around;
	align-items: center;
}

.general_informations .item
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.general_informations .item p
{
	margin: 0.25rem 0;
}

.general_informations .item .name
{
	color: grey
}

.general_informations .item .value
{
	font-size: 1.25rem;
}

.interests
{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}

.interest
{
	display: flex;
	align-items: center;
	justify-content: center;
	border: solid 1px grey;
	border-radius: 1rem;
	margin: 0.5rem;
	padding: 0.25rem 0.625rem;
}

@media screen and (max-width: 600px)
{
	.swiper
	{
		flex-direction: column;
		background: white;
		overflow: auto;
		height: 100%;
	}

	.swiper > *
	{
		width: 100%;
	}
	
	.swiper .profile_info
	{
		height: 60%;
	}

	.swiper .image_container
	{
		height: 40%;
	}
}

</style>