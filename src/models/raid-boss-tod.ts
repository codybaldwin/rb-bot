import Datastore from 'nedb-promises'

export interface IRaidBossTOD {
  _id?: string
  raidboss: string
  timeOfDeath: Date
  nextRespawnStart: Date
  respawnWindowEnd: Date
  windowSize: number
}

export const RaidBossTOD = Datastore.create({ filename: `${process.env.DB_PATH}/raidbossestod.db`, autoload: true })