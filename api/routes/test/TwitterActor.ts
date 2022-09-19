import { Action, ActorInterface } from 'model/Actor/Actor.types';
import { TwitterExperimentContext } from 'api/routes/test/test';

export type TwitterActorAttributes = {
  happiness: number;
  followers: number;
  likelihoodToPost: number; // percent as decimal
  politicalLeaning: [number, number]; // compass in decimal
};


export class TwitterActor implements ActorInterface<TwitterActorAttributes> {
  public attributes: TwitterActorAttributes;
  private context: TwitterExperimentContext;

  constructor(
    attributes: TwitterActorAttributes,
    context: TwitterExperimentContext
  ) {
    this.attributes = attributes;
    this.context = context;
  }

  onIterate(iterationNumber: number) {
    if (Math.random() < this.attributes.likelihoodToPost) {
      return [
        {
          actor: this,
          properties: {
            aggression: Math.random(),
            reach: Math.random() * this.attributes.followers,
          },
          iteration: iterationNumber,
        },
      ];
    }
  }

  listen(action: Action<any, TwitterActorAttributes>) {
    if (
      Math.random() * (1 + this.context.numActors) <
      action.properties.reach
    ) {
      this.attributes.happiness = this.attributes.happiness + 0.01;
    }
  }
}
