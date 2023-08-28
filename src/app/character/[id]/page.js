import { CharactersModel } from "@/models/CharactersModel";
import Image from "next/image";

import ElementalBackground from "@/components/ElementalBackground";
import styles from './styles.module.scss';
import StarsRarity from "@/components/StarsRarity";

const getCharacterData = async (id) => await CharactersModel.getData(id);

export default async function Character({ params }) {
    const { data, images } = await getCharacterData(params.id);

    return (
        <>
            <ElementalBackground bg={data.vision.toLowerCase()} />
            <main className={styles.main}>
                <div className={styles.content}>
                    <section className={styles.info_section}>
                        <div className={styles.character_info}>
                            <div className={styles.character_details}>
                                <div className={`${styles.character_icon} ${data.rarity === 5 ? styles.five_stars_bg : styles.four_stars_bg}`}>
                                    <Image alt={'character_icon'} height={64} width={64} src={images["icon-big"]} />
                                </div>
                                <div className={styles.character_name}>
                                    <span>{data.name}</span>
                                </div>
                                <div className={styles.character_vision}>
                                    <Image src={images.vision} width={30} height={30} alt={'character_vision'} />
                                </div>
                                <div className={styles.characer_rarity}>
                                    <StarsRarity rarity={data.rarity} />
                                </div>
                            </div>
                            <div className={styles.character_description}>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div className={styles.character_splash}>
                            {images["gacha-splash"] &&
                                <Image
                                    src={images["gacha-splash"]}
                                    alt={`character_picture`}
                                    height={450}
                                    width={600}
                                    quality={80}
                                />
                            }
                        </div>
                    </section>
                    <section className={`${styles.details_table} ${styles[`bg_${data.vision.toLowerCase()}`]}`}>
                        <div className={styles.table_header}>
                            <h4>Attributes</h4>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>Name</span>
                                <p>{data.name}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>Birthday</span>
                                <p>{data.birthday}</p>
                            </div>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>Constellation</span>
                                <p>{data.constellation}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>Title</span>
                                <p>{data.title}</p>
                            </div>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>Vision</span>
                                <p>{data.vision}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>Affiliation</span>
                                <p>{data.affiliation}</p>
                            </div>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>Weapon</span>
                                <p>{data.weapon}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>Nation</span>
                                <p>{data.nation}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
};