import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

function CardInmuebleHome({ inmueble }) {
  return (
    <>
      <Card key={inmueble._id} height={"550px"} width={"300px"}>
        <CardBody width={"100%"}>
          <Text
            backgroundColor="#BD212E"
            width="80px"
            borderRadius={"lg"}
            textAlign={"center"}
            color={"#ffffff"}
            position={"absolute"}
          >
            {inmueble.tipo_operacion}
          </Text>
          {inmueble.images && inmueble.images.length > 0 ? (
            <Image
              src={`data:${inmueble.images[0].contentType};base64,${inmueble.images[0].data}`}
              alt="imagen de inmueble"
              borderRadius="lg"
              width={"100%"}
              height={"250px"}
              htmlWidth={"100%"}
            />
          ) : (
            <div>No hay imagen disponible</div>
          )}
          <Stack mt="6" spacing="3">
            <Text noOfLines={5}>{inmueble.descripcion}</Text>
            <Text color="blue.600" fontSize="25px">
              {inmueble.moneda}
              {inmueble.precio}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex justifyContent="space-between" margin={"0 20px"} width={"100%"}>
            <p>
              <FaBed color="var(--red)" />
              {inmueble.dormitorio}
            </p>

            <p>
              <FaBath color="var(--red)" />
              {inmueble.banio}
            </p>

            <p>
              <FaRulerCombined color="var(--red)" />
              {inmueble.m2_terreno}
            </p>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}

export default CardInmuebleHome;
