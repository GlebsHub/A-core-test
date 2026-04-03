import { useState } from 'react'
import cn from 'classnames'
import { Checkbox } from '@alphacore/ui-kit'
import styles from './Connection.module.scss'

const CONNECTION_ROWS = [
  { id: 'className', label: 'Название класса' },
  { id: 'mechanical', label: 'Механическое оборудование' },
  { id: 'title', label: 'Титул' },
] as const

type RowId = (typeof CONNECTION_ROWS)[number]['id']

type ConnectionProps = {
  className?: string
}

export function Connection({ className }: ConnectionProps) {
  const [checked, setChecked] = useState<Record<RowId, boolean>>({
    className: false,
    mechanical: false,
    title: false,
  })

  return (
    <section
      className={cn(styles.root, className)}
      aria-labelledby="connection-heading"
    >
      <h2 className={styles.title} id="connection-heading">
        Связи
      </h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <tbody>
            {CONNECTION_ROWS.map((row) => (
              <tr key={row.id}>
                <td className={cn(styles.cell, styles.cellCheck)}>
                  <Checkbox
                    checked={checked[row.id]}
                    onChange={(e) =>
                      setChecked((prev) => ({
                        ...prev,
                        [row.id]: e.target.checked,
                      }))
                    }
                    className={styles.checkbox}
                  />
                </td>
                <td className={styles.cell}>{row.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
