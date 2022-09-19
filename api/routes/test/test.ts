import { NextApiRequest, NextApiResponse } from 'next';
import { Action, ActorSet } from 'model/Actor/Actor.types';
import { rand } from 'utils/data/rand/rand';
import emptyArray from 'utils/data/emptyArray/emptyArray';
import { Actor, getActorSummary } from 'model/Actor/Actor';
import runIterations from 'model/IterationManager/IterationManger';
// import { GetHealthResponseData } from "types/api/health/health.types";

type RequestParams = {
  numActors: number;
  iterations: number;
};

type ActorAttributes = {
  happiness: number;
  followers: number;
  likelihoodToPost: number; // percent as decimal
  politicalLeaning: [number, number]; // compass in decimal
};

type ActionAttrs = {
  aggression: number; // percent as decmial
  reach: number;
};

export default function test(_req: NextApiRequest, res: NextApiResponse) {
  const reqParams: RequestParams = {
    numActors: 10000,
    iterations: 100,
  };
  const experimentParams = reqParams;

  function actionResponse(
    action: Action<ActionAttrs, ActorAttributes>,
    actor: Actor<ActorAttributes>,
  ) {
    if (
      Math.random() * (1 + experimentParams.numActors) <
      action.properties.reach
    ) {
      actor.attributes.happiness = actor.attributes.happiness + 0.01;
    }
  }

  function iterationBehavior(
    iterationNumber: number,
    actor: Actor<ActorAttributes>,
  ) {
    if (Math.random() < actor.attributes.likelihoodToPost) {
      return [
        {
          actor,
          properties: {
            aggression: Math.random(),
            reach: Math.random() * actor.attributes.followers, // rand(0, actor.attributes.followers)
          },
          iteration: iterationNumber,
        },
      ];
    }
  }

  const actorSet: ActorSet<ActorAttributes> = emptyArray(
    experimentParams.numActors,
  ).map(
    () =>
      new Actor(
        {
          happiness: Math.random(),
          likelihoodToPost: Math.random() * 0.1,
          politicalLeaning: [rand(1, 999), rand(1, 999)],
          followers: rand(0, 100),
        },
        iterationBehavior,
        actionResponse,
      ),
  );

  const preSummary = actorSet.map(getActorSummary);
  const preTime = Date.now();
  const { numIterationsCompleted, totalTicks } = runIterations(
    experimentParams.iterations,
    actorSet,
    3000,
  );
  const postTime = Date.now();
  const postSummary = actorSet.map(getActorSummary);

  const response: any = {
    runTime: postTime - preTime,
    numIterationsCompleted,
    totalTicks,
    // preSummary,
    // postSummary,
  };
  res.send(response);
}
