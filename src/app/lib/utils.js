export const RESPONSE_TYPE = { JSON: 'json', BLOB: 'blob' };

export const createRequest = async (url, type) => {
    try {
        const res = await fetch(url);

        if (type === RESPONSE_TYPE.BLOB) {
            return await res.blob();
        }

        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

export const blobToBase64 = (blob, reader) => {
    return new Promise((resolve, _) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};