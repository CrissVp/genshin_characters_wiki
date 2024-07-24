'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';
import IconButton from '../IconButton';
import StarsRarity from '../StarsRarity';

const elememts = ['pyro', 'cryo', 'electro', 'geo', 'hydro', 'anemo', 'dendro'];
const wepons = ['sword', 'greatsword', 'bow', 'catalyst', 'polearm'];

export default function Filters({ setFilters }) {
  const [visible, setVisible] = useState(false);

  return (
    <aside
      className={`${styles.container} ${visible ? styles.container_bg : ''}`}
      onClick={() => setVisible(false)}
    >
      <div
        className={`${styles.filters_container} ${visible ? styles.expanded : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.filter_button} onClick={() => setVisible(!visible)}>
          <Image src='/filter.svg' height={40} width={40} />
        </button>
        <div className={`${styles.filters} ${visible ? styles.visible : styles.hidden}`}>
          <div className={styles.search_input}>
            <Image height={15} width={15} src='/magnifing_glass.svg' />
            <input type='text' />
          </div>
          <div className={styles.filter}>
            <span>Elemental Type</span>
            <ul>
              {elememts.map((element) => (
                <li>
                  <button onClick={() => setFilters((current) => ({ ...current, element }))}>
                    <IconButton icon={`${element}_vision`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.filter}>
            <span>Weapon</span>
            <ul>
              {wepons.map((weapon) => (
                <li>
                  <button onClick={() => setFilters((current) => ({ ...current, weapon }))}>
                    <IconButton icon={weapon} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.filter} ${styles.rarity_filter}`}>
            <span>Rarity</span>
            <ul>
              <li>
                <button
                  className={styles.rarity_button}
                  onClick={() => setFilters((current) => ({ ...current, rarity }))}
                >
                  <StarsRarity rarity={5} />
                </button>
              </li>
              <li>
                <button
                  className={styles.rarity_button}
                  onClick={() => setFilters((current) => ({ ...current, rarity }))}
                >
                  <StarsRarity rarity={4} />
                </button>
              </li>
            </ul>
          </div>
          <div>
            <span>More filters</span>
            <ul></ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
