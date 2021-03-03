import Datastore from 'nedb-promises'

export interface IRaidBoss {
  _id?: string
  name: string
  location?: string
  coordenates?: {
    x: number
    y: number
  }
}

export const RaidBoss = Datastore.create({ filename: `${process.env.DB_PATH}/raidbosses.db`, autoload: true })