import { eliminarInmueble } from "../../Api/Rule_auth_inmobiliaria";
import { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

function ListadoInmuebles(props) {
  const { inmuebles } = props;
  const [listaInmuebles, setListaInmuebles] = useState([inmuebles]);
  const [editInmuebleId, setEditInmuebleId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (editInmuebleId !== null) {
      navigate(`/registrarInmueble/${editInmuebleId}`);
    }
  }, [editInmuebleId, navigate]);

  const editInmueble = (id) => {
    setEditInmuebleId(id);
  };

  const eliminarPorId = async (idInmueble, e) => {
    e.preventDefault();
    try {
      await eliminarInmueble(idInmueble);
      alert("Inmueble eliminado");

      const updatedInmuebles = listaInmuebles.filter(
        (inmueble) => inmueble._id !== idInmueble,
      );
      setListaInmuebles(updatedInmuebles);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    setListaInmuebles(inmuebles);
  }, [inmuebles]);

  return (
    <>
      <TableContainer mt="10">
        <Link to={"/registrarInmueble"}>
          <Button
            fontSize="2xl"
            textAlign="center"
            p="10"
            h="20"
            rounded="full"
            bg="var(--red)"
            color="var(--white)"
            gap={2}
            _hover={{
              background: "var(--red-second)",
            }}
          >
            <AddIcon boxSize={5} />
            Crear Publicación
          </Button>
        </Link>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr h="20">
              <Th fontSize="2xl">Id del inmueble</Th>
              <Th fontSize="2xl">Tipo Operación</Th>
              <Th fontSize="2xl">Tipo Inmueble</Th>
              <Th fontSize="2xl">Cant. baños</Th>
              <Th fontSize="2xl">Cant. dormitorios</Th>
              <Th fontSize="2xl">M2 del Terreno</Th>
              <Th fontSize="2xl">M2 de Edificado</Th>
              <Th fontSize="2xl">Departamento</Th>
              <Th fontSize="2xl">Ciudad</Th>
              <Th fontSize="2xl">Barrio</Th>
              <Th fontSize="2xl">Dirección</Th>
              <Th fontSize="2xl">Garantía</Th>
              <Th fontSize="2xl">Precio</Th>
              <Th fontSize="2xl">Descripción</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listaInmuebles &&
              listaInmuebles.map((inmueble) => {
                return (
                  <Tr key={inmueble._id}>
                    <Button
                      onClick={(e) => eliminarPorId(inmueble._id, e)}
                      fontSize="3xl"
                      bg="var(--red)"
                      color="var(--white)"
                      textAlign="center"
                      p="8"
                      rounded="20"
                      width="20px"
                      type="button"
                      _hover={{
                        background: "var(--red-second)",
                      }}
                    >
                      X
                    </Button>
                    <Button
                      onClick={(e) => editInmueble(inmueble._id, e)}
                      fontSize="2xl"
                      bg="var(--gray)"
                      color="var(--black)"
                      textAlign="center"
                      p="9"
                      rounded="10"
                      type="button"
                      _hover={{
                        background: "var(--gray-second)",
                      }}
                    >
                      Edit
                    </Button>
                    <Td>{inmueble.tipo_operacion}</Td>
                    <Td>{inmueble.tipo_inmueble}</Td>
                    <Td>{inmueble.banio}</Td>
                    <Td>{inmueble.dormitorio}</Td>
                    <Td>{inmueble.m2_terreno}</Td>
                    <Td>{inmueble.m2_edificado}</Td>
                    <Td>{inmueble.departamento}</Td>
                    <Td>{inmueble.ciudad}</Td>
                    <Td>{inmueble.barrio}</Td>
                    <Td>{inmueble.direccion}</Td>
                    <Td>{inmueble.garantia}</Td>
                    <Td>{inmueble.precio}</Td>
                    <Td>{inmueble.descripcion}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListadoInmuebles;
