import { FC, ReactNode } from 'react'
import Footer from 'components/templates/Footer'
import Header from 'components/templates/Header'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
