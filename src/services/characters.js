import { request, getObjectFromJson, removeTags } from '../lib/utils';
import { getDataById as getMaterialData } from './materials';
import { API_URL } from './api';

export const getAll = async () => {
	let data = [];
	let reqOptions = { total: 0, size: 30, page: 1 };

	do {
		const res = await request(`${API_URL}get_entry_page_list`, {
			body: JSON.stringify({
				filters: [],
				menu_id: 2,
				page_num: reqOptions.page,
				page_size: reqOptions.size,
				use_es: true
			}),
			method: 'POST'
		});

		reqOptions.total = res.data.total;
		data.push(...res.data.list);
		reqOptions.page++;
	} while (data.length < reqOptions.total);

	return data;
};

export const getDataById = async (id) => {
	const res = await request(`${API_URL}entry_page?entry_page_id=${id}`);

	const data = res.data.page;

	const basicInfo = getBasicInfo(data);
	const modulesData = getModulesData(data.modules);

	const attributesData = getAttributesData(modulesData.attributes);
	const ascensionData = await getAscensionData(modulesData.ascend);

	return {
		basicInfo,
		attributesData,
		ascensionData,
		galleryData: modulesData.gallery,
		talentsData: modulesData.talents,
		constellationsData: modulesData.constellation,
		descriptionData: modulesData.description,
		voiceOver: modulesData['voice-over']
	};
};

const getBasicInfo = (data) => {
	const {
		name,
		desc,
		icon_url,
		header_img_url,
		filter_values: {
			character_rarity: {
				values: [rarity]
			},
			character_vision: {
				values: [vision]
			}
		}
	} = data;

	const attributes = { name, desc, icon_url, header_img_url, rarity, vision };
	const objString = JSON.stringify(attributes);
	const fixedString = removeTags(objString);
	return JSON.parse(fixedString);
};

const getModulesData = (data) => {
	return data.reduce((acc, curr) => {
		acc[curr.name.toLowerCase()] = getObjectFromJson(curr.components[0].data);
		return acc;
	}, {});
};

const getAttributesData = (data) => {
	const fixedObj = removeTags(data);
	return fixedObj.list.reduce((acc, curr) => {
		if (curr.key !== 'Special Dish' && curr.key !== 'TCG Character Card') {
			acc[curr.key] = curr.value?.[0];
		}

		return acc;
	}, {});
};

const getAscensionData = async (data) => {
	const fixedObj = removeTags(data);
	return await Promise.all(
		fixedObj.list.map(async (item) => {
			const { key, combatList, materials } = item;
			let fixedMaterials;

			if (materials) {
				fixedMaterials = await Promise.all(
					materials.map(async (mat) => {
						const matObj = JSON.parse(mat)[0];
						const material = await getMaterialData(matObj.ep_id);
						const { name, icon_url } = material;
						return { name, icon_url, amount: matObj.amount };
					})
				);
			}

			return { key, combatList, materials: fixedMaterials };
		})
	);
};
