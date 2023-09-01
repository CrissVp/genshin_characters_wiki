
export const RESPONSE_TYPE = { JSON: 'json', BLOB: 'blob' };

export const createRequest = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

const TagsToRemove = ['<p>', '</p>', '<span>', '</span>'];

export const removeTags = (data) => {
    const string = JSON.stringify(data);
    let fixedString = string;

    TagsToRemove.forEach((item) => {
        fixedString = fixedString.replaceAll(item, '');
    });

    return JSON.parse(fixedString);
};