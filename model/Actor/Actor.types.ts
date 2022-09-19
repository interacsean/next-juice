
export interface ActorInterface<T extends {[k: string]: any}> {
  attributes: T,
  // Consider https://blog.logrocket.com/writing-constructor-typescript/
  // constructor: (
  //   attributes: T,
  //   iterationHandler: (iterationNumber: number, actorAttributes: T) => Action<any> | undefined,
  //   listenHandler: (
  //     iterationNumber: number,
  //     action: Action<any>,
  //     attributeSetter: <K extends keyof T>(attr: K, val: T[K]) => void,
  //   ) => void,
  // ) => void;
  onIterate: (iterationNumber: number) => Action<any, T>[] | undefined;
  // todo: Action might be from different type of actor?
  listen: (action: Action<any, T>) => void;
}

export interface Action<T, U> {
  properties: T;
  actor: ActorInterface<U>;
  iteration: number;
}

export type ActorSet<T> = ActorInterface<T>[];

export interface Experiment<T> {
  actorAttributes: T;
  actorAttribute
}