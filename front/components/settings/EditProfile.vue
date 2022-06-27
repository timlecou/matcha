<script>
export default {
	props:
	{
		user:
		{
			type: Object,
			required: true
		}
	},
	computed:
	{
		fullname()
		{
			return `${this.user.first_name} ${this.user.last_name}`;
		}
	}
}
</script>

<template>
	<div class="edit_profile">
		<table>
			<tbody>
				<tr>
					<td>First name</td>
					<td>
						<input type="text" placeholder="First name" v-model="user.first_name"/>
					</td>
				</tr>
				<tr>
					<td>Last name</td>
					<td>
						<input type="text" placeholder="Last name" v-model="user.last_name"/>
					</td>
				</tr>
				<tr>
					<td>Username</td>
					<td>
						<input type="text" placeholder="Username" v-model="user.username"/>
					</td>
				</tr>
				<tr>
					<td>Biography</td>
					<td>
						<textarea placeholder="Biography" v-model="user.biography"></textarea>
					</td>
				</tr>
				<tr>
					<td>Email address</td>
					<td>
						<input type="email" placeholder="Email" v-model="user.email"/>
					</td>
				</tr>
				<tr>
					<td>Tel number</td>
					<td>
						<input type="tel" placeholder="Tel" v-model="user.tel"/>
					</td>
				</tr>
				<tr>
					<td>Gender</td>
					<td>
						<select v-model="user.gender">
							<option>Man</option>
							<option>Woman</option>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
		<button>Save</button>
	</div>
</template>

<style scoped>

.edit_profile
{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 2rem;
	overflow: auto;
}

table
{
	border-collapse: separate;
	border-spacing: 2rem 1rem;
}

tr td:first-child
{
	font-weight: 600;
	text-align: right;
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
}

</style>
