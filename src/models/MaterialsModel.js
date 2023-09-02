import { createRequest } from "@/lib/utils";

export class MaterialsModel {
    static async getDataById(id) {
        const res = await createRequest(`https://sg-wiki-api-static.hoyolab.com/hoyowiki/genshin/wapi/entry_page?entry_page_id=${id}`);
        return res.data.page;
    }
}