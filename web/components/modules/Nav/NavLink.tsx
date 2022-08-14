import { useRouter } from "next/router";
import React, { ComponentProps } from "react";
import Link from "next/link";
import appTheme from "../../../theme/appTheme";
import chakraTheme from "../../../theme/chakraTheme";

const useIsActive = (testPath: string): boolean =>
  testPath.length <= 2
    ? testPath === useRouter()?.pathname
    : useRouter()?.pathname.startsWith(testPath);

const paddingH = chakraTheme.space[appTheme.nav?.px];
const paddingV = chakraTheme.space[appTheme.nav?.py];

// todo: styled to do hover effects as per appTheme

const NavLink = ({
  children,
  ...props
}: ComponentProps<typeof Link> & { href: string }) => {
  const isActive = useIsActive(props.href);

  return (
    <Link {...props}>
      <a
        style={{
          color:
            (isActive && appTheme.nav.activeItemColor) ||
            appTheme.nav.itemColor,
          padding: `${paddingV} ${paddingH}`,
        }}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
