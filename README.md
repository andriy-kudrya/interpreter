# General note
It is an experimental code. 


# What it is all about
Here investigated an alternative approach to the dependency injection to keep code decoupled.
The basic idea we split the source into two parts: high-level logic that relies on low-level details but doesn't interact with them directly.
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
