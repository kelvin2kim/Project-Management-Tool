'use client';

import Link from "next/link";
import {Settings, User, Grid, Calendar} from "react-feather";
//usePathName is a react hook and only works on client side!
import {usePathname} from "next/navigation";
import clsx from "clsx";

//icons is an object consisting of the components: Settings, User, Grid, Calendar, etc
const icons = {Settings, User, Grid, Calendar}

export default function SideBarClient({link}) {
	const pathName = usePathname()
	let isActive = false;
	 if(pathName === link.link) {
	 	isActive = true;
	 }

	 //Icon is a component, that is why it is capitalized
	 const Icon = icons[link.icon]
	 return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );

}
