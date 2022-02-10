<script>

export default {
    mounted() {
        var user_token = this.$route.params.token;
        this.$axios.post('/api/active', {token: user_token})
        .then (res =>
		{
			this.$toast.success(res.data.message);
		})
		.catch(err =>
		{
			this.$toast.error(err.response.data.error);
		});
    }
}

</script>

<template>
	<div class="active_account" @>
		<h1>
			Hello !<br/>
			Your account is activated.<br/>
			You can now sign in <NuxtLink to="/sign_in">here</NuxtLink>!
		</h1>
	</div>
</template>

<style scoped>

.active_account
{
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	text-align: center;
}

h1
{
	margin: 0;
}

a
{
	text-decoration: underline;
}

</style>
