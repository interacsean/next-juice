import React, { Dispatch, useReducer } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { set, lensPath, view } from "ramda";
import usePartialCallback from "web/utils/hooks/usePartialCallback";
import targetValueOf from "web/utils/html/targetValueOf";
import { StrRecord } from "types/util/StrRecord";
import { rand } from "utils/data/rand/rand";

type EstimateFormPublicProps = {};

const _newId = () => rand(0, 1000000);

type Actions = {
  type: string;
} & StrRecord<any>;

type EstimateRecord = {
  name: string;
  sub: EstimateRecord[];
  effort: StrRecord<number>;
  id: string;
};

type EstimateState = EstimateRecord[];

const reducer = (state: EstimateState, action: Actions) => {
  console.log({ state, action });
  if (action.type === "add") {
    return set(
      lensPath(action.path || []),
      view(lensPath(action.path || []), state).concat([
        { id: _newId(), ...newRecord },
      ]),
      state,
    ) as EstimateState;
  } else if (action.type === "edit") {
    return set(
      lensPath(action.path || []),
      action.value,
      state,
    ) as EstimateState;
  }
  return state;
};

const newRecord = { name: "", sub: [], effort: {} };

type SubEstimateProps = {
  estimate: EstimateRecord;
  path: (string | number)[];
  dispatch: Dispatch<any>;
  id: string;
  orderId: number;
};

function EstimateRow(props: SubEstimateProps) {
  const addSub = React.useCallback(() => {
    props.dispatch({
      type: "add",
      path: [...props.path, props.orderId, "sub"],
    });
  }, [props.dispatch]);
  const updateValue = React.useCallback(
    (prop: string[], value: string) => {
      props.dispatch({
        type: "edit",
        path: [...props.path, props.orderId, ...prop],
        value,
      });
    },
    [props.dispatch],
  );
  const updateName = usePartialCallback(updateValue, [["name"]]);
  const updateEffort = React.useCallback(
    (val: string) => updateValue(["effort", "days"], val),
    [updateValue],
  );
  const addRow = React.useCallback(
    () =>
      props.dispatch({
        type: "add",
        path: [...props.path, props.orderId, "sub"],
      }),
    [props.dispatch],
  );

  return (
    <>
      <Box display="flex">
        <Input
          placeholder="description"
          value={props.estimate.name}
          onChange={targetValueOf(updateName)}
        />
        <Input
          placeholder="effort"
          value={props.estimate.effort.days}
          onChange={targetValueOf(updateEffort)}
        />
        <Box></Box>
        <Box display="flex" justifyContent="flex-end" flex="1">
          <Button onClick={addSub} variant="outline">
            +
          </Button>
        </Box>
      </Box>
      <Box pl={3}>
        {props.estimate.sub.map((est, k) => (
          <EstimateRow
            id={est.id}
            orderId={k}
            key={est.id}
            estimate={est}
            path={[...props.path, props.orderId, "sub"]}
            dispatch={props.dispatch}
          />
        ))}
        {!!props.estimate.sub.length && (
          <Button variant="outline" onClick={addRow}>
            +
          </Button>
        )}
      </Box>
    </>
  );
}

const EstimateForm: React.FC<EstimateFormPublicProps> = (
  _props: EstimateFormPublicProps,
) => {
  const [estimates, dispatch] = useReducer(reducer, []);

  const addRow = React.useCallback(
    () => dispatch({ type: "add", path: [] }),
    [dispatch],
  );

  return (
    <Box>
      {estimates.map((est, k) => (
        <EstimateRow
          key={est.id}
          id={est.id}
          orderId={k}
          estimate={est}
          path={[]}
          dispatch={dispatch}
        />
      ))}
      <Button variant="outline" onClick={addRow}>
        +
      </Button>
    </Box>
  );
};

export default EstimateForm;
