import Characters from '@/components/Characters'
import styles from './page.module.css'

export default function Home() {

  return (
    <main className={styles.main}>
      <Characters />
    </main>
  )
}
