import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-[black] text-2xl font-light text-[white] antialiased md:text-4xl xl:text-6xl">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
