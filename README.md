# General note
It is an experimental code. 


# What it is all about
Here investigated an alternative approach to the dependency injection to keep code decoupled.
The basic idea we split the source into two parts: high-level logic that relies on low-level details but doesn't interact with them directly.
Instead, high-level logic emits a sequence of actions that are handled by an interpreter. Those actions are described by plain objects.
