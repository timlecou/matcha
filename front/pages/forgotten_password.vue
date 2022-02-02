<script>
export default {
	name: "ForgottenPassword",
	data()
	{
		return {
			username: ""
		}
	},
	methods:
	{
		is_form_valid() {
			return (this.username.length > 0);
		},
		async reset_password(e)
		{
			e.preventDefault();

			if (!this.is_form_valid())
				this.$toast.error('Invalid form.');
			else
			{
				this.$axios.post('http://localhost:4000/reset_password', {username: this.username})
				.then (res =>
				{
					this.$toast.success('An e-mail has been sent to restore your password. Check your mail.');
				})
				.catch(err =>
				{
					this.$toast.error(err.response.data.error);
				})
			}
		}
	}
}
</script>

<template>
	<div class="forgotten_password">
		<h1>Reset password</h1>
		<form @submit="reset_password">
			<div class="field" :class="{active: username.length > 0}" @submit="reset_password">
				<input id="username" v-model="username"/>
				<label for="username">Username</label>
			</div>
			<NuxtLink class="link" to="sign_in">You remember your password ? Sign in here</NuxtLink>
			<input ref="submit_button" type="submit" class="reset_button" value="Reset password">
		</form>
	</div>
</template>

<style scoped>

.forgotten_password
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 30rem;
	margin: 0 auto;
	min-height: calc(100vh - 4.5rem);
}

form
{
	display: flex;
	flex-direction: column;
	margin: 1rem 0;
	padding: 1rem;
	width: 30rem;
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
	top: 0.2rem;
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

.reset_button
{
	width: 50%;
	padding: 0.75rem 1rem;
	border-radius: 0.75rem;
	text-align: center;
	cursor: pointer;
	margin-left: 25%;
	color: #f9e4d4;
	border: solid 1px #f9e4d4;
	background: #9c0f48;
	font-size: 18px;
	margin-top: 0.5rem;
	transition: all 0.25s;
}

.reset_button:hover
{
	background: transparent;
	color: #9c0f48;
	border: solid 1px #9c0f48;
}

a
{
	margin: 0.5rem 0;
}

.link
{
	text-decoration: underline;
}

</style>
