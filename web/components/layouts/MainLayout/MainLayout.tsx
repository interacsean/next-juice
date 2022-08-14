import React, { FC } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import Nav from "../../modules/Nav";
import { MainLayoutProps } from "./MainLayout.props";
import routes from "../../../../consts/ROUTE_PATHS";
import Footer from "../../modules/Footer";
import appTheme from "../../../theme/appTheme";
import Section from "../Section";
import { ComponentWithChildren } from "../../../../types/util/ComponentWithChildren";

const SectionHeader = ({ children }: ComponentWithChildren) => (
  <Section
    as="header"
    position="relative"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    bgColor={appTheme.header.backgroundColor}
    height={{ base: appTheme.header.heightMobile }}
    noVPad
  >
    {children}
  </Section>
);

const SectionFooterCtnr = ({ children }: ComponentWithChildren) => (
  <Section
    flex="1 0 auto"
    py={appTheme.footer?.vPadding}
    bgColor={appTheme.footer?.backgroundColor}
    as="footer"
  >
    {children}
  </Section>
);

const MainLayout: FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const router = useRouter();

  // const { heroImage } = Theme;

  return (
    <Box display="flex" flexDir="column" alignItems="stretch" minHeight="100vh">
      <SectionHeader>
        <Box onClick={() => router.push(routes.ROOT)}>{/*<Logo />*/}</Box>
        <Nav />
      </SectionHeader>
      <Box as={"main"} flexDir="column" alignItems="stretch">
        {props.children}
      </Box>
      <SectionFooterCtnr>
        <Footer />
      </SectionFooterCtnr>
    </Box>
  );
};

export default MainLayout;
