import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import "./headerAdmin.css";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import {
  Flex,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "@chakra-ui/react";

function HeaderAdmin() {
  const navigate = useNavigate();
  const closeSesion = () => {
    sessionStorage.removeItem("token");
    navigate("/pageLogin");
  };
  const [Open, setOpen] = useState(false);

  return (
    <Flex
      minWidth="max-content"
      justifyContent="space-between"
      alignItems="center"
      h="100"
      p="30"
      bg="var(--gray)"
    >
      <Link href="/">
        <Image w="10rem" src="assets/logoSinFondoSencillo.png" alt="logo" />
      </Link>

      <Breadcrumb separator=" " className={`navAdmin  ${Open && "open"}`}>
        <BreadcrumbItem className="navLisT">
          <Link onClick={() => setOpen(!Open)} to={"/homeAdmin"}>
            Inicio
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem p="20" className="navLisT">
          <Link to={"/gestionPublicaciones"}>Publicaciones</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className="navLisT">
          <Link to={"/gestionUsuarios"}>Usuarios</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="toggle" onClick={() => setOpen(!Open)}>
        <GiHamburgerMenu />
      </div>

      <Button
        onClick={closeSesion}
        p={10}
        fontSize={'15px'}
        borderRadius="3rem"
        _hover={{ bg: "var(--white)" }}
      >
        <HiOutlineArrowRightOnRectangle fontSize={'20px'} />
        Cerrar sesion
      </Button>
    </Flex>
  );
}

export default HeaderAdmin;
