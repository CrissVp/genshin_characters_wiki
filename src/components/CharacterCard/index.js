'use client'

import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

export default function CharacterCard({ data }) {
    return (
        <Link href={`/character/${data.id}`}>
            <div className={styles.character_card}>
                <Image src={data.image} alt={`${data.id}_picture`} height={350} width={200} />
                <div className={styles.character_details}>
                    <h4>{data.name}</h4>
                </div>
            </div>
        </Link>
    );
};