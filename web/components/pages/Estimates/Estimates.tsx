import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Text, Box } from '@chakra-ui/react';
import Section from '../../layouts/Section/Section';
import useAsyncData from 'web/utils/hooks/useAsyncData';
import axios from 'axios';
import Site from 'config/Site';
import handleApiResponse from 'web/services/api/handleApiResponse';
import { Button } from '@chakra-ui/react';
import useToggleState from 'web/utils/hooks/useToggleState';
import EstimatesList from 'web/components/pages/Estimates/EstimatesList';
import CreateEstimate from 'web/components/pages/Estimates/CreateEstimate';

type EstimatesPublicProps = {};

const Estimates: NextPage<EstimatesPublicProps> = (
  _props: EstimatesPublicProps,
) => {
  const { value: isCreating, enable: enterCreation, disable: existCreation } = useToggleState();

  return (
    <Section>
      {isCreating
        ? <CreateEstimate />
        : <EstimatesList onAddClick={enterCreation} />
      }
    </Section>
  );
};

export default Estimates;
