import { CharactersModel } from '@/models/CharactersModel.js';
import Characters from '@/components/Characters/index.js';

import Logo from '@/components/Logo';
import Filters from '@/components/Filters';
import styles from './page.module.css';

const getCharactersData = async () => await CharactersModel.getAll();

export default async function Home() {
  const characters = await getCharactersData();
  // const [filters, setFilters] = useState({});

  return (
    <>
      <div className={styles.background}></div>
      <Filters />
      <main className={styles.main}>
        <section>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.characters_container}>
            <Characters characters={characters} />
          </div>
        </section>
      </main>
    </>
  );
}

