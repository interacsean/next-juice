import { NextPage } from 'next';
import React from 'react';
import Section from '../../layouts/Section/Section';
import useToggleState from 'web/utils/hooks/useToggleState';
import EstimatesList from 'web/components/pages/Estimates/EstimatesList';
import CreateEstimate from 'web/components/pages/Estimates/CreateEstimate';

type EstimatesPublicProps = {};

const Estimates: NextPage<EstimatesPublicProps> = (
  _props: EstimatesPublicProps,
) => {
  const { value: isCreating, enable: enterCreation, disable: existCreation } = useToggleState(true);

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
