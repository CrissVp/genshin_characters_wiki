import { CharactersModel } from "@/models/CharactersModel.js";
import CharacterCard from "@/components/CharacterCard/index.js";

import Logo from "@/components/Logo";
import styles from './page.module.css';

const getCharactersData = async () => await CharactersModel.getAll();

export default async function Home() {
  const characters = await getCharactersData();
  // console.log(characters)

  return (
    <>
      <div className={styles.background}></div>
      <main className={styles.main}>
        <section>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.characters_container}>
            {characters.map((character) => (
              <CharacterCard data={character} key={character.id} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
