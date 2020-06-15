// borrowed 'action' name from redux core model

interface ActionType<Payload, Result> extends String {
    // not used at runtime
    // just preserves generic parameter for the sake of type inference
    functionType?: (payload: Payload) => Result
}

// type ActionFunction<Payload, Result> = Required<ActionType<Payload, Result>>['functionType']

interface WithType<Payload, Result> {
    type: ActionType<Payload, Result>
}

interface Action<Payload, Result> extends WithType <Payload, Result> {
    payload: Payload
}

type ActionCreator<Args extends any[], Payload, Result> = ((...args: Args) => Action<Payload, Result>) & WithType<Payload, Result>

function action<Payload extends void, Result>(type: string): ActionCreator<[], Payload, Result>
function action<Payload, Result>(type: string): ActionCreator<[Payload], Payload, Result>
function action<Payload, Result>(type: string): ActionCreator<[Payload], Payload, Result> {
    function actionCreator(payload: Payload) {
        return { type, payload } 
    }

    actionCreator.type = type

    return actionCreator
}

function actionOfType<Payload, Result>(action: Action<any, any>, withType: WithType<Payload, Result>): action is Action<Payload, Result> {
    return action.type === withType.type
}

function* emit<Payload, Result>(action: Action<Payload, Result>): Generator<Action<Payload, Result>, Result, Result> {
    const result = yield action
    return result!
}

function* emitAsync<Payload, Result>(action: Action<Payload, Result>): Generator<Action<Payload, Result>, [Result], Result> {
    const result = yield action
        , asyncResult: [Result] = [result!]

    return asyncResult
}

export {
    Action,
    WithType,
    action,
    actionOfType,
    emit,
    emitAsync,
}