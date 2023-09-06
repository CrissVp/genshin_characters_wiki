import { createRequest, removeTags, stringToObj } from "../lib/utils";
import { MaterialsModel } from "./MaterialsModel";

export class CharactersModel {
    static async getIdByName(keyword) {
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
                const id = await this.getIdByName(item.title);

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

    static async getDataById(id) {
        const res = await createRequest(`https://sg-wiki-api-static.hoyolab.com/hoyowiki/genshin/wapi/entry_page?entry_page_id=${id}`);

        const data = res.data.page;
        const { name, desc, icon_url, header_img_url, filter_values: { character_rarity: { values: [rarity] } } } = data;
        const { filter_values: { character_vision: { values: [vision] } } } = data;

        const attributesData = formatAttributesData(data.modules[0].components[0].data);
        const ascensionData = await formatAscensionData(data.modules[1].components[0].data);
        const galleryData = formatGalleryData(data.modules[2].components[0].data);
        const talentsData = formatTalentsData(data.modules[3].components[0].data);
        const constellationsData = formatConstellationsData(data.modules[4].components[0].data);

        return {
            basicInfo: {
                id,
                name,
                desc,
                rarity,
                vision,
                icon_url,
                header_img_url,
            },
            attributesData,
            ascensionData,
            galleryData,
            talentsData,
            constellationsData
        };
    };
};

const formatAttributesData = (data) => {
    const fixedString = removeTags(data)
    const fixedObj = stringToObj(fixedString);
    return fixedObj.list.reduce((acc, curr) => {
        if (curr.key !== 'Special Dish' && curr.key !== 'TCG Character Card') {
            acc[curr.key] = curr.value[0];
        }

        return acc;
    }, {});
};

const formatAscensionData = async (data) => {
    const fixedString = removeTags(data);
    const fixedObj = stringToObj(fixedString);
    return await Promise.all(
        fixedObj.list.map(async (item) => {
            const { key, combatList, materials } = item;
            let fixedMaterials;

            if (materials) {
                fixedMaterials = await Promise.all(
                    materials.map(async (mat) => {
                        const matObj = JSON.parse(mat)[0];
                        const material = await MaterialsModel.getDataById(matObj.ep_id);
                        const { name, icon_url } = material;
                        return { name, icon_url, amount: matObj.amount };
                    })
                );
            }

            return { key, combatList, materials: fixedMaterials };
        })
    );
};

const formatGalleryData = (data) => stringToObj(data);
const formatTalentsData = (data) => stringToObj(data);
const formatConstellationsData = (data) => stringToObj(data);