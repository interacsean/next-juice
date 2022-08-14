import { NextPage } from "next";
import React from "react";
import { Button, Text } from "@chakra-ui/react";
import axios from "axios";
import Section from "../../layouts/Section/Section";
import Site from "config/Site";
import handleApiResponse from "web/services/api/handleApiResponse";
import useApiEndpoint from "web/services/api/useApiEndpoint";

const getHealth = () =>
  handleApiResponse(axios.get(`${Site.API_BASE_URL}/health`));

const Home: NextPage = () => {
  const [{ value, error, message, status }, callGetHealth] =
    useApiEndpoint("health");

  return (
    <Section>
      <Text my={2}>Hello world</Text>
      <Button onClick={callGetHealth} my={2}>
        Make async call
      </Button>
      {value && <Text my={2}>Health ok</Text>}
    </Section>
  );
};

export default Home;
