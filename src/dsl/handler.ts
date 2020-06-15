import type * as a from './action'

type Handle<Payload, Result> = (payload: Payload) => Result

interface Handler<Payload, Result> extends a.WithType<Payload, Result> {
    handle: Handle<Payload, Result>
}

function handler<Payload, Result>(withType: a.WithType<Payload, Result>, handle: Handle<Payload, Result>) {
    return {
        type: withType.type,
        handle,
    }
}

export type {
    Handler,
}

export {
    handler,
}