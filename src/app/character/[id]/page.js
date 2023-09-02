import { CharactersModel } from "@/models/CharactersModel";
import Image from "next/image";

import ElementalBackground from "@/components/ElementalBackground";
import StarsRarity from "@/components/StarsRarity";
import styles from './styles.module.scss';
import AttributesTable from "@/components/AttributesTable";
import AscensionTable from "@/components/AscensionTable";

const getCharacterData = async (id) => await CharactersModel.getDataById(id);

export default async function Character({ params }) {
    const { basicInfo, attributes, ascensionData } = await getCharacterData(params.id);
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
                                <div className={`${styles.character_icon} bg_${basicInfo.rarity}`}>
                                    <Image alt={'character_icon'} height={64} width={64} src={basicInfo.icon_url} />
                                </div>
                                <div className={styles.character_name}>
                                    <span>{basicInfo.name}</span>
                                </div>
                                <div className={styles.character_vision}>
                                    <Image src={`/${vision.value.toLowerCase()}_vision.png`} width={30} height={30} alt={'character_vision'} />
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
                        <AttributesTable vision={vision} attributes={attributes} />
                        <AscensionTable vision={vision} data={ascensionData} />
                    </div>
                </div>
            </main>

            <ElementalBackground bg={vision.value.toLowerCase()} />
        </div>
    )
};