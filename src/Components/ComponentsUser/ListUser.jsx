import { useState, useEffect } from "react";
import { deleteUser, getUserInfo } from "../../Api/Rule_user";

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
import ModalComponent from "../Modal/Modal";

function ListUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdIusuario] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    desc: "",
  });

  const eliminarPorId = async (idusuario, e) => {
    e.preventDefault();
    try {
      const response = await deleteUser(idusuario);
      if (response.error) {
        throw new Error(response.message);
      } else {
        setModalInfo({
          title: "Success!",
          desc: response.message,
        });
        const updatedInmuebles = usuarios.filter(
          (usuario) => usuario._id !== idusuario,
        );
        setUsuarios(updatedInmuebles);
        setConfirm(false);
      }
    } catch (error) {
      setModalInfo({
        title: "Error!",
        desc: error.message,
      });
      setConfirm(false);
    }
  };

  const listarUsuarios = async () => {
    await getUserInfo()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    listarUsuarios();
  }, []);
  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalComponent
        confirmModal={confirm}
        deleteFunction={(e) => eliminarPorId(idUsuario, e)}
        desc={modalInfo.desc}
        handleClose={switchIsOpen}
        isOpen={isOpen}
        title={modalInfo.title}
      />
      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th fontSize="2xl"></Th>
              <Th fontSize="2xl">Nombre</Th>
              <Th fontSize="2xl">Apellido</Th>
              <Th fontSize="2xl">Email</Th>
              <Th fontSize="2xl">Tipo de Usuario</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios &&
              usuarios.map((usuario) => {
                return (
                  <Tr key={usuario._id}>
                    <Button
                      onClick={() => {
                        setIdIusuario(usuario._id);
                        setConfirm(true);
                        setIsOpen(true);
                        setModalInfo({
                          title: "Confirmar",
                          desc: "Esta seguro que quiere eliminar el usuario?",
                        });
                      }}
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
                    <Td>{usuario.firstName}</Td>
                    <Td>{usuario.lastName}</Td>
                    <Td>{usuario.email}</Td>
                    <Td>{usuario.tipo_usuario}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListUsers;
