import styles from './page.module.css'
import SearchForm from './searchForm';


export default function Home() {

  return (
    <main className={styles.main}>
      <h1>Recipe Finder</h1>
      <div className={styles.center}>
        <SearchForm />
      </div>
    </main>
  )
}
