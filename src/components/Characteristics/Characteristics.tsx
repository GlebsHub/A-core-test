import { useState } from 'react'
import cn from 'classnames'
import { Checkbox } from '@alphacore/ui-kit'
import styles from './Characteristics.module.scss'

type CharacteristicsProps = {
  className?: string
}

export function Characteristics({ className }: CharacteristicsProps) {
  const [fireSafe, setFireSafe] = useState(false)

  return (
    <section
      className={cn(styles.root, className)}
      aria-labelledby="characteristics-heading"
    >
      <h2 className={styles.title} id="characteristics-heading">
        Свойства
      </h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Значение по умолчанию</th>
              <th scope="col">Единица измерения</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Давление номинальное</td>
              <td>2,5</td>
              <td>МПа</td>
            </tr>
            <tr>
              <td>Пожаробезопасный</td>
              <td>
                <Checkbox
                  checked={fireSafe}
                  onChange={(e) => setFireSafe(e.target.checked)}
                  className={styles.checkbox}
                />
              </td>
              <td aria-hidden="true" />
            </tr>
            <tr>
              <td>Температура среды</td>
              <td aria-hidden="true" />
              <td>°C</td>
            </tr>
            <tr>
              <td>Функциональный признак прибора</td>
              <td>T</td>
              <td aria-hidden="true" />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
