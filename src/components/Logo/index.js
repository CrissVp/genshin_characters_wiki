import Image from 'next/image';
import styles from './styles.module.css';

export default function Logo() {
  return (
    <Image
      src='/Genshin_Impact_logo.svg'
      className={styles.logo}
      alt='logo'
      width={600}
      height={200}
    />
  );
}
