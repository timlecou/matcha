<script>

import TimeService from '../../services/time.service';

export default {
	props:
	{
		selected:
		{
			type: Boolean,
			required: false,
			default: false
		},
		match:
		{
			type: Object,
			required: true
		}
	},
	computed:
	{
		main_photo()
		{
			return this.match.user.photos[0].path;
		},
		last_message()
		{
			return (this.match.messages.length > 0 ? this.match.messages[this.match.messages.length - 1] : null);
		},
		last_message_content()
		{
			return (this.last_message ? this.last_message.content : "");
		},
		last_message_date()
		{
			return (this.last_message ? this.last_message.date : "");
		},
		relative_time()
		{
			return TimeService.diff(new Date(), new Date(this.last_message_date));
		}
	},
	methods:
	{
		select()
		{
			this.$emit('select');
		}
	}
}
</script>

<template>
	<div class="match_item" :class="{selected: selected}" @click="select">
		<div class="image">
			<img :src="main_photo"/>
		</div>
		<div class="text">
			<span>{{ match.user.username }}</span>
			<span class="last_message">
				{{ last_message_content }}
				<time :datetime="last_message_date">· {{ relative_time }}</time>
			</span>
		</div>
	</div>
</template>

<style scoped>

.match_item
{
	display: flex;
	padding: 0.5rem 1rem;
	cursor: pointer;
}

.match_item.selected
{
	background: var(--highlight-background);
}

.image
{
	width: 3rem;
	height: 3rem;
	border-radius: 100%;
	overflow: hidden;
	flex: 0 0 auto;
}

.text
{
	display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    justify-content: center;
	margin-left: 1rem;
	overflow: hidden;
}

.text > span
{
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.last_message
{
	color: var(--secondary-text-color);
	margin-top: 0.125rem;
}

</style>