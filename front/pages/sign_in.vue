<script>
export default {
	name: "SignIn",
	data()
	{
		return {
			email: "yass@gmail.com",
			password: "yass@gmail.com"
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
			else
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
			<NuxtLink class="forgotten_password" to="forgotten_password">Mot de passe oublié ? Cliqué ici pour le réinitialiser.</NuxtLink>
			<NuxtLink to="sign_up">Pas encore de compte ? Inscrivez-vous ici.</NuxtLink>
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
}

form
{
	display: flex;
	flex-direction: column;
	margin: 1rem 0;
	padding: 1rem;
	width: 20rem;
}

.field
{
	position: relative;
	width: 100%;
	margin: 1rem 0;
	border-bottom: solid 1px white;
}

input
{
	width: 100%;
	background: transparent;
	outline: none;
	border: none;
	font-size: 1rem;
	padding: 0.5rem 0.25rem;
	color: white;
}

.field label
{
	position: absolute;
	top: 0.5rem;
	left: 0.25rem;
	cursor: text;
	transition: all 0.125s;
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
	text-align: center;
	border: solid 1px white;
	padding: 0.5rem;
	border-radius: 0.75rem;
	cursor: pointer;
	background-color: white;
	color: #fb53a3;
	transition: all 0.25s;
}

.button:hover
{
	color: white;
	background: transparent;
}

.forgotten_password
{
	margin-top: 0.5rem;
	margin-bottom: 1rem;
}

</style>
