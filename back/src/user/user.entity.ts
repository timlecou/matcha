export class User
{
    constructor(username: String = '', email: String = '', first_name: String = '', last_name: String = '', password: String = '')
    {
        this.username = username
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
    }

	id: Number;
	username: String;
	first_name: String;
    last_name: String;
    email: String;
    password: String;
    birth_date: Date;
    lastSignIn: Date;
    location: any;
    gender: 'M' | 'F';
    sexual_orientation: 'M' | 'F';
	is_online: Boolean;
    biography: String;
    score: Number;
    is_activated: Boolean;
    activation_token: String;
    reset_password_token: String;
};