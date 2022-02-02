<script>
export default {
	name: "SwpierV2",
	props:
	{
		user:
		{
			type: Object,
			required: true
		},
		index:
		{
			type: Number,
			required: true
		},
		show_info:
		{
			type: Boolean,
			required: true
		}
	},
	data()
	{
		return {
			photo_index: 0,
			liked: false,
			skiped: false,
			show_more_popup: false,
		}
	},
	computed:
	{
		transform_style()
		{
			if (this.skiped || this.liked)
				return {};
			else if (this.index == 0)
				return {transform: 'translate(-50%, -50%)'}
			else
				return {transform: 'translate(0, -50%) scale(0.5)'};
		}
	},
	methods:
	{
		skip()
		{
			this.skiped = true;
			this.next()
		},
		like()
		{
			this.liked = true;
			this.next();
		},
		next()
		{
			this.$emit('next')
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
	<div class="swiper" :class="{liked: this.liked, skiped: this.skiped, full: show_info}" :style="transform_style">
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
			<div class="more_button" @click="show_more_popup = true">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM18 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>
			</div>
			<div class="fade" v-if="show_more_popup"></div>
			<div class="more_popup" v-if="show_more_popup">
				<p>Bloquer</p>
				<p>Report</p>
				<p class="cancel_button" @click="show_more_popup = false">Cancel</p>
			</div>
		</div>
		<div class="profile_info">
			<div class="name_status_container">
				<h1>{{ user.first_name }}</h1>
			</div>
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
				<div class="interest">Informatique</div>
			</div>
			<p class="liked_indication">Already liked you</p>
			<p class="status" :class="{offline: !user.online}">
				<span v-if="user.online">Online</span>
				<span v-else>Last seen at 23 Nov 2021 </span>
			</p>
		</div>
	</div>
</template>

<style scoped>

.swiper
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	/* width: 80%; */
	min-height: 80%;
	max-width: 80%;
	color: black;
	transition: all 0.5s;
}

.swiper.full
{
	margin: 10% 0;
}

.swiper.liked
{
	top: 100vh;
	left: 100vw;
	transform: scale(0.5);
}

.swiper.skiped
{
	top: 100vh;
	left: 0;
	transform: scale(0.5);
}

.image_container
{
	position: relative;
	width: 100%;
	height: 100%;
	background: white;
	border-radius: 0.75rem;
	overflow: hidden;
}

.image_container:after
{
	position: absolute;
	content: '';
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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
	cursor: pointer;
	z-index: 1;
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
	width: 100%;
	height: 80%;
	background: white;
	box-shadow: -5px 0px 16px 0px #42424269;
	border-radius: 0.75rem;
	overflow: auto;
	text-overflow: ellipsis;
	word-break: break-all;
    max-height: 0;
    padding: 0 1rem;
	transition: all 0.25s;
}

.swiper.full .profile_info
{
	max-height: 100%;
	padding: 1rem;
	margin-bottom: 10%;
}

.profile_info *
{
	margin: 0.25rem 0;
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

.liked_indication
{
	text-align: center;
}

.status
{
	position: relative;
	width: fit-content;
	margin-left: auto;
	margin-right: auto;
}

.status:after
{
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	transform: translate(calc(-100% - 0.25rem), -50%);
	width: 0.75rem;
	height: 0.75rem;
	background: #11cd11;
	border-radius: 100%;
}

.status.offline
{
	color: rgba(150, 150, 150);
}

.status.offline:after
{
	display: none;
}

.more_button
{
	position: absolute;
	top: 0.5rem;
	left: 0.5rem;
	width: 1.5rem;
	height: 1.5rem;
	color: white;
	cursor: pointer;
	z-index: 1;
}

.fade
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #00000025;
	z-index: 1;
}

.more_popup
{
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 15rem;
	font-size: 1.2rem;
	background: white;
	color: black;
	z-index: 1;
	text-align: center;
	border-radius: 0.75rem;
}

.more_popup > *
{
	padding: 0.75rem 0;
	border-bottom: solid 1px #00000033;
	color: rgb(75 75 75);
	cursor: pointer;
}

.more_popup .cancel_button
{
	color: red;
}

@media screen and (max-width: 600px)
{
	.swiper
	{
		flex-direction: column;
		overflow: auto;
		max-width: 90%;
		height: 75%;
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