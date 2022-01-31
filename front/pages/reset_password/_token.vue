<script>

export default {
    data() {
        return {
            new_password: "",
            confirm_password: ""
        };
    },
    methods: {
        async reset_password(e) {
            
            e.preventDefault();

            var token = this.$route.params.token;
			if (this.new_password === this.confirm_password)
			{
                this.$axios.post(`http://localhost:4000/reset_password/${token}`, {new_password: this.new_password})
                .then (res =>
                {
                    this.$toast.success(res.data.message);
                    this.$router.push('/sign_in');
                })
                .catch(err =>
                {
                    this.$toast.error(err.response.data.error);
                });
			}
			else
                this.$toast.error('Please enter the same password in both forms');
        }
    }
}

</script>

<template>
	<div class="reset_password" @>
		<h1>Reset your password</h1>
        <form @submit="reset_password">
			<div class="field" :class="{active: new_password.length > 0}">
				<input type="password" id="new_password" v-model="new_password" autocomplete/>
				<label for="new_password">New password</label>
			</div>
			<div class="field" :class="{active: confirm_password.length > 0}">
				<input type="password" id="confirm_password" v-model="confirm_password" autocomplete/>
				<label for="confirm_password">Confirm password</label>
			</div>
            <NuxtLink class="links" to="/sign_in">You remember your password ? Sign in here</NuxtLink>
			<input ref="submit_button" type="submit" class="button" value="Reset the password">
		</form>
	</div>
</template>

<style scoped>

.reset_password
{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10%;
}

form
{
	display: flex;
	flex-direction: column;
	margin: 1rem 0;
	padding: 1rem;
	width: 30rem;
}

.links
{
	text-decoration: underline;
	text-align: center;
}

.field
{
	position: relative;
	width: 100%;
	margin: 1rem 0;
	border-bottom: solid 1px #9c0f48;
}

input
{
	width: 100%;
	background: transparent;
	outline: none;
	border: none;
	font-size: 1rem;
	padding: 0.5rem 0.25rem;
	color: #9c0f48;
}

.field label
{
	position: absolute;
	top: 0.1rem;
	left: 0.25rem;
	cursor: text;
	transition: all 0.125s;
	font-size: 28px;
}

input:focus ~ label,
.field.active label
{
	transform: translateY(calc(-100% - 0.25rem));
}

.button
{
	width: 50%;
	margin: 0 auto;
	margin-top: 48px;
	text-align: center;
	border: solid 1px #f9e4d4;
	padding: 0.5rem;
	font-size: 18px;
	border-radius: 0.75rem;
	cursor: pointer;
	background-color: #9c0f48;
	color: #f9e4d4;
	transition: all 0.25s;
}

.button:hover
{
	color: #9c0f48;
	background: transparent;
	border: solid 1px #9c0f48;
}

</style>
