<script>
export default {
	name: "ForgottenPassword",
	data()
	{
		return {
			password: ""
		}
	},
}
</script>

<template>
	<div class="restore_password">
		<div class="field" :class="{active: password.length > 0}">
			<input type="password" id="password" v-model="password"/>
			<label for="password">Password</label>
		</div>
		<!-- <NuxtLink to="sign_in">Votre mot de passe vous est revenu ? Connectez-vous ici</NuxtLink> -->
		<div class="save_button">Save password</div>
	</div>
</template>

<style scoped>

.restore_password
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 15rem;
	margin: 0 auto;
	min-height: calc(100vh - 4.5rem);
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

.save_button
{
	width: 100%;
	padding: 0.75rem 1rem;
	border-radius: 0.75rem;
	text-align: center;
	cursor: pointer;
	background: #126eff;
	margin-top: 0.5rem;
	transition: all 0.25s;
}

.save_button:hover
{
	background: #3581f7;
}

a
{
	margin: 0.5rem 0;
}

</style>
