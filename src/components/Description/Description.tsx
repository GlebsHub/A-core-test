import { useEffect, useId, useState } from 'react'
import type { ChangeEventHandler } from 'react'
import cn from 'classnames'
import { TextArea } from '@alphacore/ui-kit'
import { useTreeSidebarStore } from '../../store/treeSidebarStore'
import styles from './Description.module.scss'

type DescriptionProps = {
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  className?: string
}

export function Description({
  value: valueProp,
  onChange,
  className,
}: DescriptionProps) {
  const [draft, setDraft] = useState('')
  const fieldId = useId()
  const activeNodeId = useTreeSidebarStore((s) => s.activeNodeId)
  const activeNodeDescription = useTreeSidebarStore((s) => s.activeNodeDescription)
  const controlled = valueProp !== undefined
  const value = controlled ? valueProp : draft

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange?.(e)
    if (!controlled) setDraft(e.target.value)
  }

  useEffect(() => {
    if (activeNodeId === null) setDraft('')
    else setDraft(activeNodeDescription)
  }, [activeNodeId, activeNodeDescription])

  return (
    <div className={cn(styles.description, className)}>
      <TextArea
        id={fieldId}
        label="Описание"
        value={value}
        className={styles.textarea}
        onChange={handleChange}
      />
    </div>
  )
}
