import { CharactersModel } from "@/models/CharactersModel";
import Image from "next/image";

import ElementalBackground from "@/components/ElementalBackground";
import styles from './styles.module.scss';

const getCharacterData = async (id) => await CharactersModel.getData(id);

const CharacterImage = ({ src, alt, w, h }) => {
    return <Image src={src} width={w} height={h} alt={alt} />
};

export default async function Character({ params }) {
    const characterData = await getCharacterData(params.id);

    return (
        <>
            <ElementalBackground bg={characterData.data.vision.toLowerCase()} />
            <main className={styles.main}>
                <CharacterImage src={characterData.images.card} alt={`${characterData.data.name}_picture`} h={800} w={450} />
                <h1>{characterData.data.name}</h1>
                <h2>{characterData.data.title}</h2>
                <h4>{characterData.data.vision}</h4>
                <h4>{characterData.data.weapon}</h4>
                <h4>{characterData.data.nation}</h4>
                <h4>{characterData.data.affiliation}</h4>
                <h4>{characterData.data.rarity}</h4>
                <h4>{characterData.data.constellation}</h4>
                <h4>{characterData.data.birthday}</h4>
                <p>{characterData.data.description}</p>
            </main>
        </>
    )
};