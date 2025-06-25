export interface Lehrer {
  id: number
  name: string
  photo_id: number | undefined
}

export interface LehrerWithoutId {
  name: string
  photo_id?: number
}

export interface LehrerWithScore {
  id: number
  name: string
  photo_id: number | undefined
  score: number
  rank: number
}
