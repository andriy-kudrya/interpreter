import type { Action } from './action'
import { Interpreter, UNKNOWN_ACTION } from './interpreter'

type InterpreterResult = ['value', any] | ['error', any]
type Program<Return> = AsyncGenerator<Action<any, any>, Return, any>

async function run<Return = any>(program: Program<Return>, interpreter: Interpreter): Promise<Return> {
    let programResult = await program.next()
    let unknownAction = false

    while (!programResult.done) {
        const action = programResult.value

        let interpreterResult: InterpreterResult
        try {
            // do not attempt to unwrap interpreter result
            interpreterResult = ['value', interpreter(action)]
        }
        catch (error) {
            interpreterResult = ['error', error]
        }

        if (interpreterResult[0] === 'value') {
            const value = interpreterResult[1]
            
            if (value === UNKNOWN_ACTION)
                throw new Error(`unknown action "${programResult.value.type}"`)

            programResult = await program.next(value)
        }
        else {
            const error = interpreterResult[1]
            programResult = await program.throw(error)
        }            
    }

    if (unknownAction)
        throw new Error(`unknown action "${(programResult.value as any).type}"`)

    return programResult.value
}

export type {
    Program,
}

export {
    run,
}