import Image from 'next/image';
import styles from './styles.module.scss';

export default function IconButton({ active, icon }) {
	return (
		<Image
			className={`${styles.image} ${active ? styles.active : ''}`}
			src={`/${icon}.png`}
			alt={`${icon}`}
			height={50}
			width={50}
		/>
	);
}
