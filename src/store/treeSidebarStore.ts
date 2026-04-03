import type { Dispatch, SetStateAction } from 'react'
import { create } from 'zustand'
import type { TreeNode } from '@alphacore/ui-kit'

type SetExpanded = Dispatch<SetStateAction<Set<number>>>
type SetSelected = Dispatch<SetStateAction<number[]>>


export function filterTreeByName(
  nodes: TreeNode[],
  query: string,
): { tree: TreeNode[]; matchedIds: Set<number> } {
  const q = query.trim().toLowerCase()
  if (!q) {
    return { tree: nodes, matchedIds: new Set() }
  }
  const matchedIds = new Set<number>()
  const walk = (n: TreeNode[]): TreeNode[] =>
    n.reduce<TreeNode[]>((acc, node) => {
      const childFiltered = node.children ? walk(node.children) : []
      const nameMatch = node.name.toLowerCase().includes(q)
      if (nameMatch || childFiltered.length > 0) {
        matchedIds.add(node.id)
        acc.push({
          ...node,
          children: childFiltered,
        })
      }
      return acc
    }, [])
  return { tree: walk(nodes), matchedIds }
}

type TreeSidebarState = {
  treeSearch: string
  setTreeSearch: (value: string) => void
  expandedNodes: Set<number>
  setExpandedNodes: SetExpanded
  selectedNodeIds: number[]
  setSelectedNodeIds: SetSelected
  activeNodeId: number | null
  activeNodeDescription: string
  setActiveNodeFromTree: (node: TreeNode | null) => void
}

export const useTreeSidebarStore = create<TreeSidebarState>((set) => ({
  treeSearch: '',
  setTreeSearch: (value) => set({ treeSearch: value }),

  expandedNodes: new Set(),
  setExpandedNodes: (updater) =>
    set((s) => ({
      expandedNodes:
        typeof updater === 'function'
          ? updater(s.expandedNodes)
          : updater,
    })),

  selectedNodeIds: [],
  setSelectedNodeIds: (updater) =>
    set((s) => ({
      selectedNodeIds:
        typeof updater === 'function'
          ? updater(s.selectedNodeIds)
          : updater,
    })),

  activeNodeId: null,
  activeNodeDescription: '',
  setActiveNodeFromTree: (node) =>
    set(
      node
        ? {
            activeNodeId: node.id,
            activeNodeDescription: node.customData?.description ?? '',
          }
        : { activeNodeId: null, activeNodeDescription: '' },
    ),
}))
