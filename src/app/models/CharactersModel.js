import { RESPONSE_TYPE, createRequest } from "../lib/utils";

const END_POINT = 'https://api.genshin.dev/characters';

export class CharactersModel {
    static async getAll() {
        const res = await createRequest(`${END_POINT}`, RESPONSE_TYPE.JSON);
        return res.map((item) => {
            const imageUrl = `${END_POINT}/${item}/card`;
            return { name: item, image: imageUrl };
        });
    };
} 