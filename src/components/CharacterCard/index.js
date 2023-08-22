'use client'

import styles from './styles.module.css';

export default function CharacterCard({ data }) {
    console.log(data)

    return (
        <div className={styles.character_card}>
            <img loading='lazy' src={data.image} alt="" />
            <div className={styles.character_details}>
                <h4>{data.name}</h4>
            </div>
        </div>
    )
}