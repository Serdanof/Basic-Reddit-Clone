import HomeIcon from "@/components/icons/HomeIcon";
import MyPostsIcon from "@/components/icons/MyPostsIcon";
import LoginIcon from "@/components/icons/LoginIcon";
import type { SidebarItem } from "@/utils/interface";

export const authorizedUserSidebar: SidebarItem[] = [
  {
    id: 1,
    name: "Home",
    href: "/",
    icon: HomeIcon
  },
  {
    id: 2,
    name: "My posts",
    href: "/myposts",
    icon: MyPostsIcon
  },
];

export const unauthorizedUserSidebar: SidebarItem[] = [
  {
    id: 1,
    name: "Home",
    href: "/",
    icon: HomeIcon
  },
  {
    id: 2,
    name: "Log In",
    href: "/user/signin",
    icon: LoginIcon
  },
];