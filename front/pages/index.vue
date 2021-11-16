<template>
  <div class="container">
    <div>
      <h5 class="">
        {{ phrase }}
      </h5>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//https://api.nuxtjs.dev/mountains
export default {
  async asyncData() {
    const phrase = await axios.get('http://localhost:4000/').then((response) => {
      return response.data
    })
    return { phrase }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
