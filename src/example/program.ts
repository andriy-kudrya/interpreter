import type { Program } from '../dsl/program'
import * as a from './actions'
import { emit } from '../dsl/action'
import type { User } from './types'

async function* getStatus(user: User): Program<string> {
    const validation = yield* emit(a.validateUser(user))
    return validation.status
}

async function* formatUser(userId: string): Program<string> {
    const user = yield* emit(a.getUser(userId))
        , status = yield* getStatus(user)
        , city = yield* emit(a.getCity(user.cityId))

    return `${user.name} from ${city.name} (${status})`
}

export {
    formatUser
}