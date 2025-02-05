export interface Abstimmung {
  id?: number
  name: string
}

export interface AbstimmungDetail {
  id: number
  name: string
  winner: {
    id: number
    name: string
    rank: number
    score: number
  }
}
