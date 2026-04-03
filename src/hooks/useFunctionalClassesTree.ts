import type { TreeNode } from '@alphacore/ui-kit'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../auth/useAuth'
import { createGraphQLClient } from '../graphql/client'
import { buildTreeQuery } from '../graphql/operations'
import type { GraphQLTreeNodeRaw } from '../graphql/types'
import { getStoredToken } from '../auth/tokenStorage'
import { mapGraphQLTreeRoot } from '../utils/mapGraphQLTree'

export function useFunctionalClassesTree() {
  const { token } = useAuth()

  const query = useQuery({
    queryKey: ['graphql-tree', token],
    enabled: Boolean(token),
    queryFn: async () => {
      const t = getStoredToken()
      if (!t) {
        throw new Error('Требуется авторизация')
      }
      const client = createGraphQLClient(t)
      const res = await client.request<{ tree: GraphQLTreeNodeRaw }>(
        buildTreeQuery(14),
      )
      return mapGraphQLTreeRoot(res.tree)
    },
  })

  const treeData: TreeNode[] = query.data ?? []

  return {
    treeData,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
  }
}
