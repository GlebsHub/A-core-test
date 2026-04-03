import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import cn from 'classnames'
import {
  Button,
  Loader,
  Text,
  Tree,
  useToggleAllNodes,
  type TreeNode,
} from '@alphacore/ui-kit'
import { filterTreeByName, useTreeSidebarStore } from '../../store/treeSidebarStore'
import { useFunctionalClassesTree } from '../../hooks/useFunctionalClassesTree'
import styles from './SideBar.module.scss'

type SideBarProps = {
  children?: ReactNode
  className?: string
}

export function SideBar({ children, className }: SideBarProps) {
  const treeSearch = useTreeSidebarStore((s) => s.treeSearch)
  const expandedNodes = useTreeSidebarStore((s) => s.expandedNodes)
  const setExpandedNodes = useTreeSidebarStore((s) => s.setExpandedNodes)
  const selectedNodeIds = useTreeSidebarStore((s) => s.selectedNodeIds)
  const setSelectedNodeIds = useTreeSidebarStore((s) => s.setSelectedNodeIds)
  const setActiveNodeFromTree = useTreeSidebarStore((s) => s.setActiveNodeFromTree)

  const { treeData, isLoading, isError, error } = useFunctionalClassesTree()

  const { tree: filteredTree, matchedIds } = useMemo(
    () => filterTreeByName(treeData, treeSearch),
    [treeData, treeSearch],
  )
  const rootId = treeData[0]?.id

  const { toggleExpandAll } = useToggleAllNodes({
    treeData: filteredTree,
    setExpandedNodes,
  })

  const onSelectNode = useCallback(
    (node: TreeNode, checked?: boolean) => {
      if (checked === undefined) return
      setSelectedNodeIds((prev) => {
        if (checked) {
          return prev.includes(node.id) ? prev : [...prev, node.id]
        }
        return prev.filter((id) => id !== node.id)
      })
      if (checked) {
        setActiveNodeFromTree(node)
      } else if (useTreeSidebarStore.getState().activeNodeId === node.id) {
        setActiveNodeFromTree(null)
      }
    },
    [setSelectedNodeIds, setActiveNodeFromTree],
  )

  useEffect(() => {
    if (!treeSearch.trim()) return
    setExpandedNodes((prev) => new Set([...prev, ...matchedIds]))
  }, [treeSearch, matchedIds, setExpandedNodes])

  useEffect(() => {
    if (rootId === undefined) return
    setExpandedNodes((prev) => (prev.size > 0 ? prev : new Set([rootId])))
  }, [rootId, setExpandedNodes])

  const showTree = !isLoading && !isError && filteredTree.length > 0

  return (
    <aside className={cn(styles.sideBar, className)}>
      <div className={styles.toolbar}>
        <Button
          type="button"
          variant="basic"
          disabled={!showTree}
          onClick={() => toggleExpandAll(false)}
        >
          Свернуть все
        </Button>
        <Button
          type="button"
          variant="basic"
          disabled={!showTree}
          onClick={() => toggleExpandAll(true)}
        >
          Развернуть все
        </Button>
      </div>
      <div className={styles.tree}>
        {isLoading && (
          <div className={styles.state}>
            <Loader />
            <Text>Загрузка дерева…</Text>
          </div>
        )}
        {isError && (
          <div className={styles.hintError} role="alert">
            <Text>
              {error instanceof Error
                ? error.message
                : 'Не удалось загрузить дерево'}
            </Text>
          </div>
        )}
        {showTree && (
          <Tree
            treeData={filteredTree}
            height={650}
            width="100%"
            maxWidth="100%"
            expandedNodes={expandedNodes}
            selectedNodeIds={selectedNodeIds}
            withCheckbox
            clearParent
            preExpand={false}
            onSelectNode={onSelectNode}
            setExpandedNodes={setExpandedNodes}
          />
        )}
      </div>
      {children}
    </aside>
  )
}
