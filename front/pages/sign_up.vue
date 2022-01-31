<script>

import GeoLocationService from '../services/geolocation.service';

export default {
	name: "SignUp",
	data()
	{
		return {
			email: "",
			password: "",
			username: "",
			last_name: "",
			first_name: "",
			location:
			{
				address: "",
				long: null,
				lat: null
			}
		}
	},
	methods:
	{
		isFormValid()
		{
			return (this.email.length > 0 && this.password.length > 0 && this.username.length >= 4 && this.last_name.length > 0 && this.first_name.length > 0 && this.is_email_valid);
		},
		async getGeoLocation()
		{
			return new Promise((resolve, reject) =>
			{
				navigator.geolocation.getCurrentPosition(position =>
				{
					let latlng = {long: position.coords.longitude, lat: position.coords.latitude};
					GeoLocationService.getAddressFromCoord(latlng)
					.then(address =>
					{
						this.location.long = position.coords.longitude
						this.location.lat = position.coords.latitude;
						this.location.address = address;
						resolve();
					});
				}, err =>
				{
					console.log("Cannot get geolocation.")	
					resolve();
				});
			})
		},
		async signUp(e)
		{
			e.preventDefault();

			this.$toast.show("We need your location to offer you the best suggestions");
			await this.getGeoLocation();

			if (!this.isFormValid())
				this.$toast.error('Invalid form');
			else
			{
				this.$axios.post('http://localhost:4000/register', {username: this.username, email: this.email, password: this.password, location: this.location, first_name: this.first_name, last_name: this.last_name})
				.then (res =>
				{
					this.$toast.success(res.data.message);
				})
				.catch(err =>
				{
					this.$toast.error(err.response.data.error);
				})
			}
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
		<h1>Sign Up</h1>
		<form @submit="signUp">
			<div class="field" :class="{active: email.length > 0, valid: is_email_valid}">
				<input type="email" id="email" v-model="email"/>
				<label for="email">Email</label>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 405.272 405.272" style="enable-background:new 0 0 405.272 405.272;"> <path fill="currentColor" d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836 c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064 c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/> </svg>
			</div>
			<div class="field" :class="{active: username.length > 0, valid: username.length > 0}">
				<input type="username" id="username" v-model="username"/>
				<label for="username">Username</label>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 405.272 405.272" style="enable-background:new 0 0 405.272 405.272;"> <path fill="currentColor" d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836 c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064 c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/> </svg>
			</div>
			<div class="names_container">
				<div class="field" :class="{active: last_name.length > 0, valid: last_name.length > 0}">
					<input type="text" id="last_name" v-model="last_name"/>
					<label for="last_name">Last Name</label>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 405.272 405.272" style="enable-background:new 0 0 405.272 405.272;"> <path fill="currentColor" d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836 c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064 c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/> </svg>
				</div>
				<div class="field" :class="{active: first_name.length > 0, valid: first_name.length > 0}">
					<input type="text" id="first_name" v-model="first_name"/>
					<label for="first_name">First Name</label>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 405.272 405.272" style="enable-background:new 0 0 405.272 405.272;"> <path fill="currentColor" d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836 c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064 c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/> </svg>
				</div>
			</div>
			<div class="field" :class="{active: password.length > 0, valid: password.length > 0}">
				<input type="password" id="password" v-model="password"/>
				<label for="password">Password</label>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 405.272 405.272" style="enable-background:new 0 0 405.272 405.272;"> <path fill="currentColor" d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836 c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064 c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/> </svg>
			</div>
			<NuxtLink class="sign_in_link" to="sign_in">Already have an account ? Sign in here</NuxtLink>
			<button class="button">Sign up</button>
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
	margin: 2rem 0.5rem;
	border-bottom: solid 1px #9c0f48;
	font-size: 28px;
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
	display: flex;
	align-items: center;
	position: absolute;
	top: 0.2rem;
	left: 0.25rem;
	cursor: text;
	transition: all 0.125s;
}

input:focus ~ label,
.field.active label
{
	transform: translateY(calc(-100% - 0.25rem));
}

.field svg
{
	opacity: 0;
	width: 1rem;
    height: 1rem;
    position: absolute;
    bottom: 0.5rem;
    right: 0;
	color: #34be82;
	transition: 0.25s;
}

.field.valid svg
{
	opacity: 1;
}

.button
{
	width: 50%;
	margin: 0 auto;
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
	border: solid 1px #9c0f48;
	background: transparent;
}

.names_container
{
	display: flex;
}

.sign_in_link
{
	margin: 0.5rem 0.5rem;
	margin-bottom: 1rem;
	text-decoration: underline;
	text-align: center;
}

</style>
