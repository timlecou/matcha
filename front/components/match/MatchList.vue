<script>
export default {
	name: "MatchList",
	props:
	{
		matches:
		{
			type: Array,
			required: true
		},
		show:
		{
			type: Boolean,
			required: true
		}
	},
	methods:
	{
		selectMatch(match)
		{
			this.$emit('select_match', match);
		}
	}
}
</script>

<template>
	<div class="match_list" :class="{show: show}">
		<div class="header">
			<h1>All Matches</h1>
			<div class="search_button">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
					viewBox="0 0 487.95 487.95" style="enable-background:new 0 0 487.95 487.95;" xml:space="preserve">
					<path fill="currentColor" d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
						c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
						c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"/>
				</svg>
			</div>
		</div>
		<div class="list">
			<div class="match_item" @click="selectMatch(match)" v-for="match in matches">
				<div class="photo">
					<img :src="match.photos.paths[0]" v-if="match.photos.paths.length > 0"/>
				</div>
				<div class="text_container">
					<p class="name_time">
						<span class="name">{{ match.first_name }}</span>
						<span class="date">{{ match.last_update_time }}</span>
					</p>
					<p class="message" v-if="match.messages.length > 0">{{ match.messages[match.messages.length - 1].text }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.match_list
{
	display: flex;
	flex-direction: column;
	width: 33%;
	height: 100%;
	border-right: solid 1px #9c0f48;
}

h1
{
	font-weight: normal;
}

.header
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	width: 100%;
}

.search_button
{
	width: 1.5rem;
	cursor: pointer;
}

.search_button svg
{
	width: 100%;
}

.match_item
{
	display: flex;
	align-items: center;
	padding: 1rem;
	border-bottom: solid 1px solid 1px rgb(156 15 72 / 12%);
	cursor: pointer;
}

.match_item .photo
{
	flex: 0 0 auto;
	width: 3rem;
	height: 3rem;
	margin-right: 1rem;
	background: white;
    border-radius: 100%;
	overflow: hidden;
}

.match_item img
{
	width: 100%;
}

.match_item .text_container
{
	display: flex;
	flex-direction: column;
	width: 80%;
}

.match_item p
{
	display: flex;
	align-items: center;
	margin: 0.25rem;
}

.match_item .name_time
{
	display: flex;
	justify-content: space-between;
}

.match_item .name
{
	font-size: 1.25rem;
}

.match_item .message
{
	padding-left: 1rem;
}

.match_item .date
{
	font-size: 0.9rem;
}

@media screen and (max-width: 550px)
{
	.match_list:not(.show)
	{
		display: none;
		width: 0;
		transition: all 0.25s;
	}

	.match_list
	{
		width: 100%;
		flex: 0 0 auto;
	}
}

</style>
