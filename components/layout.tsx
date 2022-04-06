import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = '[Your Name]'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header className={styles.header}>
        <h1>Header</h1>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <h1>Footer</h1>
      </footer>
    </div>
  )
}