import React from 'react';
import { Box, BoxProps, Container } from '@chakra-ui/react';
import appTheme from '../../../theme/appTheme';

interface Props extends BoxProps {
  noVPad?: boolean;
  alt?: boolean; // todo
};

const Section = ({ noVPad, children, ...boxProps }: Props) => {
  return (
    <Box
      py={noVPad ? undefined : appTheme.section?.vPadding} {...boxProps}
    >
      <Container>
        { children }
      </Container>
    </Box>
  );
};

export default Section;
