import Image from 'next/image';
import styles from './styles.module.scss';
import { basePath } from '../../../next.config';

export default function IconButton({ active, icon }) {
	return (
		<Image
			className={`${styles.image} ${active ? styles.active : ''}`}
			src={`${basePath}/${icon}.png`}
			alt={`${icon}`}
			height={50}
			width={50}
		/>
	);
}
