import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* TODO: Workaround for mathjax */}
      <Script src="/scripts/mathjax-conf.js"></Script>
      <Script id="MathJax-script" async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
      </Script>

      <Head>
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <header>
        <div className="pad">
          <Link href="/"><a className="bread">monman53.github.io</a></Link>
        </div>
      </header>
      <main>
        <div className="pad">
          {children}
        </div>
      </main>
      <footer>
        <div className="pad">
          {/* <p className="last-modified">Last Modified: </p> */}
          <Link href="/"><a className="bread">monman53.github.io</a></Link>
        </div>
      </footer>
    </div>
  )
}