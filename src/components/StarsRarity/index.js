import Image from "next/image";
import styles from './styles.module.scss';

export default function StarsRarity({ rarity }) {
    return (
        <div className={styles.character_rarity}>
            {[...Array(rarity)].map((_, index) => (
                <Image key={index} src={'/levelStar.png'} width={10} height={10} alt={'star_level'} />
            ))}
        </div>
    )
}