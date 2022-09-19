import { ActorSet } from "model/Actor/Actor.types";

const DO_LOGGING = true;

function log(...toLog: any[]) {
  DO_LOGGING && console.log(...toLog);
}

function runIterations(
  iterations: number,
  actorSet: ActorSet<any>,
  timeLimitMs: number = 0,
) {
  const deadlineTime = Date.now() + timeLimitMs;
  let i;
  let totalTicks = 0;

  for (
    i = 0;
    i < iterations && (!timeLimitMs || Date.now() < deadlineTime);
    i++
  ) {
    log(`i: ${i}`);
    const iterationActions = [];
    for (let j = 0; j < actorSet.length; j++) {
      const actions = actorSet[j].onIterate(i);
      if (actions?.length > 0) {
        iterationActions.push(...actions);
      }
    }
    log(` - ${iterationActions.length} actions`)
    for (let j = 0; j < actorSet.length; j++) {
      for (let k = 0; k < iterationActions.length; k++) {
        totalTicks++;
        actorSet[j].listen(iterationActions[k]);
      }
    }
  }
  return {
    totalTicks,
    numIterationsCompleted: i
  }
}

export default runIterations;
