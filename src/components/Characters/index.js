'use client'

import Link from 'next/link';
import Image from 'next/image';
import { memo, useMemo } from "react";
import styles from './styles.module.scss';

const MemoizedCharacterCard = memo(CharacterCard);

export default function Characters({ characters }) {
    const memoizedCards = useMemo(() => {
        return characters.map((character) => <MemoizedCharacterCard data={character} key={character.entry_page_id} />);
    }, [characters]);

    return (
        <div className={styles.characters_container}>
            {memoizedCards}
        </div>
    );
};

function CharacterCard({ data }) {
    const vision = data.filter_values.character_vision?.values[0];

    return (
        <Link href={`/character/${data.entry_page_id}`} target='_blank'>
            <div className={styles.character_card_container}>
                <div className={styles.character_card}>
                    {/* <Image src={data.images.bg} alt={`${data.id}_picture`} height={250} width={200} /> */}
                    <Image src={data.icon_url} alt={`${data.name}_picture`} height={250} width={200} />
                    {vision && <Image className={styles.vision} src={`/${vision.toLowerCase()}_vision.png`} alt={`character_vision`} height={50} width={50} />}
                </div>
                <div className={styles.character_details}>
                    <h4>{data.name}</h4>
                </div>
            </div>
        </Link>
    );
};