export interface ElixirIngredient {
  id: string
  name: string
}

export interface ElixirInventor {
  id: string
  firstName: string
  lastName: string
}

export interface Elixir {
  id: string
  name: string
  effect: string
  sideEffects: string | null
  characteristics: string | null
  time: string | null
  difficulty: string
  ingredients: ElixirIngredient[]
  inventors: ElixirInventor[]
  manufacturer: string | null
}
