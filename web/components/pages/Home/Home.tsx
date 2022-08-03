import { NextPage } from 'next';
import React from 'react';
import { Text } from '@chakra-ui/react';
import Section from '../../layouts/Section/Section';

type HomePublicProps = {};

const Home: NextPage<HomePublicProps> = (
  _props: HomePublicProps,
) => {
  return (
    <Section>
      <Text>Hello world</Text>
    </Section>
  );
};

export default Home;
