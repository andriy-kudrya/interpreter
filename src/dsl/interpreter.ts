import type { Action } from './action'

const UNKNOWN_ACTION = Symbol('unknown action')
type UNKNOWN_ACTION = typeof UNKNOWN_ACTION

type Interpreter = <Payload, Result>(action: Action<Payload, Result>) => Result | Promise<Result> | UNKNOWN_ACTION

export type {
    Interpreter,
}

export {
    UNKNOWN_ACTION,
}