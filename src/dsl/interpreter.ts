import type { Action } from './action'
import type { Handler } from './handler'

const UNKNOWN_ACTION = Symbol('unknown action')
type UNKNOWN_ACTION = typeof UNKNOWN_ACTION

type Interpreter = <Payload, Result>(action: Action<Payload, Result>) => Result | UNKNOWN_ACTION

function interpreterFactory(handlers: Handler<any, any>[]): Interpreter {
    return action => {
        const handler = handlers.find(_ => _.type === action.type)
        
        if (handler)
            return (handler.handle as any)(action.payload)

        return UNKNOWN_ACTION
    }
}

export type {
    Interpreter,
}

export {
    UNKNOWN_ACTION,
    interpreterFactory,
}