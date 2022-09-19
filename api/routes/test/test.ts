import { NextApiRequest, NextApiResponse } from 'next';
import { Action, ActorSet } from 'model/Actor/Actor.types';
import { rand } from 'utils/data/rand/rand';
import emptyArray from 'utils/data/emptyArray/emptyArray';
import { getActorSummary } from 'model/Actor/Actor';
import runIterations from 'model/IterationManager/IterationManger';
import { TwitterActor, TwitterActorAttributes } from 'api/routes/test/TwitterActor';
// import { GetHealthResponseData } from "types/api/health/health.types";

type RequestParams = {
  numActors: number;
  iterations: number;
};

type ActionAttrs = {
  aggression: number; // percent as decmial
  reach: number;
};

export type TwitterExperimentContext = {
  numActors
};
export default function test(_req: NextApiRequest, res: NextApiResponse) {
  const reqParams: RequestParams = {
    numActors: 10000,
    iterations: 100,
  };
  const experimentParams = reqParams;

  const actorSet: ActorSet<TwitterActorAttributes> = emptyArray(
    experimentParams.numActors,
  ).map(
    () =>
      new TwitterActor(
        {
          happiness: Math.random(),
          likelihoodToPost: Math.random() * 0.1,
          politicalLeaning: [Math.random(), Math.random()],
          followers: Math.random() * 1000,
        },
        {
          numActors: experimentParams.numActors
        },
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
