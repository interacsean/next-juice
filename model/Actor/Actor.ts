import { Action, ActorInterface } from 'model/Actor/Actor.types';
import round from 'utils/data/round/round';

export class Actor<T> implements ActorInterface<T> {
  public attributes: T;
  private iterationBehavior;
  private actionResponse;

  constructor(
    attributes: T,
    iterationBehavior: (
      iterationNumber: number,
      actor: Actor<T>,
    ) => Action<any, T>[] | undefined,
    actionResponse: (
      action: Action<any, T>,
      actor: Actor<T>,
    ) => void,
  ) {
    this.attributes = attributes;
    this.iterationBehavior = iterationBehavior;
    this.actionResponse = actionResponse;
  }

  onIterate(iterationNumber: number) {
    return this.iterationBehavior(
      iterationNumber,
      this,
    );
  }

  listen(action: Action<any, T>) {
    this.actionResponse(
      action,
      this,
    );
  }
}

export function getActorSummary<T>(actor: Actor<T>) {
  return (Object.entries(actor.attributes).map(
    ([name, value]) => `${name}: ${typeof value === 'number' ? round(value, 3) : value}`
  ).join(' | '));
}