export const state = () =>
({
	access_token: null,
	is_logged_in: false
})
  
export const mutations =
{
	SET_ACCESS_TOKEN(state, token)
	{
		state.access_token = token;
		state.is_logged_in = true;
	}
};

export const actions = {};

export const getters = {};