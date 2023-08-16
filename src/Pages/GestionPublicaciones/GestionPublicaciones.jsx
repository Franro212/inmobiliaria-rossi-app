import { useEffect, useState } from "react";
import "./gestionPublicaciones.css";

import { getListaInmuebles } from "../../Api/Rule_auth_inmobiliaria";
import ListadoInmuebles from "../../Components/ComponentsInmu/ListadoInmueble";
import HeaderAdmin from "../../Components/Header/HeaderAdmin/HeaderAdmin";

import { Box, Flex, Text } from "@chakra-ui/react";

function GestionPublicaciones() {
  const [inmuebles, setInmuebles] = useState([]);
  const consultarInmuebles = async () => {
    try {
      const response = await getListaInmuebles();
      setInmuebles(response.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    consultarInmuebles();
  }, []);

  return (
    <>
      <HeaderAdmin />

      <Flex justifyContent="space-between" mx="27rem" my="20">
        <Box>
          <Text fontSize="2rem">Tablero Administrativo</Text>
          <Text fontSize="3rem" as="b">
            Publicaciones
          </Text>
        </Box>
      </Flex>

      <Flex flexDirection="column" mx="27rem" my="20">
        <ListadoInmuebles inmuebles={inmuebles} />
      </Flex>
    </>
  );
}

export default GestionPublicaciones;
