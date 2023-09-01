'use client'

import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

export default function CharacterCard({ data }) {
    // console.log(data)

    return (
        <Link href={`/character/${data.id}`} target='_blank'>
            <div className={styles.character_card_container}>
                <div className={styles.character_card}>
                    <Image src={data.images.bg} alt={`${data.id}_picture`} height={250} width={200} />
                    <Image src={data.images.avatar} alt={`${data.id}_picture`} height={250} width={200} />
                    <Image className={styles.vision} src={data.images.vision} alt={`${data.id}_picture`} height={50} width={50} />
                </div>
                <div className={styles.character_details}>
                    <h4>{data.name}</h4>
                </div>
            </div>
        </Link>
    );
};