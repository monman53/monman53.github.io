import Layout from '../components/layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <article>
        <p>
          Welcome to monman53 web site.
        </p>
        <ul>
          <li><p><Link href="/profile"><a>Profile</a></Link></p></li>
          <li><p><Link href="/tools"><a>My gears</a></Link></p></li>
          <li><p><Link href="/music"><a>My favorite musics</a></Link></p></li>
          <li><p><Link href="/cooking"><a>Cooking tips</a></Link></p></li>
          {/* <li><p><Link href="/links"><a>Favorite sites</a></Link></p></li> */}
        </ul>
      </article>
    </Layout>
  )
}