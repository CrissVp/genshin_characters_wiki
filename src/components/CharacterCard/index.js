'use client'

import Link from 'next/link';
import styles from './styles.module.scss';

export default function CharacterCard({ data }) {
    return (
        <Link href={`/character/${data.id}`}>
            <div className={styles.character_card}>
                <img src={data.image} alt="" />
                <div className={styles.character_details}>
                    <h4>{data.name}</h4>
                </div>
            </div>
        </Link>
    );
};