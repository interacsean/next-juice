import React from "react";
import { Box } from "@chakra-ui/react";
import { EstimateConfig } from "web/components/modules/EstimateForm/estimates.types";

type EstimateHeaderPublicProps = {
  config: EstimateConfig;
};

const EstimateHeader: React.FC<EstimateHeaderPublicProps> = (
  _props: EstimateHeaderPublicProps,
) => {
  return <Box></Box>;
};

export { EstimateHeader };
