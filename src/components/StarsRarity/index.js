import Image from "next/image";
import styles from "./styles.module.scss";

export default function StarsRarity({ rarity }) {
  return (
    <div className={styles.character_rarity}>
      {[...Array(rarity)].map((_, index) => (
        <Image
          key={index}
          src={"/levelStar.png"}
          alt={"star_level"}
          height={10}
          width={10}
        />
      ))}
    </div>
  );
}
