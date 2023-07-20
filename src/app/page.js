import styles from './page.module.css'
import SearchForm from './searchForm';

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        
      </div>
      <h1>Recipe Finder</h1>
      <div className={styles.center}>
        <SearchForm />
      </div>
      <div className={styles.seperator}></div>
      <div className={styles.center}>
        <div className={styles.searchResults}>

        </div>
      </div>
    </main>
  )
}