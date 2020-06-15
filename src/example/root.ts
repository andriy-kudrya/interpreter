import { interpreterFactory } from '../dsl/interpreter'
import { run } from '../dsl/program'
import buildHandlers from './handlers'
import { formatUser } from './program'

const handlers = buildHandlers()
    , interpreter = interpreterFactory(handlers)

run(formatUser('paul id'), interpreter).then(_ => console.log(_))