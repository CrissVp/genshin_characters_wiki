'use client';

import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Filters from '../Filters';
import IconButton from '../IconButton';
import styles from './styles.module.scss';

const MemoizedCharacterCard = memo(CharacterCard);

export default function Characters({ charactersData }) {
  const [filters, setFilters] = useState({});
  let characters = charactersData;

  if (filters.element) {
    characters = characters.filter(
      (char) => char.filter_values.character_vision?.values[0].toLowerCase() === filters.element
    );
  }

  if (filters.weapon) {
    characters = characters.filter(
      (char) => char.filter_values.character_weapon?.values[0].toLowerCase() === filters.weapon
    );
  }

  if (filters.rarity) {
    characters = characters.filter(
      (char) => char.filter_values.character_rarity?.values[0].toLowerCase() === filters.rarity
    );
  }

  if (filters.name) {
    characters = charactersData.filter((char) =>
      char.name.toLowerCase().startsWith(filters.name.toLowerCase())
    );
  }

  const memoizedCards = useMemo(() => {
    return characters.map((character) => (
      <MemoizedCharacterCard data={character} key={character.entry_page_id} />
    ));
  }, [characters]);

  return (
    <div className={styles.characters_container}>
      <Filters filters={filters} setFilters={setFilters} />
      {memoizedCards}
    </div>
  );
}

function CharacterCard({ data }) {
  const vision = data.filter_values.character_vision?.values[0];
  const rarity = data.filter_values.character_rarity?.values[0];

  return (
    <Link href={`/character/${data.entry_page_id}`} target='_blank'>
      <div className={styles.character_card_container}>
        <div className={`${styles.character_card} bg_${rarity}`}>
          <Image
            src={data.icon_url}
            alt={`${data.name}_picture`}
            height={124}
            width={124}
            quality={80}
          />
          {vision && <IconButton icon={`${vision.toLowerCase()}_vision`} />}
        </div>
        <div className={styles.character_details}>
          <h4>{data.name}</h4>
        </div>
      </div>
    </Link>
  );
}

