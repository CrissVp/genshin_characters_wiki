import { basePath } from '../../../next.config';

import Image from 'next/image';
import styles from './styles.module.css';

export default function Logo() {
	return (
		<Image
			src={`${basePath}/Genshin_Impact_logo.svg`}
			className={styles.logo}
			alt='logo'
			width={600}
			height={200}
		/>
	);
}
