export type GraphQLTreeNodeRaw = {
  id: string
  label: string
  name?: string | null
  description?: string | null
  is_assigned?: boolean | null
  in_library?: boolean | null
  children?: GraphQLTreeNodeRaw[] | null
}
