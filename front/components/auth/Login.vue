<script>

export default {
	data()
	{
		return {
			email: "",
			password: ""
		}
	}
}

</script>

<template>
	<div class="login">
		<section>
			<h1>Matcha</h1>
			<form>
				<label class="field" :class="{active: email != ''}">
					<input type="email" v-model="email"/>
					<span>E-mail</span>
				</label>
				<label class="field" :class="{active: password != ''}">
					<input type="password" v-model="password"/>
					<span>Password</span>
				</label>
				<button>Login</button>
			</form>
		</section>
		<section class="sign_up">
			<p>You do not have an account ? <NuxtLink to="/">Sign up</NuxtLink></p>
		</section>
	</div>
</template>

<style scoped>

.login
{
	display: flex;
	flex-direction: column;
	font-size: 0.875rem;
}

section
{
	display: flex;
	flex-direction: column;
	align-items: center;
	border: solid 1px var(--separator-color);
	background: var(--primary-background-color);
}

section.sign_up
{
	margin-top: 1rem;
	padding: 1rem 2rem;
}

h1
{
	font-family: 'Qwitcher Grypen', cursive;
	font-size: 4rem;
	margin: 1rem;
}

form
{
	display: flex;
	flex-direction: column;
	max-width: 100%;
	margin: 0 1rem;
	width: 100%;
	padding: 1rem 2rem;
}

form > *:not(:first-child)
{
	margin-top: 0.5rem;
}

.field
{
	position: relative;
	background: var(--secondary-background-color);
	border: solid 1px var(--separator-color);
	padding: 0.75rem 0.5rem 0.25rem 0.5rem;
	margin: 0 auto;
	width: 100%;
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
	padding: 0.375rem 0.75rem;
	background: var(--primary-blue);
	color: var(--primary-background-color);
	border-radius: 0.3rem;
	font-size: 0.82rem;
	font-weight: 600;
}

a
{
	color: var(--primary-blue);
	font-weight: 600;
}

</style>