import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function Modificar(props) {
  const { formEdit, inmueble } = props;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    formEdit(data);
  };

  return (
    <>
      <Flex
        className="formRegistrar"
        mx="27rem"
        mt="20"
        justifyContent="space-between"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="formRegistrarInmu">
          <Heading mb="32">Nueva publicación</Heading>
          <Select
            name="Tipo de operacion"
            placeholder="Tipo de operación"
            fontSize="2xl"
            bg="var(--gray)"
            border="none"
            h="20"
            size="lg"
            rounded="20"
            my="10"
            defaultValue={inmueble[0]?.tipo_operacion}
            {...register("tipo_operacion")}
          >
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </Select>

          <Select
            name="Tipo de inmueble"
            placeholder="Tipo de inmueble"
            fontSize="2xl"
            bg="var(--gray)"
            border="none"
            h="20"
            size="lg"
            rounded="20"
            my="10"
            {...register("tipo_inmueble")}
            defaultValue={inmueble[0]?.tipo_inmueble}
          >
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="terreno">Terreno</option>
          </Select>

          <Divider my="10"></Divider>

          <Flex gap="10">
            <Input
              fontSize="2xl"
              placeholder="Cant. Baños"
              autoComplete
              bg="var(--gray)"
              border="none"
              _focus={{
                border: "1px solid var(--red)",
              }}
              py="10"
              size="lg"
              rounded="20"
              mt="10"
              _placeholder={{ opacity: 8, color: "var(--black)" }}
              type="number"
              defaultValue={inmueble[0]?.banio}
              {...register("banio")}
            />

            <Input
              fontSize="2xl"
              placeholder="Cant. Dormitorios"
              autoComplete
              bg="var(--gray)"
              border="none"
              _focus={{
                border: "1px solid var(--red)",
              }}
              py="10"
              size="lg"
              rounded="20"
              _placeholder={{ opacity: 8, color: "var(--black)" }}
              my="10"
              type="number"
              {...register("dormitorio")}
              defaultValue={inmueble[0]?.dormitorio}
            />
          </Flex>
          <Divider my="10"></Divider>

          <Flex gap="5">
            <Input
              fontSize="2xl"
              autoComplete
              placeholder="Superficie del terreno"
              required
              bg="var(--gray)"
              border="none"
              _focus={{
                border: "1px solid var(--red)",
              }}
              py="10"
              size="lg"
              rounded="20"
              my="10"
              _placeholder={{ opacity: 8, color: "var(--black)" }}
              type="number"
              {...register("m2_terreno")}
              defaultValue={inmueble[0]?.m2_terreno}
            />
            <br />

            <Input
              fontSize="2xl"
              placeholder=" Superficie edificada"
              autoComplete
              bg="var(--gray)"
              border="none"
              _focus={{
                border: "1px solid var(--red)",
              }}
              py="10"
              size="lg"
              rounded="20"
              my="10"
              _placeholder={{ opacity: 8, color: "var(--black)" }}
              type="number"
              {...register("m2_edificado")}
              defaultValue={inmueble[0]?.m2_edificado}
            />
          </Flex>
          <Divider my="10"></Divider>

          <Flex gap="10">
            <Flex direction="column" w="50%">
              <Input
                fontSize="2xl"
                autoComplete
                placeholder="Departamento"
                required
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="10"
                _placeholder={{ opacity: 8, color: "var(--black)" }}
                type="text"
                {...register("departamento")}
                defaultValue={inmueble[0]?.departamento}
              />
              <br />

              <Input
                fontSize="2xl"
                autoComplete
                placeholder="Ciudad"
                required
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="10"
                _placeholder={{ opacity: 8, color: "var(--black)" }}
                type="text"
                {...register("ciudad")}
                defaultValue={inmueble[0]?.ciudad}
              />
              <br />
            </Flex>

            <Flex direction="column" w="50%">
              <Input
                fontSize="2xl"
                placeholder="Barrio"
                autoComplete
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="10"
                _placeholder={{ opacity: 8, color: "var(--black)" }}
                type="text"
                {...register("barrio")}
                defaultValue={inmueble?.barrio}
              />

              <Input
                fontSize="2xl"
                autoComplete
                placeholder="Dirección"
                required
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="10"
                _placeholder={{ opacity: 8, color: "var(--black)" }}
                type="text"
                {...register("direccion")}
                defaultValue={inmueble[0]?.direccion}
              />
              <br />
            </Flex>
          </Flex>

          <Divider my="10"></Divider>
          <Flex gap="10">
            <Flex flexDirection="column" w="50%">
              <Input
                fontSize="2xl"
                placeholder="Garantía"
                autoComplete
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="10"
                _placeholder={{ opacity: 8, color: "var(--black)" }}
                type="text"
                {...register("garantia")}
                defaultValue={inmueble[0]?.garantia}
              />

              <Input
                fontSize="2xl"
                autoComplete
                placeholder="Precio"
                required
                bg="var(--gray)"
                border="none"
                _focus={{
                  border: "1px solid var(--red)",
                }}
                py="10"
                size="lg"
                rounded="20"
                my="10"
                _placeholder={{ opacity: 8, color: "var(--black)" }}
                type="number"
                {...register("precio")}
                defaultValue={inmueble[0]?.precio}
              />
              <br />
            </Flex>

            <Textarea
              placeholder="Descripción"
              minH="60"
              fontSize="2xl"
              bg="var(--gray)"
              border="none"
              rounded="20"
              my="10"
              py="10"
              _placeholder={{ opacity: 8, color: "var(--black)" }}
              {...register("descripcion")}
              defaultValue={inmueble[0]?.descripcion}
            />
          </Flex>
          <Divider my="10"></Divider>

          <Flex justifyContent="flex-end" my="10">
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
              Modificar publicación
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
}

export default Modificar;
