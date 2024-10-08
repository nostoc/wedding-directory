"use client";

import { usePathname } from "next/navigation";
import GeneralHeader from "./GeneralHeader";
import DashBoardHeader from "./DashBoardHeader";

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/visitor-dashboard")) {
    return <DashBoardHeader />;
  } else return <GeneralHeader />;
};

export default Header;
