import Datastore from 'nedb-promises'

export interface IRaidBossConfig {
  _id?: string
  raidboss: string
  guild: string
  respawn: number
  respawnStart: number
  windowDuration: number
}

export const RaidBossConfig = Datastore.create({ filename: `${process.env.DB_PATH}/raidbossesconfig.db`, autoload: true })