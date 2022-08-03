import { NextPage } from 'next';
import React from 'react';
import { Text as T } from '@chakra-ui/react';
import Section from '../../layouts/Section/Section';
import Site from 'config/Site';

type HomePublicProps = {};

const Home: NextPage<HomePublicProps> = (
  _props: HomePublicProps,
) => {
  return (
    <Section>
      <T>Hello world</T>
    </Section>
  );
};

export default Home;
