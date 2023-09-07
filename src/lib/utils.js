export const createRequest = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

export const removeTags = (data) => {
    const string = JSON.stringify(data);
    const regex = /(<([^>]+)>)/gi;
    const fixedString = string.replace(regex, "").replaceAll('&amp;', '&').replaceAll('$', '');
    return JSON.parse(fixedString);
};