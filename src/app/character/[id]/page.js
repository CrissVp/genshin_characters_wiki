import { CharactersModel } from "@/models/CharactersModel";
import Image from "next/image";

import ElementalBackground from "@/components/ElementalBackground";
import CharacterGallery from "@/components/CharacterGallery";
import AttributesTable from "@/components/AttributesTable";
import Constellations from "@/components/Constellations";
import AscensionTable from "@/components/AscensionTable";
import StarsRarity from "@/components/StarsRarity";
import Talents from "@/components/Talents";
import styles from './styles.module.scss';

const getCharacterData = async (id) => await CharactersModel.getDataById(id);

export default async function Character({ params }) {
    const { basicInfo, attributesData, ascensionData, galleryData, talentsData, constellationsData } = await getCharacterData(params.id);

    return (
        <div className={styles.page_container}>
            <main className={styles.main}>
                <div className={styles.content}>
                    <section className={styles.info_section}>
                        <div className={styles.character_info}>
                            <div className={styles.character_details}>
                                <div className={`${styles.character_icon} bg_${basicInfo.rarity}`}>
                                    <Image alt={'character_icon'} height={64} width={64} src={basicInfo.icon_url} />
                                </div>
                                <div className={styles.character_name}>
                                    <span>{basicInfo.name}</span>
                                </div>
                                <div className={styles.character_vision}>
                                    <Image src={`/${basicInfo.vision.toLowerCase()}_vision.png`} width={30} height={30} alt={'character_vision'} />
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
                    <div className={styles.info_tables}>
                        <AttributesTable vision={basicInfo.vision} attributes={attributesData} />
                        <AscensionTable vision={basicInfo.vision} data={ascensionData} />
                        <CharacterGallery vision={basicInfo.vision} data={galleryData} />
                        <Talents vision={basicInfo.vision} data={talentsData} />
                        <Constellations vision={basicInfo.vision} data={constellationsData} />
                    </div>
                </div>
            </main>

            <ElementalBackground bg={basicInfo.vision.toLowerCase()} />
        </div>
    )
};