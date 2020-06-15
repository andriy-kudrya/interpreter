import * as a from '../dsl/action'
import type { User, UserValidation, City } from './types'

export const getUser = a.action<string, Promise<User>>('getUser')
           , validateUser = a.action<User, UserValidation>('validateUser')
           , getCity = a.action<string, Promise<City>>('getCity')