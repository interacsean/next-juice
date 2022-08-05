import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Text, Box } from '@chakra-ui/react';
import Section from '../../layouts/Section/Section';
import useAsyncData from 'web/utils/hooks/useAsyncData';
import axios from 'axios';
import Site from 'config/Site';
import handleApiResponse from 'web/services/api/handleApiResponse';

type EstimatesPublicProps = {};

const fetchSavedEstimates = () => handleApiResponse(
  axios.get(`${Site.API_BASE_URL}/estimates`)
);

const Estimates: NextPage<EstimatesPublicProps> = (
  _props: EstimatesPublicProps,
) => {
  const [savedEstimates, getEstimates] = useAsyncData(fetchSavedEstimates)
  useEffect(getEstimates, []);

  return (
    <Section>
      {
        savedEstimates.error && (
          <Box bgColor="panel.100">Error: {savedEstimates.error.toString()}</Box>
        )}
      <Text>Hello world</Text>
    </Section>
  );
};

export default Estimates;
