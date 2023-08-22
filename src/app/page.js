import { CharactersModel } from "@/app/models/CharactersModel.js";
import CharacterCard from "@/components/CharacterCard/index.js";

import Logo from "@/components/Logo";
import styles from './page.module.css';

const getCharactersData = async () => await CharactersModel.getAll();

export default async function Home() {
  const characters = await getCharactersData();

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.characters_container}>
        {characters.map((character) => (
          <CharacterCard data={character} key={character.name} />
        ))}
      </div>
    </main>
  )
}
