import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import {
  Avatar,
  Box,
  Collapse,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { RiUserLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import CustomButton from "./CustomButton";
import { useFirebase } from "../context/Firebase";
import { db } from "../context/Firebase";
import { onValue, ref } from "firebase/database";

export default function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const isSignedIn = useFirebase().isSignedIn;
  const signOut = useFirebase().signOutUser;
  const [userDetails, setUserDetails] = useState();
  const user = useFirebase().user;

  useEffect(() => {
    onValue(ref(db, `users/${user?.uid}`), (snapshot) => {
      setUserDetails(snapshot.val());
    });
  }, [user]);

  return (
    <>
      <Box borderBottom={"1.5px solid #658C4A"}>
        <HStack justifyContent={"space-between"} py={4} px={[5, 10]}>
          <Link to={"/"}>
            <Image src={logo} w={"5rem"} cursor={"pointer"} />
          </Link>
          <InputGroup maxW={"container.sm"} display={["none", "inline-flex"]}>
            <InputLeftElement pointerEvents="none">
              <IoSearch color="gray" size={"1.5rem"} />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search here..."
              borderRadius={"5rem"}
              borderColor={"gray.400"}
              focusBorderColor="gray.400"
            />
          </InputGroup>
          <HStack gap={5}>
            {isSignedIn ? (
              <>
                <Menu>
                  <MenuButton>
                    <Avatar
                      src={userDetails?.photoURL}
                      name={userDetails?.name}
                      bgColor={"white"}
                      border={"1.5px solid gray"}
                      size={"sm"}
                      icon={
                        <RiUserLine
                          size={"1rem"}
                          color="gray"
                          cursor={"pointer"}
                        />
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <Link to={`/profile/${user.uid}`}>
                      <MenuItem textTransform={"capitalize"}>
                        <FaRegUserCircle color="#658c4a" /> &nbsp;
                        {userDetails?.name}
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={() => {
                        signOut();
                        navigate("/");
                      }}
                      color={"red"}
                    >
                      <MdLogout /> &nbsp;Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>
                <BsHandbag size={"1.5rem"} color="gray" cursor={"pointer"} />
              </>
            ) : (
              <Link to={"/login"}>
                <CustomButton text="Login" />
              </Link>
            )}
          </HStack>
        </HStack>

        <HStack
          display={["none", "flex"]}
          fontFamily={"'Inter', sans-serif"}
          justifyContent={"center"}
          gap={20}
          py={5}
          fontWeight={600}
        >
          <NavHashLink smooth={true} to="/#new">
            <Text cursor={"pointer"}>NEW!</Text>
          </NavHashLink>
          <Link to={"/products/category/electronics"}>
            <Text cursor={"pointer"}>Electronics</Text>
          </Link>
          <Link to={"/products/category/jewelery"}>
            <Text cursor={"pointer"}>Jewelery</Text>
          </Link>
          <Link to={"/products/category/men's clothing"}>
            <Text cursor={"pointer"}>Men's Clothing</Text>
          </Link>
          <Link to={"/products/category/women's clothing"}>
            <Text cursor={"pointer"}>Women's Clothing</Text>
          </Link>
        </HStack>

        <HStack display={["flex", "none"]} p={5} gap={5}>
          <InputGroup maxW={"container.xs"}>
            <InputLeftElement pointerEvents="none">
              <IoSearch color="gray" size={"1.5rem"} />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search here..."
              borderRadius={"5rem"}
              borderColor={"gray.400"}
              focusBorderColor="gray.400"
            />
          </InputGroup>
          {isOpen ? (
            <RiCloseLine size={"2rem"} onClick={onToggle} />
          ) : (
            <RiMenuLine size={"2rem"} onClick={onToggle} />
          )}
        </HStack>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <VStack
          fontFamily={"'Inter', sans-serif"}
          fontWeight={600}
          alignItems={"flex-start"}
          p={5}
          gap={5}
        >
          <NavHashLink smooth={true} to="/#new">
            <Text cursor={"pointer"}>NEW!</Text>
          </NavHashLink>
          <Link to={"/products/category/electronics"}>
            <Text cursor={"pointer"}>Electronics</Text>
          </Link>
          <Link to={"/products/category/jewelery"}>
            <Text cursor={"pointer"}>Jewelery</Text>
          </Link>
          <Link to={"/products/category/men's clothing"}>
            <Text cursor={"pointer"}>Men's Clothing</Text>
          </Link>
          <Link to={"/products/category/women's clothing"}>
            <Text cursor={"pointer"}>Women's Clothing</Text>
          </Link>
        </VStack>
      </Collapse>
    </>
  );
}
