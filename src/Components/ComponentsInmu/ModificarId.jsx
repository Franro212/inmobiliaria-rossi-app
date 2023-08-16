import { useState } from "react";
import { Link } from "react-router-dom";
import { getInmueblePorId, modificarInmueble } from "../../Api/Rule_auth_inmobiliaria";
import HeaderAdmin from "../Header/HeaderAdmin/HeaderAdmin";
import Modificar from "./modificar/Modificar";
import "./compInmu.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function ModificarId() {
  const [inmueble, setInmueble] = useState();
  const [idInmueble, setIdInmueble] = useState();

  const handleIdInmueble = (e) => {
    setIdInmueble(e.target.value);
    return;
  };

  const handleSubmit = async (estate) => {
    await getInmueblePorId(estate)
      .then((response) => {
        setInmueble(response);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const formEdit = async (data) => {
    await modificarInmueble(data, inmueble[0]?.id_inmueble)
      .then(() => {
        alert("Su modificacion fue realizada con exito");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <HeaderAdmin />
      <Flex className="navRegistrar" mx="27rem" mt="10">
        <Breadcrumb fontSize="2xl">
          <BreadcrumbItem>
            <Link to="/homeAdmin">Inicio</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link to="/gestionPublicaciones">Gestión de publicaciones</Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage color="var(--red)">
            <Link to="/registrarInmueble">Modificar Publicaciones</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Flex alignItems="center" my="20">
        <FormControl w="20%" pr="15">
          <FormLabel fontSize="3xl">Buscar Inmueble</FormLabel>
          <Input
            bg="var(--gray)"
            border="none"
            _focus={{
              border: "1px solid var(--red)",
            }}
            p="3"
            size="2xl"
            rounded="10"
            placeholder="ejemplo: 6"
            autoComplete="none"
            type="number"
            value={idInmueble}
            onChange={handleIdInmueble}
          />
        </FormControl>

        <Button
          fontSize="2xl"
          bg="var(--gray)"
          color="var(--black)"
          textAlign="center"
          p="9"
          mt="12"
          rounded="20"
          onClick={() => {
            handleSubmit(idInmueble);
          }}
          _hover={{
            background: "var(--gray-second)",
          }}
        >
          Buscar Inmueble
        </Button>
      </Flex>

      {inmueble && <Modificar formEdit={formEdit} inmueble={inmueble} />}
    </div>
  );
}

export default ModificarId;
