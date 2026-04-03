import type { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Main.module.scss'

type MainProps = {
  children?: ReactNode
  layout?: 'default' | 'home'
  className?: string
}

export function Main({ children, className, layout = 'default' }: MainProps) {
  return (
    <section
      className={cn(
        styles.contentMain,
        layout === 'home' && styles.contentMainHome,
        className,
      )}
      aria-label="Основное содержимое"
    >
      {children}
    </section>
  )
}
