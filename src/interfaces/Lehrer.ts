export interface Lehrer {
  id: number
  name: string
}

export interface LehrerWithoutId {
  name: string
}

export interface LehrerWithScore {
  id: number
  name: string
  score: number
  rank: number
}
