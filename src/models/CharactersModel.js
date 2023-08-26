import { IDS_MAP } from "../lib/charactersIdMap";
import { RESPONSE_TYPE, createRequest } from "../lib/utils";

const API_URL = 'https://api.genshin.dev';

export class CharactersModel {
    static async getAll() {
        const res = await createRequest(`${API_URL}/characters`, RESPONSE_TYPE.JSON);

        return res.map((item) => {
            const imageUrl = `${API_URL}/characters/${item}/card`;
            return { id: item, name: IDS_MAP[item], image: imageUrl };
        });
    };

    static async getData(id) {
        const res = await createRequest(`${API_URL}/characters/${id}`);
        const imgRes = await createRequest(`${API_URL}/characters/${id}/list`);
        const imgVision = `${API_URL}/elements/${res.vision.toLowerCase()}/icon`;
        const images = imgRes.reduce((acc, curr) => (acc[curr] = `${API_URL}/characters/${id}/${curr}`, acc), {});
        return { data: res, images: { ...images, vision: imgVision } };
    };
} 