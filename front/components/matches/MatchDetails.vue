<script>

import InfoSurroundedSVG from '~/assets/icons/info-surrounded.svg?inline';
import TimeService from '~/services/time.service';

export default {
	components: { InfoSurroundedSVG },
	props:
	{
		match:
		{
			type: Object,
			required: true,
		}
	},
	computed:
	{
		matched_time_diff()
		{
			return TimeService.toLongString(this.match.date);
		},

		main_photo()
		{
			return this.match.user.photos[this.match.user.photos.length - 1].path;
		}
	},
	methods:
	{
		hideDetails()
		{
			this.$emit('hide_details');
		}
	},
}
</script>

<template>
	<section class="match_info">
		<header class="bordered">
			<h2>Details</h2>
			<div class="details_button" @click="hideDetails">
				<InfoSurroundedSVG/>
			</div>
		</header>
		<div class="content">
			<p class="bordered">Matched with {{ match.user.username }} since <span class="bold">{{ matched_time_diff }}</span></p>
			<div class="member bordered">
				<h3>Member</h3>
				<div class="user">
					<div class="image">
						<img :src="main_photo"/>
					</div>
					<span>{{ match.user.username }} </span>
					<button>View</button>
				</div>
			</div>
			<div class="buttons_container bordered">
				<button>Remove match with <span class="bold">{{ match.user.username }}</span></button>
				<button>Block <span class="bold">{{ match.user.username }}</span> </button>
			</div>
		</div>
	</section>
</template>

<style scoped>

.match_info
{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

header
{
	position: relative;
	padding: 1rem 2.5rem;
}

.bordered
{
	border-bottom: solid 1px var(--separator-color);
}

h2
{
	width: 100%;
	font-size: 1.5em;
	margin: 0.125rem 0;
	text-align: center;
}

.details_button
{
	width: 1.5rem;
    position: absolute;
    top: 50%;
    right: 2rem;
	transform: translateY(-50%);
	cursor: pointer;
}

.content
{
	display: flex;
	flex-direction: column;
	font-size: 0.9rem;
}

.content > *
{
	padding: 1rem;
}

.member
{
	display: flex;
	flex-direction: column;
}

.member h3
{
	text-align: left;
	font-size: 1rem;
	font-weight: 600;
	margin: 0 0 1rem 0;
}

.user
{
	display: flex;
	align-items: center;
}

.user .image
{
	width: 3.5rem;
	height: 3.5rem;
	flex: 0 0 auto;
	border-radius: 100%;
	margin-right: 0.75rem;
	overflow: hidden;
}

.user span
{
	font-weight: 600;
}

.user button
{
	background: var(--primary-blue);
	color: var(--primary-background-color);
	padding: 0.4rem 2rem;
	border-radius: 0.375rem;
	font-weight: 600;
	letter-spacing: 0.25px;
	margin-left: auto;
}

.buttons_container
{
	display: flex;
	flex-direction: column;
	padding: 0;
}

.buttons_container button
{
	margin: 1rem;
	color: var(--remove-color);
	background: none;
	border: none;
	text-align: left;
	font-size: 0.95rem;
}
</style>