<script>
export default {
	data()
	{
		return {
			old_password: "",
			new_password: "",
			new_password_confirm: "",
		}
	},
}
</script>

<template>
	<form class="change_password">
		<table>
			<tbody>
				<tr>
					<td>Old password</td>
					<td>
						<input type="password" placeholder="Old password" v-model="old_password" autocomplete="current-password"/>
					</td>
				</tr>
				<tr>
					<td>New password</td>
					<td>
						<input type="password" placeholder="New password" v-model="new_password" autocomplete="new-password"/>
					</td>
				</tr>
				<tr>
					<td>Confirm new password</td>
					<td>
						<input type="password" placeholder="Confirm new password" v-model="new_password_confirm" autocomplete="new-password"/>
					</td>
				</tr>
			</tbody>
		</table>
		<button>Save</button>
	</form>
</template>

<style scoped>

.change_password
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	padding: 2rem;
	overflow: auto;
	width: 100%;
	height: 100%;
}

table
{
	border-collapse: separate;
	border-spacing: 2rem 1rem;
}

input,
textarea,
select
{
	font-size: 1rem;
	padding: 0.25rem 0.5rem;
	border: solid 1px var(--separator-color);
	border-radius: 0.25rem;
	background: inherit;
}

textarea
{
	height: 4.5rem;
	resize: vertical;
}

button
{
	padding: 0.25rem 1rem;
	border-radius: 0.25rem;
	background: var(--primary-blue);
	color: var(--primary-background-color);
	font-size: 1rem;
	width: fit-content;
	margin: 0 auto;
}

</style>
