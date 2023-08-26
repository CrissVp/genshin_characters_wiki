import { CharactersModel } from "@/models/CharactersModel";
import Image from "next/image";

import ElementalBackground from "@/components/ElementalBackground";
import styles from './styles.module.scss';

const getCharacterData = async (id) => await CharactersModel.getData(id);

export default async function Character({ params }) {
    const { data, images } = await getCharacterData(params.id);

    return (
        <>
            <ElementalBackground bg={data.vision.toLowerCase()} />
            <main className={styles.main}>
                <div className={styles.content}>
                    <section>
                        <div className={styles.character_info}>
                            <div className={styles.character_name}>
                                <div className={styles.character_icon}>
                                    <Image alt={'character_icon'} height={50} width={50} src={images["icon-big"]} />
                                </div>
                                <span>{data.name}</span>
                                <div className={styles.character_vision}>
                                    <Image src={images.vision} width={50} height={50} alt={'character_vision'} />
                                </div>
                            </div>
                            <div className={styles.character_description}>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div className={styles.character_splash}>
                            <Image
                                src={images["gacha-splash"]}
                                alt={`character_picture`}
                                height={450}
                                width={600}
                                quality={80}
                            />
                        </div>
                    </section>
                    <div className={styles.details_table}>
                        <h1>{data.name}</h1>
                        <h2>{data.title}</h2>
                        <h4>{data.vision}</h4>
                        <h4>{data.weapon}</h4>
                        <h4>{data.nation}</h4>
                        <h4>{data.affiliation}</h4>
                        <h4>{data.rarity}</h4>
                        <h4>{data.constellation}</h4>
                        <h4>{data.birthday}</h4>
                    </div>
                </div>
            </main>
        </>
    )
};