export const request = async (url, options) => {
	try {
		const res = await fetch(
			url,
			options && {
				headers: {
					'x-rpc-language': 'en-us',
					Referer: 'https://wiki.hoyolab.com/'
				},
				method: options.method,
				body: options.body
			}
		);

		return await res.json();
	} catch (err) {
		console.log(err);
	}
};

export const removeTags = (data) => {
	const string = JSON.stringify(data);
	const regex = /(<([^>]+)>)/gi;
	const fixedString = string.replace(regex, '').replaceAll('&amp;', '&').replaceAll('$', '');
	return JSON.parse(fixedString);
};

export const getObjectFromJson = (data) => {
	if (data) return JSON.parse(data);
};
