# General note
It is an experimental code. 


# What it is all about
Here investigated an alternative approach to the dependency injection to keep code decoupled.
The basic idea is splitting of the source into two parts: high-level logic that relies on low-level details but doesn't interact with them directly.
Instead, high-level logic emits a sequence of actions that are handled by an interpreter. Those actions are described by plain objects.
E.g. let look into example in this repo. While types might look intimidating at first glance, but what realy those actions are:
```js
{
    type: 'getUser',
    // payload here is a parameter for 'getUser' action
    payload: 'some unique id',
}

{
    type: 'validateUser',
    payload: userObject,
}

{
    type: 'getCity',
    payload: 'uniqe id',
}
```
So high-level logic is responsible to emit a sequence of those actions, that may or may not end. And there is an interpreter that executes that logic, receiving action by action. For each action received interpreter runs appropriate handler for that action, gets result from this handler, injects it back to high-level logic and continues it's execution till next emited action or program end.

## How to work with actions
There are handy utilities and types that provide convenient means of dealing with actions and also are responsible for action related type inference, so the code is type safe in context of typescript. Each action has a type:
```ts
interface ActionType<Payload, Result> { ... }
```
_Payload_ is a parameter for action (e.g. user id) and _Result_ describes an object that will be returned when this action is interpreted

It is quite cumbersome to create those action using literals so there is a handy utility that makes action creator, which in turn creates action
```ts
// a.action is utility that creates action creator :)
// getUser is action creator
const getUser = a.action<string, Promise<User>>('getUser')

// and here is action
// which in runtime is just plain object { type: 'getUser', payload: 'user id' }
const action = getUser('user id')
```
## How to interpret actions
We declare action handlers, with handler utility they are type safe as well. Utility infers type from ActionType that is mentioned earlier and was "attached" to action creator (at least typescript is made to think so)
```ts
const handlers: Handler<any, any>[] = [
    handler(a.getUser, id => ajax('users', id)),
    handler(a.validateUser, user => validateUser(user)),
    handler(a.getCity, id => ajax('cities', id)),
]
```
## How to write program
JS generators fits there perfectly
```ts
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
```
Notice _emit_ thing. It is not so required in javascript we can just _yield a.getUser(userId)_ directly (but promise will be received). In typescript though there is no way to infer yield resul so _emit_ is a helper generator that facilitates type inference.

## How to glue everything together
Here are ready to use utilities _run_ and _interpreterFactory_. Nothing above is concerned with them
```ts
const interpreter = interpreterFactory(handlers)

run(formatUser('paul id'), interpreter).then(_ => console.log(_))
```

### Conclusion
Seems it is quite easy to use interpreter pattern for decoupling purposes either in modern javascript or typescript. Somehow it reminds me middlewares in redux but without injected _dispatch_ function.

### Inspiration sources
https://fsharpforfunandprofit.com/posts/13-ways-of-looking-at-a-turtle-2/#way13
https://www.tweag.io/blog/2018-02-05-free-monads/
https://softwareengineering.stackexchange.com/questions/242795/what-is-the-free-monad-interpreter-pattern
