'use client'

import styles from './styles.module.css';

export default function CharacterCard({ data }) {

    return (
        <div className={styles.character_card}>
            <img src={data.image} alt="" />
            {/* <h4>{data.name}</h4> */}
        </div>
    )
}