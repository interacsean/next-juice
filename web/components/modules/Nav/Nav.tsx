/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Box } from "@chakra-ui/react";
import useMediaQuery from "../../../utils/hooks/useMediaQuery";
// import Icon from '../../_old/primitives/Icon';
// import MobileMenu from '../../_old/primitives/MobileMenu';
// import { useModalContext } from '../../_old/primitives/Modal/ModalProvider';
// import useModal from '../../_old/primitives/Modal/useModal';
// import css from './Nav.module.scss';
import ROUTE_PATHS from "../../../../consts/ROUTE_PATHS";
import NavLink from "./NavLink";

// todo: mobile menu

const Nav: FC<{}> = (props): ReactElement<"div"> => {
  const [openState, setOpenState] = useState(false);
  const closeMenu = useCallback(() => setOpenState(false), [setOpenState]);
  // const { setModalOpen } = useModal();
  const isMobileSize = useMediaQuery("tablet-down");

  useEffect(() => {
    // setModalOpen(openState);
    if (openState) {
      // @ts-ignore
      window?.scrollTo && window?.scrollTo(0, 0);
    }
  }, [openState]);

  // const { showModal } = useModalContext();
  // const onOpenUpdateAccountModal = useCallback(
  //   () => {
  //   },
  //   [showModal, closeMenu],
  // );

  return (
    // <MobileMenu
    //   menuClass={css.mobileMenu}
    //   overlayClass={css.mobileMenuOverlay}
    //   isExpanded={openState}
    //   onExpandedUpdated={setOpenState}
    // >
    <Box as="nav" display="flex" alignItems="flex-start">
      <NavLink href={ROUTE_PATHS.ROOT}>Home</NavLink>
      <NavLink href={ROUTE_PATHS.CONTACT}>Contact</NavLink>
      <NavLink href={ROUTE_PATHS.ESTIMATES}>Estimates</NavLink>
      {/* Add nav menu items here */}
    </Box>
    // </MobileMenu>
  );
};

export default Nav;
