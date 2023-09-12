import {
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInmueblePorId } from "../../Api/Rule_auth_inmobiliaria";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function DetallePropiedad() {
  const [inmueble, setInmuebleById] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchInmuebleById = async () => {
      try {
        const response = await getInmueblePorId(id);
        setInmuebleById(response.data);
      } catch (error) {
        alert(error);
      }
    };

    if (id) {
      fetchInmuebleById();
    }
  }, [id]);

  useEffect(() => {
    if (inmueble && inmueble.direccion && inmueble.ciudad) {
      const direccionCompleta = `${inmueble.direccion}, ${inmueble.ciudad}, Uruguay`;
      const encodedAddress = encodeURIComponent(direccionCompleta);
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${import.meta.env.VITE_API_KEY}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const location = data.results[0].geometry;

            const lat = location.lat;
            const lng = location.lng;
            const map = L.map("map").setView([lat, lng], 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([lat, lng])
              .addTo(map)
              .bindPopup(inmueble.direccion)
              .openPopup();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [inmueble]);
  return (
    <>
      <Header />
      <Flex flexDirection={"row"} margin={"100px 300px"}>
        {inmueble && inmueble.images && inmueble.images[0] ? (
          <Flex width={"50%"} height={"100vh"}>
            <Image
              width={"95%"}
              height={"80%"}
              src={`data:${inmueble.images[0].contentType};base64,${inmueble.images[0].data}`}
              alt="imagen de inmueble"
            />
          </Flex>
        ) : null}
        {inmueble ? (
          <Flex width={"50%"}>
            <Flex width="100%" flexDirection={"column"}>
              <TableContainer>
                <Table size="lg" variant="simple">
                  <Thead>
                    <Tr>
                      <Th color="var(--black)" fontSize="3xl">Detalle de la propiedad</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Tipo de operacion</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.tipo_operacion}</Td>
                    </Tr>
                    <Tr>
                      <Td>Precio de {inmueble.tipo_operacion}</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.moneda} {inmueble.precio}</Td>
                    </Tr>
                    <Tr>
                      <Td>Tipo de inmueble</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.tipo_inmueble}</Td>
                    </Tr>
                    <Tr>
                      <Td>Departamento</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.departamento}</Td>
                    </Tr>
                    <Tr>
                      <Td>Ciudad</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.ciudad}</Td>
                    </Tr>
                    <Tr>
                      <Td>Dormitorios</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.dormitorio}</Td>
                    </Tr>
                    <Tr>
                      <Td>Baños</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.banio}</Td>
                    </Tr>
                    <Tr>
                      <Td>Superficie del terreno</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.m2_terreno} m²</Td>
                    </Tr>
                    <Tr>
                      <Td>Superficie edificada</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td textAlign="end">{inmueble.m2_edificado} m²</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Heading textTransform="uppercase" margin="15px">Descripcion</Heading>
              <Text marginBottom="20px">{inmueble.descripcion}</Text>
              <Flex id="map" width="100%" height="300px"></Flex>
            </Flex>
          </Flex>
        ) : null}
      </Flex>
      <Footer />
    </>
  );
}

export default DetallePropiedad;
