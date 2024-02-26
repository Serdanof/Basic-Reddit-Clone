"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { UserButton, useClerk } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BackIcon from "@/components/icons/BackIcon";
import SidebarIcon from "@/components/icons/SidebarIcon";

import { authorizedUserSidebar, unauthorizedUserSidebar } from "@/utils/config";
import type { SidebarItem } from "@/utils/interface";

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useClerk();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebarOpen = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <React.Fragment>
      <Button
        className="fixed left-4 top-4 h-12 w-12 rounded-full text-white lg:hidden"
        onClick={toggleSidebarOpen}
      >
        <SidebarIcon color="white" />
      </Button>

      <div
        className={`fixed top-0 flex flex-col justify-between ${isSidebarOpen ? "left-0" : "-left-64"} lg:left-0 w-60 xl:w-80 h-full shadow-xl lg:shadow-none bg-white p-4 transition-all duration-300 z-10`}
      >
        <div className="flex flex-col">
          <button className="flex items-center p-2 pb-4 lg:hidden" onClick={toggleSidebarOpen}>
            <BackIcon color="black" />
            <p className="ml-2">Close</p>
          </button>

          {
            user ?
              authorizedUserSidebar.map((item: SidebarItem) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`my-1 flex w-full items-center rounded-xl p-3 hover:bg-secondary [&>p]:hover:text-primary [&_path]:hover:stroke-primary ${pathname === item.href && "bg-secondary text-primary [&_path]:stroke-primary"}`}
                >
                  {React.createElement(item.icon, { color: "black" })}
                  <p className="ml-3">{item.name}</p>
                </Link>
              )) :
              unauthorizedUserSidebar.map((item: SidebarItem) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`my-1 flex w-full items-center rounded-xl p-3 hover:bg-secondary [&>p]:hover:text-primary [&_path]:hover:stroke-primary ${pathname === item.href && "bg-secondary text-primary [&_path]:stroke-primary"}`}
                >
                  {React.createElement(item.icon, { color: "black" })}
                  <p className="ml-3">{item.name}</p>
                </Link>
              ))
          }
        </div>

        {user && (
          <div className="flex items-center p-2">
            <UserButton afterSignOutUrl="/" />
            <h1 className="ml-3">
              {user.firstName} {user.lastName}
            </h1>
          </div>
        )}

        <Separator orientation="vertical" className="absolute right-0 top-0 h-screen" />
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
