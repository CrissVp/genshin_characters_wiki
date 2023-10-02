import { createRequest, removeTags } from "../lib/utils";
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
        let data = [];
        let reqOptions = { total: 0, size: 30, page: 1 };

        do {
            const res = await createRequest("https://sg-wiki-api.hoyolab.com/hoyowiki/genshin/wapi/get_entry_page_list", {
                "headers": {
                    "x-rpc-language": "en-us",
                    "Referer": "https://wiki.hoyolab.com/",
                },
                "body": JSON.stringify({
                    filters: [],
                    menu_id: 2,
                    page_num: reqOptions.page,
                    page_size: reqOptions.size,
                    use_es: true
                }),
                "method": "POST"
            });

            reqOptions.total = res.data.total;
            data.push(...res.data.list);
            reqOptions.page++;
        } while (data.length < reqOptions.total);

        return data;
    };

    static async getDataById(id) {
        const res = await createRequest(`https://sg-wiki-api-static.hoyolab.com/hoyowiki/genshin/wapi/entry_page?entry_page_id=${id}`);

        const data = res.data.page;
        const { name, desc, icon_url, header_img_url, filter_values: { character_rarity: { values: [rarity] } } } = data;
        const { filter_values: { character_vision: { values: [vision] } } } = data;

        const basicInfo = formatBasicInfo({ id, name, desc, rarity, vision, icon_url, header_img_url });
        const attributesData = formatAttributesData(data.modules[0].components[0].data);
        const ascensionData = await formatAscensionData(data.modules[1].components[0].data);
        const galleryData = formatGalleryData(data.modules[2].components[0].data);
        const talentsData = formatTalentsData(data.modules[3].components[0].data);
        const constellationsData = formatConstellationsData(data.modules[4].components[0].data);

        return {
            basicInfo,
            attributesData,
            ascensionData,
            galleryData,
            talentsData,
            constellationsData
        };
    };
};

const formatBasicInfo = (data) => {
    const objString = JSON.stringify(data);
    const fixedString = removeTags(objString);
    return JSON.parse(fixedString);
};

const formatAttributesData = (data) => {
    const fixedString = removeTags(data)
    const fixedObj = JSON.parse(fixedString);
    return fixedObj.list.reduce((acc, curr) => {
        if (curr.key !== 'Special Dish' && curr.key !== 'TCG Character Card') {
            acc[curr.key] = curr.value[0];
        }

        return acc;
    }, {});
};

const formatAscensionData = async (data) => {
    const fixedString = removeTags(data);
    const fixedObj = JSON.parse(fixedString);
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

const formatGalleryData = (data) => { if (data) return JSON.parse(data) };
const formatTalentsData = (data) => { if (data) return JSON.parse(data) };
const formatConstellationsData = (data) => { if (data) return JSON.parse(data) };