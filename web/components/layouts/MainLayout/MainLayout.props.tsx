import { ComponentWithChildren } from "../../../../types/util/ComponentWithChildren";

export interface MainLayoutPublicProps extends ComponentWithChildren {
  hideHero?: boolean;
}

export interface MainLayoutProps extends MainLayoutPublicProps {}
