import { Handler, handler } from '../dsl/handler'
import * as a from './actions'
import type { User, City, UserValidation } from './types'

function buildHandlers(): Handler<any, any>[] {
    return [
        handler(a.getUser, getUser),
        handler(a.validateUser, validateUser),
        handler(a.getCity, getCity),
    ]
}

export default buildHandlers

// misc stubs

function getUser(id: string): Promise<User> {
    if (id !== 'paul id')
        return Promise.reject('unknown user')

    return Promise.resolve({
        name: 'Paul',
        age: 15,
        cityId: 'San-Francisco id',
    })
}

function getCity(id: string): Promise<City> {
    return Promise.resolve({
        name: id.replace(' id', ''),
    })
}

function validateUser(user: User): UserValidation {
    if (user.age < 18)
        return { status: 'underage' }

    if (user.cityId === 'Mordor id')
        return { status: 'orc' }

    return { status: 'ok' }
}