<script>

import axios from 'axios'
import Header from '../components/Header.vue';

export default {
	components: { Header }
	// async asyncData()
	// {
	// 	const phrase = await axios.get('http://localhost:4000/').then((response) =>
	// 	{
	// 		return response.data
	// 	})
	// 	return { phrase }
	// }
}
</script>

<template>
	<div class="container">
		<Header/>
    <img src="src/uploads/users/_os0cgiqx61639491448549.jpg"/>
	</div>
</template>

<style>

.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.flex
{
	display: flex;
}

</style>
