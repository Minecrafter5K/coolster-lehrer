export interface Abstimmung {
  id?: number
  name: string
  startDate: Date
  endDate: Date
}

export interface AbstimmungDetail {
  id: number
  name: string
  startDate: Date
  endDate: Date
  winner: {
    id: number
    name: string
    rank: number
    score: number
  }
}
