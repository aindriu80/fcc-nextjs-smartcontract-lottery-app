import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import LotteryEntrance from '../components/LotteryEntrance'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h4 className="py-4 py-4 font-blog text-3xl">Decentralised Lottery</h4>
      <Header />
      <LotteryEntrance />
    </div>
  )
}
