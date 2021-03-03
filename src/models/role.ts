import Datastore from 'nedb'

export interface IRole {
  _id?: string
  raidboss: string
  name: string
}

export const Role = new Datastore<IRole>({ filename: `${process.env.DB_PATH}/roles.db`, autoload: true })