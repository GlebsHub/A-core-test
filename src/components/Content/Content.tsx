import type { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Content.module.scss'

type ContentProps = {
  children: ReactNode
  /** Главная: двухколоночный макет дерева и контента */
  layout?: 'default' | 'home'
  className?: string
}

export function Content({
  children,
  layout = 'default',
  className,
}: ContentProps) {
  return (
    <main
      className={cn(
        styles.content,
        layout === 'home' && styles.homePage,
        className,
      )}
    >
      <div className={styles.contentBody}>{children}</div>
    </main>
  )
}
