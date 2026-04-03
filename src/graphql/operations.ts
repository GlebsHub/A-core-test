function childrenBlock(depth: number): string {
  if (depth <= 0) return ''
  return `
    children {
      id
      label
      name
      description
      is_assigned
      in_library
      ${childrenBlock(depth - 1)}
    }
  `
}

export function buildTreeQuery(depth = 14): string {
  return `
    query FunctionalClassesTree {
      tree {
        id
        label
        name
        description
        is_assigned
        in_library
        ${childrenBlock(depth)}
      }
    }
  `
}

export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`
