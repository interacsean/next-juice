import React, { FC } from "react";
import { Text, VStack } from "@chakra-ui/react";

type FooterProps = {};

const Footer: FC<FooterProps> = (props: FooterProps) => {
  return (
    <VStack>
      <Text mt={1} color="light.100">
        &copy; Juicer
      </Text>
    </VStack>
  );
};

export default Footer;
