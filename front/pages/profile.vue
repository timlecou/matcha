<script>
import ExpandableSection from '../components/ExpandableSection.vue';
export default {
	components: { ExpandableSection },
	name: "Profile",
	data()
	{
		return {
			user:
			{
				id: 1,
				username: "yass.490",
				email: "yass@gmail.com",
				last_name: "El Alouani",
				first_name: "Yassine",
				profile_photo: "/images/photo-1.jpeg",
				biography: "Hey ! Je suis Sirine, ceci est ma biographie. Mon github c est Sirine-dev hahaha",
				online: true,
				score: 97.5,
				liked: false,
				gender: "Male",
				sexual_orientation: "Female",

				photos:
				[
					{
						id: 0,
						path: "/images/photo-4.jpg"
					},
					{
						id: 1,
						path: "/images/photo-2.png"
					},
					{
						id: 2,
						path: "/images/photo-3.png"
					},
				],
				interests:
				[
					"bio",
					"geek",
					"Islam"
				]
			},
			current_password: "",
			new_password: "",
			confirm_new_password: "",

			new_interest_value: "",

			new_photos: []
		}
	},
	methods:
	{
		uploadPhotos(e)
		{
			if (this.user.photos.length + this.new_photos.length + e.target.files.length <= 5)
			{
				for (let photo of e.target.files)
				{
					photo["url"] = URL.createObjectURL(photo);
					this.new_photos.push(photo);
				}
				console.log(this.new_photos)
			}
			else
				alert("Error: you can have only 5 photos");
		},
		addInterest()
		{
			if (this.new_interest_value.length == 0)
				return ;
			// If interest is already in new interests or old
			if (this.user.interests.includes(this.new_interest_value))
				return ;
			this.user.interests.push(this.new_interest_value);
			this.new_interest_value = "";
		},
		removeInterest(index)
		{
			this.user.interests.splice(index, 1);
		}
	},
	computed:
	{
		profile_photo()
		{
			return this.user.photos[0];
		}
	}
}
</script>

<template>
	<form class="profile">
		<label class="profile_photo">
			<img :src="require(`~/assets${profile_photo.path}`)"/>
		</label>
		<div class="description_container">
			<div class="username input_container">
				<input type="text" v-model="user.username"/>
			</div>
			<div class="biography input_container">
				<textarea type="text" v-model="user.biography"></textarea>
			</div>
		</div>

		<ExpandableSection title="Personal informations" :default_expanded="true">
			<div class="field_containers">
				<div class="field" :class="{active: user.email.length > 0, valid: user.email.length > 0}">
					<input type="text" id="email" v-model="user.email" autocomplete="on"/>
					<label for="email">Email</label>
				</div>
				<div class="line">
					<div class="field" :class="{active: user.first_name.length > 0, valid: user.first_name.length > 0}">
						<input type="text" id="first_name" v-model="user.first_name"/>
						<label for="first_name">First Name</label>
					</div>
					<div class="field" :class="{active: user.last_name.length > 0, valid: user.last_name.length > 0}">
						<input type="text" id="last_name" v-model="user.last_name"/>
						<label for="last_name">Last Name</label>
					</div>
				</div>
				<div class="line">
					<div class="field" :class="{active: user.gender.length > 0, valid: user.gender.length > 0}">
						<select v-model="user.gender">
							<option>Male</option>
							<option>Female</option>
						</select>
						<label for="last_name">Gender</label>
					</div>
					<div class="field" :class="{active: user.sexual_orientation.length > 0, valid: user.sexual_orientation.length > 0}">
						<select v-model="user.sexual_orientation">
							<option>Male</option>
							<option>Female</option>
						</select>
						<label for="last_name">Sexual orientation</label>
					</div>
				</div>
			</div>
		</ExpandableSection>

		<ExpandableSection title="Photos">
			<div class="photos_container">
				<div class="photo" v-for="photo in user.photos">
					<img :src="require(`~/assets${photo.path}`)"/>
				</div>
				<div class="photo new" v-for="photo in new_photos">
					<img :src="photo.url"/>
				</div>
				<label class="photo add_photo">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">
						<circle fill="currentColor" cx="160" cy="128" r="32"/>
						<path fill="currentColor" d="M381.313,311.125c-5.938-8.906-20.688-8.906-26.625,0l-32,48c-3.266,4.906-3.578,11.219-0.797,16.422
							C324.672,380.75,330.094,384,336,384h16v32c0,8.836,7.156,16,16,16c8.844,0,16-7.164,16-16v-32h16
							c5.906,0,11.328-3.25,14.109-8.453c2.781-5.203,2.469-11.516-0.797-16.422L381.313,311.125z"/>
						<path fill="currentColor" d="M480,0H32C14.328,0,0,14.328,0,32v320c0,17.672,14.328,32,32,32h192.945c7.992,71.887,69.062,128,143.055,128
							c79.406,0,144-64.602,144-144v-16V32C512,14.328,497.672,0,480,0z M202.406,211.852c-5.641-4.836-13.875-5.148-19.875-0.758
							L64,298.02V64h384v176c0,0-63.469-66.74-83.5-89.992c-3.12-3.622-7.484-5.938-12.266-6.008c-4.594-0.102-9.344,1.992-12.422,5.641
							l-88.5,104.117L202.406,211.852z M478.727,384c-7.781,54.258-54.313,96-110.727,96s-102.945-41.742-110.727-96
							c-0.75-5.238-1.273-10.555-1.273-16c0-61.855,50.141-112,112-112s112,50.145,112,112C480,373.445,479.477,378.762,478.727,384z"/>
					</svg>
					<input type="file" @change="uploadPhotos" multiple/>
				</label>
			</div>
		</ExpandableSection>

		<ExpandableSection title="Interests">
			<div class="tags_input_container">
				<div class="tags_container">
					<div class="tag" v-for="(tag, index) in user.interests">
						<span>#{{ tag }}</span>
						<svg viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg" @click="removeInterest(index)">
							<g>
								<line x1="17.5" x2="54.5" y1="17.5" y2="54.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
								<line x1="54.5" x2="17.5" y1="17.5" y2="54.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
							</g>
						</svg>
					</div>
				</div>
				<div class="input_container">
					<input type="text" placeholder="Tags..." @keypress.enter="addInterest" v-model="new_interest_value"/>
					<div class="tag_suggestions"></div>
				</div>
			</div>
		</ExpandableSection>

		<ExpandableSection title="Security">
			<div class="field_containers">
				<div class="line">
					<div class="field" :class="{active: current_password.length > 0, valid: current_password.length >= 7}">
						<input type="password" id="current_password" v-model="current_password" autocomplete="password"/>
						<label for="current_password">Current password</label>
					</div>
					<div class="field" :class="{active: new_password.length > 0, valid: new_password.length >= 7}">
						<input type="password" id="new_password" v-model="new_password" autocomplete="new-password"/>
						<label for="new_password">New password</label>
					</div>
					<div class="field" :class="{active: confirm_new_password.length > 0, valid: confirm_new_password.length >= 7}">
						<input type="password" id="confirm_new_password" v-model="confirm_new_password" autocomplete="new-password"/>
						<label for="confirm_new_password">Confirm new password</label>
					</div>
				</div>
			</div>
		</ExpandableSection>
	</form>
</template>

<style scoped>

.profile
{
	display: flex;
	flex-wrap: wrap;
	width: 40rem;
	max-width: 100%;
	margin: 0 auto;
}

img
{
	width: 100%;
	height: 100%;
}

input,
textarea
{
	background: transparent;
	color: white;
	border: none;
	outline: none;
	font-size: 1rem;
	width: 100%;
	font-family: inherit;
}

input[type="file"]
{
	display: none;
}

.profile_photo
{
	width: 7.5rem;
	height: 7.5rem;
	cursor: pointer;
	margin: 1rem 0;
}

.profile_photo img
{
	border-radius: 100%;
}

.description_container
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 1rem 0.5rem;
	width: calc(100% - 9rem);
}

.input_container
{
	padding: 0.5rem 1rem;
}

.input_container.username input
{
	font-size: 1.5rem;
	text-align: center;
}

.photos_container
{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	margin: 1rem 0;
}

.photo
{
	width: 10rem;
	padding: 0.25rem 0.5rem;
}

.add_photo
{
	width: 9rem;
	padding: 3rem;
	margin: 0.25rem 0.5rem;
	border: dashed 1px white;
	cursor: pointer;
}

.add_photo svg
{
	width: 100%;
}

section
{
	display: flex;
	flex-direction: column;
	width: 100%;
}

section .header
{
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	cursor: pointer;
}

section .header svg
{
	width: 1.5rem;
	height: 1.5rem;
}

section .content
{
	padding: 0.5rem 1rem;
}

.field_containers
{
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.field
{
	position: relative;
	width: 15rem;
	margin: 1rem 1rem;
	border-bottom: solid 1px white;
}

.field input,
.field select
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
select:focus ~ label,
.field.active label
{
	transform: translateY(calc(-100% - 0.25rem));
}

.line
{
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.tags_input_container
{
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
	background: white;
}

.tags_container
{
	display: flex;
	flex-wrap: wrap;
}

.tag
{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem 0.5rem;
	margin: 0.25rem 0.125rem;
	background: #ff33cc;
	height: 2rem;
}

.tag svg
{
	width: 1.25rem;
	height: 1.25rem;
	margin-left: 0.5rem;
	cursor: pointer;
}

.tags_input_container .input_container
{
	width: fit-content;
	padding: 0 0;
}

.tags_input_container input
{
	font-size: 1rem;
	width: 100%;
	padding: 0.25rem 0.5rem;
	color: black;
}

</style>
