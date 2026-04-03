import { useCallback, useState } from 'react'
import cn from 'classnames'
import {
  Select as UiKitSelect,
  type SelectOptionT,
} from '@alphacore/ui-kit'
import styles from './Select.module.scss'

const DEFAULT_FLAG_LABELS: [string, string] = ['Да', 'Нет']

export type SelectProps = {
  label: string
  count: number
  name?: string
  flagLabels?: [string, string]
  disabled?: boolean
  className?: string
}

function makeOptions(
  name: string,
  flagLabels: [string, string],
): SelectOptionT[] {
  const id = name || 'select'
  return [
    { value: `${id}-flag-1`, label: flagLabels[0], checked: false },
    { value: `${id}-flag-2`, label: flagLabels[1], checked: false },
  ]
}

export function Select({
  label,
  count,
  name = 'select',
  flagLabels = DEFAULT_FLAG_LABELS,
  disabled,
  className,
}: SelectProps) {
  const [options, setOptions] = useState<SelectOptionT[]>(() =>
    makeOptions(name, flagLabels),
  )

  const onSelect = useCallback((field: SelectOptionT) => {
    setOptions((prev) =>
      prev.map((o) => ({
        ...o,
        checked: o.value === field.value,
      })),
    )
  }, [])

  const onRemove = useCallback((field: SelectOptionT) => {
    setOptions((prev) =>
      prev.map((o) =>
        o.value === field.value ? { ...o, checked: false } : o,
      ),
    )
  }, [])

  const placeholder = `${label} +${count}`

  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.triggerText} aria-hidden="true">
        {placeholder}
      </span>
      <UiKitSelect
        name={name}
        options={options}
        placeholder={placeholder}
        variant="fill"
        listing
        singleChoice
        disabled={disabled}
        errorHidden
        withCheckbox
        className={styles.control}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    </div>
  )
}
