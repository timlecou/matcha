<script>
export default {
	name: "SignIn",
	data()
	{
		return {
			email: "",
			password: ""
		}
	},
	mounted()
	{
		window.setTimeout(() =>
		{
			this.$refs.submit_button.click();
		}, 500);
	},
	methods:
	{
		sign_in(e)
		{
			e.preventDefault();

			if (this.is_email_valid)
			{
				this.$store.dispatch('login', {email: this.email, password: this.password})
				.then(() =>
				{
					this.$router.push('/')
				})
				.catch(err =>
				{
					console.log(err);
				})
			}
			else if (this.email.length > 0 && this.password.length > 0)
				alert("Invalid form");
		}
	},
	computed:
	{
		is_email_valid()
		{
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(this.email).toLowerCase());
		},
	}
}
</script>

<template>
	<div class="sign_in">
		<h1>Sign In</h1>
		<form @submit="sign_in">
			<div class="field" :class="{active: email.length > 0}">
				<input type="email" id="email" v-model="email" autocomplete/>
				<label for="email">Email</label>
			</div>
			<div class="field" :class="{active: password.length > 0}">
				<input type="password" id="password" v-model="password" autocomplete/>
				<label for="password">Password</label>
			</div>
			<NuxtLink class="forgotten_password links" to="forgotten_password">Forgot your password ? Click here to reset it.</NuxtLink>
			<NuxtLink class="links" to="sign_up">Haven't subscribe yet ? Subscribe here</NuxtLink>
			<input ref="submit_button" type="submit" class="button" value="Sign in">
		</form>
	</div>
</template>

<style scoped>

.sign_in
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

.forgotten_password
{
	margin-top: 0.5rem;
	margin-bottom: 1rem;
}

.links
{
	text-decoration: underline;
	text-align: center;
}


</style>
