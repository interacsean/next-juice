import React, { Dispatch } from "react";
import { Box, Button, Input, HStack } from "@chakra-ui/react";
import usePartialCallback from "web/utils/hooks/usePartialCallback";
import targetValueOf from "web/utils/html/targetValueOf";
import { EstimateConfig, EstimateRecord } from "./estimates.types";

type SubEstimateProps = {
  estimate: EstimateRecord;
  path: (string | number)[];
  dispatch: Dispatch<any>;
  id: string;
  orderId: number;
  effortConfig: EstimateConfig;
};

function EstimateRow(props: SubEstimateProps) {
  const addSub = React.useCallback(() => {
    props.dispatch({
      type: "indent",
      path: [...props.path, props.orderId],
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
    (effortColName: string) => (val: string) =>
      updateValue(["values", effortColName], val),
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
      <HStack>
        <Button onClick={addSub} variant="ghost" size="sm" minWidth="2.5rem">
          &#8594;
        </Button>
        <Input
          placeholder="Description"
          value={props.estimate.name || ""}
          onChange={targetValueOf(updateName)}
          flexGrow="1"
        />
        {props.effortConfig.columns.map((col, i) => (
          <Input
            key={`${col.name}-${i}`}
            placeholder={col.name}
            value={props.estimate.values[col.name] || ""}
            onChange={targetValueOf(updateEffort(col.name))}
            width={"6em"}
          />
        ))}
        {/* <Box display="flex" justifyContent="flex-end" flex="1">
          <Button onClick={addSub} variant="outline">
            +
          </Button>
        </Box> */}
      </HStack>
      <Box pl={5}>
        {props.estimate.sub.map((est, k) => (
          <EstimateRow
            id={est.id}
            orderId={k}
            key={est.id}
            estimate={est}
            path={[...props.path, props.orderId, "sub"]}
            dispatch={props.dispatch}
            effortConfig={props.effortConfig}
          />
        ))}
        {!!props.estimate.sub.length && (  
          <Button variant="ghost" size="sm" onClick={addRow}>
            + Add item
          </Button>
        )}
      </Box>
    </>
  );
}

export { EstimateRow };
