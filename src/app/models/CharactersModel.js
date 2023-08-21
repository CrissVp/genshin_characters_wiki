import { RESPONSE_TYPE, createRequest } from "../lib/utils";

const END_POINT = 'https://api.genshin.dev/characters';

export class CharactersModel {
    static async getAll() {
        const res = await createRequest(`${END_POINT}`, RESPONSE_TYPE.JSON);
        return await Promise.all(
            res.map(async (item) => {
                const cardImage = await this.getImage(item, 'card');
                return { name: item, image: cardImage };
            })
        );
    };

    static async getImage(id, type) {
        const res = await createRequest(`${END_POINT}/${id}/${type}`, RESPONSE_TYPE.BLOB);
        return res;
    };
} 