<script>
export default {
	name: 'Index',

	data()
	{
		return {
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
	}
}
</script>


<template>
	<section class="index">
		<UserCard :user="suggestions[0]"/>
	</section>
</template>

<style scoped>


</style>
