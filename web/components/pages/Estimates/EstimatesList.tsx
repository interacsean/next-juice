import React from "react";
import { Box, Button } from "@chakra-ui/react";
import useApiEndpoint from "web/services/api/useApiEndpoint";
import handleApiResponse from "web/services/api/handleApiResponse";
import axios from "axios";
import Site from "config/Site";

type EstimatesListPublicProps = {
  onAddClick: () => void;
};

const fetchSavedEstimates = () =>
  handleApiResponse(axios.get(`${Site.API_BASE_URL}/estimates`));

const EstimatesList: React.FC<EstimatesListPublicProps> = (
  props: EstimatesListPublicProps,
) => {
  const [savedEstimates, getEstimates] = useApiEndpoint("estimates");
  React.useEffect(getEstimates, []);

  return (
    <Box>
      <Button onClick={props.onAddClick}>Add estimate</Button>
    </Box>
  );
};

export default EstimatesList;
