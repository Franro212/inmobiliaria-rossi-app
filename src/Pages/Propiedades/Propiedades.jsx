import { Flex, Select, FormControl } from "@chakra-ui/react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CardInmuebleHome from "../../Components/CardInmueble/CardInmueble";
import { useEffect, useState } from "react";
import { getListaInmuebles } from "../../Api/Rule_auth_inmobiliaria";
import { Link } from "react-router-dom";

function Propiedades() {
  const [inmuebles, setInmuebles] = useState([]);
  const [filtros, setFiltros] = useState({
    departamento: "",
    tipo_inmueble: "",
    tipo_operacion: "",
    dormitorio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListaInmuebles();
        const filteredInmuebles = applyFilters(response.data, filtros);
        setInmuebles(filteredInmuebles);
        console.log(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [filtros]);

  const handleFilterChange = (filterName, value) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [filterName]: value,
    }));
  };
  const applyFilters = (inmuebles, filtros) => {
    return inmuebles.filter((inmueble) => {
      const pasaFiltros =
        (filtros.departamento === "" ||
          inmueble.departamento === filtros.departamento) &&
        (filtros.tipo_operacion === "" ||
          inmueble.tipo_operacion === filtros.tipo_operacion) &&
        (filtros.tipo_inmueble === "" ||
          inmueble.tipo_inmueble === filtros.tipo_inmueble) &&
        (filtros.dormitorio === "" ||
          inmueble.dormitorio === filtros.dormitorio);
      return pasaFiltros;
    });
  };

  return (
    <>
      <Header />
      <Flex
        fontSize={"20px"}
        justify="center"
        align="center"
        flexDirection={"column"}
        mt="20px"
      >
        <FormControl
          borderRadius={"20px"}
          backgroundColor={"var(--gray)"}
          boxShadow={"md"}
          padding={"20px"}
          width="50%"
        >
          <Flex gap={"20px"}>
            <Select
              fontSize={"15px"}
              backgroundColor={"var(--white)"}
              textAlign={"center"}
              placeholder="Departamento"
              onChange={(e) =>
                handleFilterChange("departamento", e.target.value)
              }
            >
              <option value="Montevideo">Montevideo</option>
              <option value="Canelones">Canelones</option>
              <option value="Maldonado">Maldonado</option>
            </Select>
            <Select
              fontSize={"15px"}
              backgroundColor={"var(--white)"}
              textAlign={"center"}
              placeholder="Tipo de Operación"
              onChange={(e) =>
                handleFilterChange("tipo_operacion", e.target.value)
              }
            >
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </Select>
          </Flex>
          <Flex gap={"20px"}>
            <Select
              fontSize={"15px"}
              backgroundColor={"var(--white)"}
              textAlign={"center"}
              placeholder="Tipo de Inmueble"
              onChange={(e) =>
                handleFilterChange("tipo_inmueble", e.target.value)
              }
            >
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Terreno">Terreno</option>
            </Select>
            <Select
              fontSize={"15px"}
              backgroundColor={"var(--white)"}
              textAlign={"center"}
              placeholder="Dormitorios"
              onChange={(e) => handleFilterChange("dormitorio", e.target.value)}
            >
              <option value="Monoambiente">Monoambiente</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
          </Flex>
        </FormControl>
      </Flex>
      <Flex margin="100px 330px" wrap="wrap" gap={"50px"}>
        {inmuebles.map((inmueble, index) => (
          <Link to={`/pageDetallePropiedade/${inmueble._id}`} key={index}>
            <CardInmuebleHome inmueble={inmueble} />
          </Link>
        ))}
      </Flex>
      <Footer />
    </>
  );
}

export default Propiedades;
