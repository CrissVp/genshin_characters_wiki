import { createRequest, removeTags } from "../lib/utils";

export class CharactersModel {
    static async getId(keyword) {
        const res = await createRequest(`https://sg-wiki-api.hoyolab.com/hoyowiki/genshin/wapi/search?keyword=${keyword}`, {
            "headers": {
                "Referer": "https://wiki.hoyolab.com/",
            },
            "method": "GET",
            "body": null
        });

        const result = res.data.list.find((item) => item.menu.name === 'Characters');
        return result.entry_page_id;
    };


    static async getAll() {
        const res = await createRequest('https://bbs-api-os.hoyolab.com/community/painter/wapi/circle/channel/guide/second_page/info', {
            "body": "{\"id\":\"63b63aefc61f3cbe3ead18d9\",\"offset\":0,\"selector_id_list\":[],\"size\":200}",
            "method": "POST"
        });

        return await Promise.all(
            res.data.grid_item_list.map(async (item) => {
                const id = await this.getId(item.title);

                return {
                    id: id,
                    name: item.title,
                    images: {
                        avatar: item.avatar,
                        bg: item.background,
                        vision: item.left_icons[0],
                        rarity: item.middle_icon
                    }
                };
            })
        );
    };

    static async getData(id) {
        const res = await createRequest(`https://sg-wiki-api-static.hoyolab.com/hoyowiki/genshin/wapi/entry_page?entry_page_id=${id}`);

        const data = removeTags(res.data.page);
        const { name, desc, icon_url, header_img_url, filter_values: { character_rarity: { values: [rarity] } } } = data;
        const attributesData = formatAttributes(data.modules[0].components[0].data);

        return {
            basicInfo: {
                id,
                name,
                desc,
                rarity,
                icon_url,
                header_img_url,
            },
            attributes: attributesData
        };
    };
};

const formatAttributes = (data) => {
    const fixedObj = JSON.parse(data);
    return fixedObj.list.reduce((acc, curr) => {
        if (curr.key !== 'Special Dish' && curr.key !== 'TCG Character Card') {
            acc[curr.key] = curr.value[0];
        }

        return acc;
    }, {});
};