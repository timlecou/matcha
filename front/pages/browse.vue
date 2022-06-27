<script>

import HeartSVG from '~/assets/icons/heart.svg?inline';
import SkipSVG from '~/assets/icons/skip.svg?inline';

export default {
	name: 'Index',
	components: { HeartSVG, SkipSVG },
	data()
	{
		return {
			current_grown_button: null,			// 'like' | 'skip' | null
			suggestions:
			[
				{
					id: 0,
					username: "Test",
					biography: "Salut je suis un test !!!",
					photos:[
						{
							id: 0,
							path: "https://cdn.pixabay.com/photo/2020/05/29/08/54/beach-5234306_1280.jpg"
						},
						{
							id: 1,
							path: "https://cdn.pixabay.com/photo/2021/02/27/11/27/utility-pole-6054303_1280.png"
						}
					],
					tags: [
						{
							id: 0,
							name: "Abc"
						},
						{
							id: 1,
							name: "Test"
						},
						{
							id: 2,
							name: "Def"
						},
					]
				}
			]
		}
	},
	methods:
	{
		like()
		{
			alert('like')
		},
		skip()
		{
			alert('skip');
		}
	}
}
</script>


<template>
	<section class="index">
		<UserCard :user="suggestions[0]"
			@grow_taller="current_grown_button = $event" @grow_smaller="current_grown_button = null"
			@like="like" @skip="skip"
		/>
		<div class="action_button" :class="{grown: current_grown_button == 'like'}" id="like_button">
			<HeartSVG/>
		</div>
		<div class="action_button" :class="{grown: current_grown_button == 'skip'}" id="skip_button">
			<SkipSVG/>
		</div>
	</section>
</template>

<style scoped>

section
{
	max-width: 100%;
	margin: 2rem 0;
}

.action_button
{
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 50%;
	right: 0;
	background: var(--like-color);
	width: 10vw;
	height: 10vw;
	border-top-left-radius: 100%;
	border-bottom-left-radius: 100%;
	transform-origin: center center;
	transform: translateY(-50%);
	color: white;
	transition: all 0.25s;
}

#like_button.grown 
{
	transform: translateY(-50%) scale(1.5) translateX(-15%);
}

#skip_button.grown 
{
	transform: translateY(-50%) scale(1.5) translateX(15%);
}

.action_button > svg
{
	width: 50%;
}

#skip_button
{
	left: 0;
	border-radius: 0;
	border-top-right-radius: 100%;
	border-bottom-right-radius: 100%;
	background: var(--skip-color);
}

@media screen and (max-width: 550px)
{
	.action_button
	{
		border-radius: 0;
		top: unset;
		bottom: 3.25rem;
		transform-origin: center bottom;
		transform: translateY(0);
		z-index: 1;
		width: 20vw;
		height: 20vw;
		border-top-left-radius: 100%;
	}

	#skip_button
	{
		border-radius: 0;
		border-top-right-radius: 100%;
	}

	#like_button > svg
	{
		transform: translate(0.5rem, 0.5rem);
	}

	#skip_button > svg
	{
		transform: translate(-0.5rem, 0.5rem);
	}

	#like_button.grown 
	{
		transform: scale(1.5) translateX(-15%);
	}

	#skip_button.grown 
	{
		transform: scale(1.5) translateX(15%);
	}
}

</style>
