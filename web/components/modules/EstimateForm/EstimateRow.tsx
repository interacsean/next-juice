import { EstimateRecord } from "web/components/modules/EstimateForm/estimates.types";
import React, { Dispatch } from "react";
import usePartialCallback from "web/utils/hooks/usePartialCallback";
import { Box, Button, Input } from "@chakra-ui/react";
import targetValueOf from "web/utils/html/targetValueOf";

type SubEstimateProps = {
  estimate: EstimateRecord;
  path: (string | number)[];
  dispatch: Dispatch<any>;
  id: string;
  orderId: number;
  effortConfig: EffortConfig;
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

export { EstimateRow };
