import Image from 'next/image';
import styles from './styles.module.scss';
import { basePath } from '../../../next.config';

export default function StarsRarity({ rarity }) {
	if (!rarity) return null;

	return (
		<div className={styles.character_rarity}>
			{[...Array(rarity)].map((_, index) => (
				<Image
					src={`${basePath}/levelStar.png`}
					alt={'star_level'}
					key={index}
					height={10}
					width={10}
				/>
			))}
		</div>
	);
}
