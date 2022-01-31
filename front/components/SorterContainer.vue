<script>
export default {
	name: "SorterContainer"
}
</script>

<template>
	<div class="sorter_container">
		<p>Sort by </p>
		<select>
			<option value="none" selected>Select a sort option</option>
			<option value="age">Age</option>
			<option value="location">Location</option>
			<option value="popularity">Popularity</option>
			<option value="interests">Interests</option>
		</select>
	</div>
</template>

<style scoped>


.sorter_container
{
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem;
}

.sorter_container select
{
	margin: 0.5rem 1rem;
	padding: 0.25rem 0.5rem;
	outline: none;
	background: transparent;
	border: none;
	border-bottom: solid 1px #9c0f48;
	color: inherit;
	font-size: inherit;
	font-family: inherit;
}

</style>