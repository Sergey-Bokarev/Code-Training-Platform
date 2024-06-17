import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>LeetClone</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
        <meta name='descriuption' content='Web application that contains leetcode problems and solutions' />
      </Head>
      <ToastContainer position='top-center' autoClose={3000} theme='dark' />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
