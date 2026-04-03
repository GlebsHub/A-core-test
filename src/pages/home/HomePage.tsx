import cn from 'classnames'
import { Characteristics } from '../../components/Characteristics/Characteristics'
import { Connection } from '../../components/Connection/Connection'
import { Content } from '../../components/Content/Content'
import { Description } from '../../components/Description/Description'
import { Header } from '../../components/Header/Header'
import { Main } from '../../components/Main/Main'
import { SideBar } from '../../components/SideBar/SideBar'
import shell from '../../layouts/PageShell.module.scss'
import styles from './HomePage.module.scss'

export function HomePage() {
  return (
    <div className={cn(shell.root, styles.homeLayout)}>
      <Header />
      <Content layout="home">
        <SideBar />
        <Main layout="home">
          <Description />
          <Characteristics />
          <Connection />
        </Main>
      </Content>
    </div>
  )
}
