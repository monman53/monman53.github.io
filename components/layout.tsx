import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header>
        <div className="pad">
          <p className="bread">monman53.github.io / hoge / piyo</p>
          <p className="last-modified">Last Modified: </p>
        </div>
      </header>
      <main>
        <div className="pad">
          {children}
        </div>
      </main>
      <footer>
        <div className="pad">
          <p className="last-modified">Last Modified: </p>
        </div>
      </footer>
    </div>
  )
}