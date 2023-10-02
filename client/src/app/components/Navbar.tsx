import React from 'react'
import {
  Navbar as NavbarUi, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
  Avatar
} from "@nextui-org/react";
import Image from 'next/image';
import mangoLogo from "../assets/MangoLavandaLogo.png"
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';;

export default function Navbar() {
  const {userData, setUserData} = useUser();
  let loggedIn: boolean;
  if(userData && userData.isLoggedIn){
    loggedIn = userData.isLoggedIn;
  }else{
    loggedIn=false;
  }
  let name: string;
  if(userData && userData.name){
    name = userData.name;
  }else{
    name="";
  }
  const menuItems = [
    {
        name: "Sell",
        route: "/sell",
        requireLogin: true
      },
       {
        name: "Edit Items",
        route: "/edit",
        requireLogin: true
      },
       {
        name: "Statistics",
        route: "/statistics",
        requireLogin: true
      }
    ];
    const router = useRouter();

    const handleLogout = ()=>{
      router.push('/');
      setUserData({
        name: 'Name',
        email: 'email@example.com',
        isLoggedIn: false,
      })
    }

    let showLogin = (
        <NavbarContent justify="end">
          <NavbarItem key="login" className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem key="register">
            <Button as={Link} color="warning" href="/register" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      );

    if(loggedIn){
      showLogin= (
      <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar name={name} isBordered color="primary"></Avatar>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={["profile"]}>
              <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{name}</p>
            </DropdownItem>
            <DropdownItem key="settings" onPress={handleLogout}>LogOut</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )
    }

  return (
    <NavbarUi>
        <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle />
        </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
        <Image src={mangoLogo} alt='MyLogo' width={30} height={30}/>
          <p className="font-bold text-inherit ml-5">Mango Lavanda</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link 
            color='foreground'
            href='/'
            >
            <Image src={mangoLogo} alt='MyLogo' width={30} height={30}/>
            <p className="font-bold text-inherit ml-5">Mango Lavanda</p>
          </Link>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          (loggedIn === item.requireLogin? 
          <NavbarItem key={index}>
            <Link
              className="w-full"
              color="foreground"
              href={item.route}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarItem>
            :<React.Fragment key={index} />)
        ))}
      </NavbarContent>

      {showLogin}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full"
              href={item.route}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarUi>
  )
}

