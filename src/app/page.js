import { CharactersModel } from '@/models/CharactersModel.js';

import Characters from '@/components/Characters/index.js';
import Logo from '@/components/Logo';
import styles from './page.module.css';

export default async function Home() {
  const characters = await CharactersModel.getAll();

  return (
    <>
      <div className={styles.background}></div>
      <main className={styles.main}>
        <section>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.characters_container}>
            <Characters charactersData={characters} />
          </div>
        </section>
      </main>
    </>
  );
}

