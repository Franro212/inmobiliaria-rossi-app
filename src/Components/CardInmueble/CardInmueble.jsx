import { useEffect, useState } from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { getListaInmuebles } from "../../Api/Rule_auth_inmobiliaria";
import "./cardInmueble.css";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

function CardInmuebleHome() {
  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListaInmuebles();
        setInmuebles(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {inmuebles.map((inmueble, index) => {
        if (index >= 4) {
          return null;
        }

        return (
          <Card key={inmueble._id} maxW="300px">
            <CardBody>
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
                  boxSize={"200px"}
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
              <div className="especificaciones">
                <p>
                  <FaBed className="icono" />
                  {inmueble.dormitorio}
                </p>

                <p>
                  <FaBath className="icono" />
                  {inmueble.banio}
                </p>

                <p>
                  <FaRulerCombined className="icono" />
                  {inmueble.m2_terreno}
                </p>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}

export default CardInmuebleHome;
