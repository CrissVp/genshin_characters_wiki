'use client';

import { useState } from 'react';
import Image from 'next/image';

import TableComponent from '../TableComponent';
import TalentButton from '../TalentButton';

import styles from './styles.module.scss';

export default function Talents({ data, vision }) {
	const [page, setPage] = useState(data.list[0]);

	if (!data.list?.length) return null;

	return (
		<TableComponent title={'Talents'} vision={vision}>
			<div className={styles.talent_buttons}>
				{data.list.map((item, index) => (
					<TalentButton
						key={index}
						vision={vision}
						active={page.id === item.id}
						handleClick={() => setPage(item)}
					>
						<Image src={item.icon_url} height={70} width={70} alt={'Talent_Icon'} />
					</TalentButton>
				))}
			</div>
			<div className={styles.talent_data}>
				{page.talent_img && (
					<div className={styles.talent_pic}>
						<Image
							src={page.talent_img}
							width={300}
							height={180}
							alt='Talent_Pic'
							placeholder='blur'
							blurDataURL='/load_img.png'
						/>
					</div>
				)}
				<div className={styles.talent_desc}>
					<h4>{page.title}</h4>
					<div dangerouslySetInnerHTML={{ __html: page.desc }}></div>
				</div>
			</div>
		</TableComponent>
	);
}
