import { CharactersModel } from "@/models/CharactersModel";
import Image from "next/image";

import ElementalBackground from "@/components/ElementalBackground";
import StarsRarity from "@/components/StarsRarity";
import styles from './styles.module.scss';

const getCharacterData = async (id) => await CharactersModel.getData(id);

export default async function Character({ params }) {
    const { basicInfo, attributes } = await getCharacterData(params.id);
    const vision = {
        type: attributes['Vision'] ? 'Vision' : 'Gnosis',
        value: attributes['Vision'] || attributes['Gnosis']
    };

    return (
        <div className={styles.page_container}>
            <main className={styles.main}>
                <div className={styles.content}>
                    <section className={styles.info_section}>
                        <div className={styles.character_info}>
                            <div className={styles.character_details}>
                                <div className={`${styles.character_icon} ${styles[`bg_${basicInfo.rarity}`]}`}>
                                    <Image alt={'character_icon'} height={64} width={64} src={basicInfo.icon_url} />
                                </div>
                                <div className={styles.character_name}>
                                    <span>{basicInfo.name}</span>
                                </div>
                                <div className={styles.character_vision}>
                                    {/* <Image src={images.vision} width={30} height={30} alt={'character_vision'} /> */}
                                </div>
                                <div className={styles.characer_rarity}>
                                    <StarsRarity rarity={Number(basicInfo.rarity.substr(0, 1))} />
                                </div>
                            </div>
                            <div className={styles.character_description}>
                                <p>{basicInfo.desc}</p>
                            </div>
                        </div>
                        <div className={styles.character_splash}>
                            <Image
                                src={basicInfo.header_img_url}
                                alt={`character_picture`}
                                height={450}
                                width={600}
                                quality={80}
                            />
                        </div>
                    </section>
                    <section className={`${styles.details_table} ${styles[`bg_${vision.value.toLowerCase()}`]}`}>
                        <div className={styles.table_header}>
                            <h4>Attributes</h4>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>Name</span>
                                <p>{attributes['Name']}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>Birthday</span>
                                <p>{attributes['Birthday']}</p>
                            </div>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>Constellation</span>
                                <p>{attributes['Constellation']}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>Title</span>
                                <p>{attributes['Title']}</p>
                            </div>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>{vision.type}</span>
                                <p>{vision.value}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>Affiliation</span>
                                <p>{attributes['Affiliation']}</p>
                            </div>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>Chinese VA</span>
                                <p>{attributes['Chinese VA']}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>English VA</span>
                                <p>{attributes['English VA']}</p>
                            </div>
                        </div>
                        <div className={styles.table_row}>
                            <div className={styles.table_column}>
                                <span>Korean VA</span>
                                <p>{attributes['Korean VA']}</p>
                            </div>
                            <div className={styles.table_column}>
                                <span>Version Released</span>
                                <p>{attributes['Version Released']}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <ElementalBackground bg={vision.value.toLowerCase()} />
        </div>
    )
};