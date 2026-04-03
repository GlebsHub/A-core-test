import type { TreeNode } from '@alphacore/ui-kit'
import type { GraphQLTreeNodeRaw } from '../graphql/types'

function mapNode(n: GraphQLTreeNodeRaw): TreeNode {
  const id = Number(n.id)
  const children = n.children?.filter(Boolean).map(mapNode)
  const name = n.name?.trim() || n.label
  return {
    id,
    name,
    children: children?.length ? children : undefined,
    customData: {
      description: n.description ?? '',
      graphqlId: n.id,
    },
  }
}


export function mapGraphQLTreeRoot(root: GraphQLTreeNodeRaw): TreeNode[] {
  return [mapNode(root)]
}
