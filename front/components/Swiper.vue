<script>
export default {
	name: "Swiper",
	props:
	{
		user:
		{
			type: Object,
			required: true,
		}
	},
	data()
	{
		return {
			initial_x: 0,
			initial_y: 0,
			diff_x: 0,
			angle: 0,
			photo_index: 0,
			moving: false,
			liked: false
		}
	},
	methods:
	{
		startMove(e)
		{
			this.initial_x = e.clientX;
			this.initial_y = e.clientY;
			this.moving = true;
			window.addEventListener('mousemove', this.move);
			window.addEventListener('mouseup', this.endMove);
		},

		move(e)
		{
			this.diff_x = e.clientX - this.initial_x;
			this.angle = Math.atan(this.diff_x / this.initial_y) * 57.295779513 / 2;
		},

		endMove(e)
		{
			window.removeEventListener('mousemove', this.move);
			window.removeEventListener('mouseup', this.endMove);
			this.angle = 0;
			this.diff_x = 0;
			this.moving = false;
		},

		switchPhoto(index)
		{
			if (index >= 0 && index < this.user.photos.length)
				this.photo_index = index;
		},

		skip()
		{
			this.$emit('skip');
		},

		like()
		{
			this.$axios.post(`http://localhost:4000/users/${this.$store.state.user.id}/liked/${this.user.id}`)
			.then(res =>
			{
				this.liked = true;
				this.$emit('like')
			})
			.catch(err =>
			{
				console.error("Failed to like user:", err.response.data);
			})
		}
	},
	computed:
	{
		transform_rotation()
		{
			return 'translateX(-50%) rotateZ(' + parseInt(this.angle).toString() + 'deg)';
		},
	}
}
</script>

<template>
	<div class="swiper" :style="{transform: transform_rotation}">
		<div class="photo_container" @mousedown="startMove">
			<img :src="require(`~/assets/${photo}`)" v-show="key == photo_index" v-for="(photo, key) in user.photos"/>
		</div>

		<div class="header">
			<div class="photos_indicator">
				<div class="indicator" :class="{selected: key == photo_index}" v-for="(photo, key) in user.photos"></div>
			</div>
		</div>

		<div class="arrow_containers">
			<div class="left arrow" @click="switchPhoto(photo_index - 1)" v-if="photo_index > 0">
				<svg viewBox="-78.5 0 512 512" xmlns="http://www.w3.org/2000/svg" ><title>left</title><path fill="currentColor" d="M257 64L291 98 128 262 291 426 257 460 61 262 257 64Z" /></svg>
			</div>
			<div class="right arrow"  @click="switchPhoto(photo_index + 1)" v-if="photo_index < user.photos.length - 1">
				<svg viewBox="-77 0 512 512" xmlns="http://www.w3.org/2000/svg" ><title>right</title><path fill="currentColor" d="M98 460L64 426 227 262 64 98 98 64 294 262 98 460Z" /></svg>
			</div>
		</div>

		<div class="footer">
			<p class="username">
				<NuxtLink :to="'/user/' + user.name">{{ user.name }}</NuxtLink>
			</p>
			<div class="buttons_container">
				<div class="skip_button" @click="skip">
					<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="white" viewBox="0 0 294.843 294.843" style="enable-background:new 0 0 294.843 294.843;" xml:space="preserve"> <g> <path d="M147.421,0C66.133,0,0,66.133,0,147.421s66.133,147.421,147.421,147.421c38.287,0,74.567-14.609,102.159-41.136 c2.389-2.296,2.464-6.095,0.167-8.483c-2.295-2.388-6.093-2.464-8.483-0.167c-25.345,24.367-58.672,37.786-93.842,37.786 C72.75,282.843,12,222.093,12,147.421S72.75,12,147.421,12s135.421,60.75,135.421,135.421c0,16.842-3.052,33.273-9.071,48.835 c-1.195,3.091,0.341,6.565,3.432,7.761c3.092,1.193,6.565-0.341,7.761-3.432c6.555-16.949,9.879-34.836,9.879-53.165 C294.843,66.133,228.71,0,147.421,0z"/> <path d="M167.619,160.134c-2.37-2.319-6.168-2.277-8.485,0.09c-2.318,2.368-2.277,6.167,0.09,8.485l47.236,46.236 c1.168,1.143,2.683,1.712,4.197,1.712c1.557,0,3.113-0.603,4.288-1.803c2.318-2.368,2.277-6.167-0.09-8.485L167.619,160.134z"/> <path d="M125.178,133.663c1.171,1.171,2.707,1.757,4.243,1.757s3.071-0.586,4.243-1.757c2.343-2.343,2.343-6.142,0-8.485 L88.428,79.942c-2.343-2.343-6.143-2.343-8.485,0c-2.343,2.343-2.343,6.142,0,8.485L125.178,133.663z"/> <path d="M214.9,79.942c-2.343-2.343-6.143-2.343-8.485,0L79.942,206.415c-2.343,2.343-2.343,6.142,0,8.485 c1.171,1.171,2.707,1.757,4.243,1.757s3.071-0.586,4.243-1.757L214.9,88.428C217.243,86.084,217.243,82.286,214.9,79.942z"/> </g> </svg>
				</div>
				<div class="heart_button" :class="{liked: liked}" @click="like">
					<svg class="" width="21" height="21" viewBox="0 0 24 24" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path> </svg>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.swiper
{
	position: absolute;
	top: 0;
	left: 50%;
	height: 100vh;
	width: 66vh;
	max-width: 100%;
	margin: 0 auto;
	transform-origin: center bottom;
	transform: translateX(-50%);
}

.header
{
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}

.photos_indicator
{
	display: flex;
	width: 100%;
}

.photos_indicator .indicator
{
	height: 0.25rem;
	background: rgba(255, 255, 255, 0.65);
	width: 100%;
	margin: 0.5rem;
	transition: all 0.125s;
}

.photos_indicator .indicator.selected
{
	background: white;
}

.username
{
	padding: 0.5rem 1rem;
    font-size: 1.5rem;
	padding: 0 1rem;
}

.photo_container
{
	width: 100%;
	height: 100%;
}

.photo_container img
{
	position: relative;
	width: 100%;
	height: 100%;
}

.photo_container:after
{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.footer
{
	display: flex;
	flex-direction: column;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
}

.buttons_container
{
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 1rem;
	background: linear-gradient(0deg, black, rgb(0 0 0 / 25%));
}

.buttons_container > div
{
	width: 10%;
	color: white;
	cursor: pointer;
}

.buttons_container svg
{
	width: 100%;
	height: 100%;
}

.heart_button svg
{
	fill: transparent;
}

.heart_button.liked svg
{
	fill: red;
}

.arrow_containers
{
	display: flex;
	width: 100%;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}

.arrow_containers .arrow
{
	width: 3.5rem;
	padding: 0.5rem;
	color: white;
	cursor: pointer;
}

.arrow.right
{
	margin-left: auto;
}

.arrow.left
{
	margin-right: auto;
}

.arrow_containers .arrow svg
{
	width: 100%;
}

</style>
