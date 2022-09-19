import { Action, ActorInterface } from 'model/Actor/Actor.types';
import round from 'utils/data/round/round';

export function getActorSummary<T>(actor: ActorInterface<T>) {
  return (Object.entries(actor.attributes).map(
    ([name, value]) => `${name}: ${typeof value === 'number' ? round(value, 3) : value}`
  ).join(' | '));
}