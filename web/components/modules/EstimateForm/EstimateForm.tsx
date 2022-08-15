import React, { useReducer } from "react";
import { Box, Button } from "@chakra-ui/react";
import { estimateReducer, initialState } from "./estimateReducer";
import { EstimateRow } from "./EstimateRow";
import { EstimateHeader } from "web/components/modules/EstimateForm/EstimateHeader";

type EstimateFormPublicProps = {};

const EstimateForm: React.FC<EstimateFormPublicProps> = (
  _props: EstimateFormPublicProps,
) => {
  const [estimateState, dispatch] = useReducer(estimateReducer, initialState);
  const addRow = React.useCallback(
    () => dispatch({ type: "add", path: [] }),
    [dispatch],
  );

  return (
    <Box>
      <EstimateHeader config={estimateState.config} />
      {estimateState.estimates.map((est, k) => (
        <EstimateRow
          key={est.id}
          id={est.id}
          orderId={k}
          estimate={est}
          path={[]}
          dispatch={dispatch}
          effortConfig={estimateState.config}
        />
      ))}
      <Button variant="outline" onClick={addRow}>
        +
      </Button>
    </Box>
  );
};

export { EstimateForm };
