import { IDS_MAP } from "../lib/charactersIdMap";
import { RESPONSE_TYPE, createRequest } from "../lib/utils";

const END_POINT = 'https://api.genshin.dev/characters';

export class CharactersModel {
    static async getAll() {
        const res = await createRequest(`${END_POINT}`, RESPONSE_TYPE.JSON);

        return res.map((item) => {
            const imageUrl = `${END_POINT}/${item}/card`;
            return { id: item, name: IDS_MAP[item], image: imageUrl };
        });
    };

    static async getData(id) {
        const res = await createRequest(`${END_POINT}/${id}`);
        const imgRes = await createRequest(`${END_POINT}/${id}/list`);
        const images = imgRes.reduce((acc, curr) => (acc[curr] = `${END_POINT}/${id}/${curr}`, acc), {});
        return { data: res, images };
    };
} 