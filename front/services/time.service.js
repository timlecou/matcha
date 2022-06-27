import * as moment from 'moment';

export default {
	diff(a, b = new Date())
	{
		if (b.getTime() > a.getTime())
		{
			const tmp = a;
			a = b;
			b = tmp;
		}
		a = moment(a);
		b = moment(b);
		const years = a.diff(b, 'years');
		const months = a.diff(b, 'months');
		const weeks = a.diff(b, 'weeks');
		const days = a.diff(b, 'days');
		const hours = a.diff(b, 'hours');
		const minutes = a.diff(b, 'minutes');
		const seconds = a.diff(b, 'seconds');

		const diff = [years, months, weeks, days, hours, minutes, seconds];
		const units = ['y', 'mo', 'w', 'd', 'h', 'mn', 's'];
		for (let i = 0; i < diff.length; i++)
			if (diff[i] > 0)
				return `${diff[i]} ${units[i]}`;
		return 'now';
	},
	toLongString(date)
	{
		date = moment(date);
		return date.format("MMMM Do YYYY");
	}
}