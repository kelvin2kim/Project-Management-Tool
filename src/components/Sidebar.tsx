import Card from "./Card";
//import Image from "next/image";
//import logo from "../assets/images/logo.png";
import SidebarClient from "./SidebarClient";

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  {label: "Calendar",icon: "Calendar",link: "/calendar",},
  { label: "Profile", icon: "User", link: "/profile" },
  {label: "Settings",icon: "Settings",link: "/settings",},
];

export default function Sidebar () {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map((link) => (
        <SidebarClient link={link} />
      ))}
    </Card>
  );
};


/*
Put this right under <Card> if I want to use images or logos later
<div className="w-full flex justify-center items-center">
  <Image src={logo} alt="Able logo" priority className="w-14" />
  </div>

*/
