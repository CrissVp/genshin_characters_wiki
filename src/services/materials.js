import { request } from '@/lib/utils';
import { API_URL } from './api';

export const getDataById = async (id) => {
	const res = await request(`${API_URL}entry_page?entry_page_id=${id}`);
	return res.data.page;
};
