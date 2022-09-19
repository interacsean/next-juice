# Petri-dish Model

Setting up a model

Principles
 - An actor can represent a group or an individual
 - An actor has attributes and values associated with each
   - e.g. Happiness, Tiredness, Location (lat-lng)
 - A definition of a set of actors 
 - An actor can take an action
 - That action can have an audience, a subset of actors.  Could be random, could be based on attribute
 - An action can affect audience-members' attributes
 - An actor can't respond in the same iteration
   - An action that would prompt a response would update an
     attribute, and the next iteration the actor would respond

ActorInterface<T>

EgSpecificActor<T> implements ActorInterface<T>

ActorSpawner<T> 
  createActor:() => ActorInterface<T>



An IterationManager would define the parameters of what will 
happen each iteration.  How many actors might act, or by what
equation would we determine that they would act

To consider:
- Should track full history
- Should be perfectly replicable with random seed(?)
- Ideally obviously parameter driven, not at code level (v2)
- Can actors be added to the set – i.e. ActorSet responds to actions?
- Might some scenarios want a picture of the global actorSet landscape - i.e. if 
  A certain percentage of actors have fn(x)

- After each iteration, IM can run a summary function that might be
 useful for actors to know