import { useForm } from "react-hook-form";
import { registerUser } from "../../Api/Rule_user";

import { AddIcon } from "@chakra-ui/icons";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import ModalComponent from "../Modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenModal, setIsOpen] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    desc: "",
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      setIsUserCreated(true);
      setModalInfo({
        title: "Exitoso!",
        desc: response.message,
      });
      onOpenModal();
    } catch (error) {
      setIsUserCreated(false);
      setModalInfo({
        title: "Error!",
        desc: error.message,
      });
      onOpenModal();
    }
  };

  const onOpenModal = () => {
    onClose();
    setIsOpen(true);
  };

  const closeForm = () => {
    if (isUserCreated) {
      setIsOpen(false);
      navigate("/gestionUsuarios");
    } else {
      onOpenModal();
    }
  };
  return (
    <>
      <ModalComponent
        desc={modalInfo.desc}
        handleClose={closeForm}
        isOpen={isOpenModal}
        title={modalInfo.title}
      />
      <Button
        onClick={onOpen}
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
        Crear Usuario
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered borderRadius="xxl">
        <ModalOverlay height={"full"} width={"full"} />
        <ModalContent
          left={"250px"}
          w="500%"
          h="auto"
          maxW="4xl"
          rounded="2xl"
          p="5"
        >
          <ModalHeader fontSize="5xl" mb="5">
            Crear usuario
          </ModalHeader>
          <ModalCloseButton m="5" size={20}></ModalCloseButton>
          <ModalBody pb={10}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                autoComplete
                required
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="5"
                placeholder="Nombre"
                type="text"
                name="firstName"
                {...register("firstName")}
              />
              <br />
              <Input
                autoComplete
                required
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="5"
                placeholder="Apellido"
                type="text"
                name="lastName"
                {...register("lastName")}
              />
              <br />

              <Input
                autoComplete
                fontSize="xxl"
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="5"
                className="input-form"
                placeholder="Email"
                type="email"
                name="email"
                {...register("email")}
              />
              <br />

              <Input
                autoComplete
                fontSize="xxl"
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="5"
                className="input-form"
                placeholder="Contraseña"
                type="password"
                {...register("password")}
              />
              <Select
                placeholder="Tipo de usuario"
                fontSize="xxl"
                bg="var(--gray)"
                border="none"
                h="20"
                size="lg"
                rounded="20"
                my="5"
                {...register("tipo_usuario")}
              >
                <option  value="Admin">
                  Administrador
                </option>
                <option value="Comun">
                  Usuario
                </option>
              </Select>

              <ModalFooter>
                <Button
                  mt="10"
                  fontSize="2xl"
                  bg="var(--red)"
                  color="var(--white)"
                  p="10"
                  rounded="20"
                  type="submit"
                  _hover={{
                    background: "var(--red-second)",
                  }}
                >
                  Añadir usuario
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegisterUser;
