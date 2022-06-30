<script>
export default {
	data()
	{
		return {
			username: "",
			email: "",
			password: "",
			first_name: "",
			last_name: "",
		}
	}
}
</script>

<template>
	<div class="register">
		<section>
			<h1>Register</h1>
			<form>
				<label class="field" :class="{active: username != ''}">
					<input type="text" autocomplete="username" v-model="username"/>
					<span>Username</span>
				</label>
				<div class="flex">
					<label class="field first_name" :class="{active: first_name != ''}">
						<input type="text" autocomplete="first_name" v-model="first_name"/>
						<span>First Name</span>
					</label>
					<label class="field" :class="{active: last_name != ''}">
						<input type="last_name" autocomplete="email" v-model="last_name"/>
						<span>Last Name</span>
					</label>
				</div>
				<label class="field" :class="{active: email != ''}">
					<input type="email" autocomplete="email" v-model="email"/>
					<span>E-mail</span>
				</label>
				<label class="field" :class="{active: password != ''}">
					<input type="password" autocomplete="current-password" v-model="password"/>
					<span>Password</span>
				</label>
				<button>Register</button>
				<NuxtLink to="/" class="forgotten_password">Forgotten password ?</NuxtLink>
			</form>
		</section>
		<section class="sign_up">
			<p>You do not have an account ? <NuxtLink to="/">Sign up</NuxtLink></p>
		</section>
	</div>
</template>

<style scoped>

section
{
	display: flex;
	flex-direction: column;
	align-items: center;
}

section.sign_up
{
	margin-top: 1rem;
	padding: 1rem 2rem;
}

h1
{
	font-size: 2rem;
	margin: 1rem;
}

form
{
	display: flex;
	flex-direction: column;
	max-width: 100%;
	width: 100%;
	padding: 1rem 2rem;
}

form > .field:not(:first-child),
form > button:not(:first-child)
{
	margin-top: 0.5rem;
}

.field
{
	position: relative;
	background: var(--secondary-background-color);
	border: solid 1px var(--separator-color);
	padding: 1rem 0.5rem 0.25rem 0.5rem;
	margin: 0 auto;
	max-width: 100%;
	width: 100%;
	min-width: 15rem;
}

.field.first_name
{
	margin-right: 1rem;
}

.field > span
{
	position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
	font-size: 0.75rem;
	color: var(--secondary-text-color);
	transition: all 0.25s;
}

.field.active > span,
input:focus ~ span
{
	top: 0.125rem;
	font-size: 0.65rem;
	transform: translateY(0);
}

button
{
	padding: 0.75rem 0.75rem;
	background: var(--primary-blue);
	color: var(--primary-background-color);
	border-radius: 2rem;
	font-size: 1rem;
	font-weight: 600;
}

a
{
	color: var(--primary-blue);
	font-weight: 600;
}

.forgotten_password
{
	text-align: center;
	width: 100%;
	margin: 1rem 0;
}

</style>