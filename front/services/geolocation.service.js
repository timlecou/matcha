import axios from 'axios';
import Constants from './constants';

export default {
	async getAddressFromCoord({long, lat})
	{
		return new Promise((resolve, reject) =>
		{
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${Constants.GOOGLE_API_KEY}`)
			.then(res =>
			{
				let results = res.data.results;
				if (results.length > 0)
					resolve(results[0].formatted_address)
				else
					resolve("anywhere");
			})
			.catch(err => reject(err))
		})
	}
}