import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <script src="/mathjax-conf.js"> </script>
        <script id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
        </script>
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
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
      </footer>
    </div>
  )
}