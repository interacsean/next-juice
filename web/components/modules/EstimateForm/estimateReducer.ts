import { StrRecord } from "types/util/StrRecord";
import { lensPath, set, view } from "ramda";
import { rand } from "utils/data/rand/rand";
import { EffortType, EstimateState } from "./estimates.types";

type Actions = {
  type: string;
} & StrRecord<any>;

const newRecord = { name: "", sub: [], values: {} };

const _newId = () => rand(0, 1000000);

const estimateReducer = (state: EstimateState, action: Actions) => {
  console.log({ state, action });
  if (action.type === "add") {
    return set(
      lensPath(["estimates", ...(action.path || [])]),
      view(lensPath(["estimates", ...(action.path || [])]), state).concat([
        { id: _newId(), ...newRecord },
      ]),
      state,
    ) as EstimateState;
  } else if (action.type === "edit") {
    return set(
      lensPath(["estimates", ...(action.path || [])]),
      action.value,
      state,
    ) as EstimateState;
  }
  return state;
};

const initialState: EstimateState = {
  estimates: [],
  config: {
    columns: [
      {
        name: "Effort",
        type: EffortType.QUANTITY,
      },
    ],
  },
};

export { estimateReducer, initialState };
