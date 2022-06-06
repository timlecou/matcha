<template>
	<div data-app>
		<v-dialog
		v-model="log_in_dialog"
		max-width="250"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
				color="red lighten-2"
				dark
				v-bind="attrs"
				v-on="on"
				>
				Log In
				</v-btn>
			</template>

			<v-card>
				<v-card-title class="text-h5 grey lighten-2">
				Log In
				</v-card-title>

				<v-card-actions>
				<v-form>
					<v-text-field
						v-model="email"
						label="Email"
						required
					></v-text-field>
					<v-text-field
						v-model="password"
						label="Password"
						required
					></v-text-field>
					<v-btn
						color="primary"
						text
						@click="log_in_dialog = false"
					>
						Log In
					</v-btn>
				</v-form>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>

import axios from 'axios'
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {

	log_in_dialog = false
	password = ""
	email = ""

	log_in() {
		console.log('log in');
	}
	
}
</script>


<style scoped>

</style>
