import { Button } from '@alphacore/ui-kit'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../auth/useAuth'
import { formatUserDisplayName } from '../../auth/userStorage'
import { SearchBar } from '../SearchBar/SearchBar'
import { Select } from '../Select/Select'
import { useTreeSidebarStore } from '../../store/treeSidebarStore'
import styles from './Header.module.scss'

const FLAG_LABELS: [string, string] = ['Да', 'Нет']

export function Header() {
  const treeSearch = useTreeSidebarStore((s) => s.treeSearch)
  const setTreeSearch = useTreeSidebarStore((s) => s.setTreeSearch)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const displayName = user ? formatUserDisplayName(user) : ''

  const handleLogout = () => {
    logout()
    void navigate({ to: '/login' })
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Классы</h2>
        <div className={styles.right}>
          <div className={styles.filters}>
            <Select
              label="Присвоенные"
              count={1}
              name="assigned"
              flagLabels={FLAG_LABELS}
            />
            <Select
              label="В библиотеке"
              count={1}
              name="library"
              flagLabels={FLAG_LABELS}
            />
            <SearchBar
              value={treeSearch}
              onChange={(e) => setTreeSearch(e.target.value)}
            />
          </div>
          <div className={styles.user}>
            {displayName ? (
              <span
                className={styles.userName}
                title={user?.email ?? undefined}
              >
                {displayName}
              </span>
            ) : null}
            <Button
              type="button"
              variant="basic"
              className={styles.logout}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
