import type { ChangeEvent } from 'react'
import cn from 'classnames'
import { Search } from 'lucide-react'
import { Input } from '@alphacore/ui-kit'
import styles from './SearchBar.module.scss'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export type SearchBarProps = {
  placeholder?: string
  value: string
  onChange: (e: InputChange) => void
  name?: string
  className?: string
}

export function SearchBar({
  placeholder = 'Найти классы',
  value,
  onChange,
  name = 'class-search',
  className,
}: SearchBarProps) {
  return (
    <Input
      type="search"
      name={name}
      placeholder={placeholder}
      value={value}
      IconBefore={
        <Search className={styles.icon} size={22} aria-hidden />
      }
      errorHidden
      autoComplete="off"
      className={cn(styles.root, className)}
      wrapperClassName={styles.shell}
      onChange={onChange}
    />
  )
}
