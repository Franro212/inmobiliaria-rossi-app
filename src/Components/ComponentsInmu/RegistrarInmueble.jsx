import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  agregarInmueble,
  getInmueblePorId,
  modificarInmueble,
} from "../../Api/Rule_auth_inmobiliaria";
import HeaderAdmin from "../../Components/Header/HeaderAdmin/HeaderAdmin";
import "./compInmu.css";

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function RegistroInmueble() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [inmuebleId, setInmuebleId] = useState({});
  const [title, setTitle] = useState("");
  const [textButton, setButton] = useState("");

  const handleReset = () => {
    reset();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (id) {
      fetchInmuebleById();
    }
    setGestionTitleAndButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInmuebleById = async () => {
    try {
      const response = await getInmueblePorId(id);
      setInmuebleId(response.data);
    } catch (error) {
      alert(error);
    }
  };
  const onSubmit = async (data, e) => {
    const formData = new FormData();
    if (!id) {
      formData.append("file", data.file[0]);
      formData.append("m2_edificado", data.m2_edificado);
      formData.append("m2_terreno", data.m2_terreno);
      formData.append("precio", data.precio);
      formData.append("ciudad", data.ciudad);
      formData.append("departamento", data.departamento);
      formData.append("tipo_operacion", data.tipo_operacion);
      formData.append("tipo_inmueble", data.tipo_inmueble);
      formData.append("dormitorio", data.dormitorio);
      formData.append("banio", data.banio);
      formData.append("direccion", data.direccion);
      formData.append("descripcion", data.descripcion);
      formData.append("garantia", data.garantia);
      formData.append("barrio", data.barrio);
      formData.append("moneda", data.moneda);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      if (!id) {
        await agregarInmueble(formData, config);
        alert("Su registro fue realizado con éxito");
      } else {
        await modificarInmueble(data, id);
        alert("Su modificación fue realizada con éxito");
      }
      e.target.reset();
    } catch (error) {
      alert(error);
    }
  };

  const setGestionTitleAndButton = () => {
    if (!id) {
      setTitle("Nueva publicación");
      setButton("Crear");
    } else {
      setTitle("Editar publicación");
      setButton("Editar");
    }
  };

  const backPage = () => {
    navigate(-1);
  };

  return (
    <>
      <HeaderAdmin />
      <Flex mx="27rem" mt="10" className="navRegistrar">
        <Breadcrumb fontSize="2xl" className="navRegistrar">
          <BreadcrumbItem className="navRegistrar">
            <Link to="/homeAdmin">Inicio</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link to="/gestionPublicaciones">Gestión de publicaciones</Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage color="var(--red)">
            <Link to="/registrarInmueble">{title}</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)} className="formRegistrarInmu">
        <Heading mb="32">{title}</Heading>
        <div className="cont-cont-selct">
          <Flex direction="column" w="100%">
            <label>Tipo de Operacion</label>
            <select
              className="select-form"
              name="tipo_operacion"
              {...register("tipo_operacion")}
              defaultValue={inmuebleId.tipo_operacion}
            >
              <option disabled>Tipo de operacion</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
          </Flex>
          <Flex direction="column" w="100%">
            <label>Tipo de inmueble</label>
            <select
              className="select-form"
              name="tipo_inmueble"
              placeholder="Tipo de inmueble"
              fontSize="2xl"
              {...register("tipo_inmueble")}
              defaultValue={inmuebleId.tipo_inmueble}
            >
              <option disabled>Tipo de inmueble</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Terreno">Terreno</option>
            </select>
          </Flex>
        </div>

        <Divider my="10"></Divider>

        <Flex gap="10">
          <Flex direction="column" w="100%">
            <label>Cantidad de baños</label>
            <input
              className="select-form"
              fontSize="2xl"
              placeholder="Cant. Baños"
              autoComplete
              type="number"
              defaultValue={inmuebleId.banio}
              {...register("banio")}
            />
          </Flex>
          <Flex direction="column" w="100%">
            <label>Cantidad de Dormitorios</label>
            <input
              className="select-form"
              fontSize="2xl"
              placeholder="Cant. Dormitorios"
              autoComplete
              type="number"
              defaultValue={inmuebleId.dormitorio}
              {...register("dormitorio")}
            />
          </Flex>
        </Flex>
        <Divider my="10"></Divider>

        <Flex gap="5">
          <Flex direction="column" w="100%">
            <label>Superficie del terreno</label>
            <input
              className="select-form"
              fontSize="2xl"
              autoComplete
              placeholder="Superficie del terreno"
              type="number"
              defaultValue={inmuebleId.m2_terreno}
              {...register("m2_terreno")}
            />
          </Flex>
        </Flex>
        <br />
        <Flex direction="column" w="100%">
          <label>Superficie edificada</label>
          <input
            className="select-form"
            fontSize="2xl"
            placeholder=" Superficie edificada"
            autoComplete
            type="number"
            defaultValue={inmuebleId.m2_edificado}
            {...register("m2_edificado")}
          />
        </Flex>
        <Divider my="10"></Divider>

        <Flex gap="10">
          <Flex direction="column" w="50%">
            <Flex direction="column" w="100%">
              <label>Departamento</label>
              <input
                className="select-form"
                fontSize="2xl"
                autoComplete
                placeholder="Departamento"
                required
                type="text"
                defaultValue={inmuebleId.departamento}
                {...register("departamento", { required: true })}
              />
            </Flex>
            <br />
            <Flex direction="column" w="100%">
              <label>Cuidad</label>
              <input
                className="select-form"
                fontSize="2xl"
                autoComplete
                placeholder="Ciudad"
                required
                type="text"
                defaultValue={inmuebleId.ciudad}
                {...register("ciudad", { required: true })}
              />
            </Flex>
            <br />
          </Flex>

          <Flex direction="column" w="50%">
            <Flex direction="column" w="100%">
              <label>Barrio</label>
              <input
                className="select-form"
                fontSize="2xl"
                placeholder="Barrio"
                autoComplete
                type="text"
                defaultValue={inmuebleId.barrio}
                {...register("barrio")}
              />
            </Flex>
            <br />
            <Flex direction="column" w="100%">
              <label>Direccion</label>
              <input
                className="select-form"
                fontSize="2xl"
                autoComplete
                placeholder="Dirección"
                required
                type="text"
                defaultValue={inmuebleId.direccion}
                {...register("direccion")}
              />
            </Flex>
            <br />
          </Flex>
        </Flex>

        <Divider my="10"></Divider>
        <Flex gap="10">
          <Flex flexDirection="column" w="50%">
            <Flex direction="column" w="100%">
              <label>Garantia</label>
              <input
                className="select-form"
                fontSize="2xl"
                placeholder="Garantía"
                autoComplete
                type="text"
                defaultValue={inmuebleId.garantia}
                {...register("garantia")}
              />
            </Flex>
            <Flex direction="column" w="100%">
              <label>Tipo de moneda</label>
              <select
                className="select-form"
                name="moneda"
                placeholder="Tipo de Moneda"
                fontSize="2xl"
                {...register("moneda")}
                defaultValue={inmuebleId.moneda}
              >
                <option value="USD">USD</option>
                <option value="$">$</option>
              </select>
            </Flex>
            <Flex direction="column" w="100%">
              <label>Precio</label>
              <input
                className="select-form"
                fontSize="2xl"
                autoComplete
                placeholder="Precio"
                required
                type="number"
                defaultValue={inmuebleId.precio}
                {...register("precio")}
              />
            </Flex>
            <br />
          </Flex>
          <Flex direction="column" w="100%">
            <label>Descripcion</label>
            <textarea
              className="select-form"
              placeholder="Descripción"
              defaultValue={inmuebleId.descripcion}
              {...register("descripcion")}
            />
          </Flex>
        </Flex>
        <Divider my="10"></Divider>
        {id ? null : (
          <FormLabel htmlFor="imagen" fontSize="3xl" ml="3">
            Imagen
          </FormLabel>
        )}
        {id ? null : (
          <input
            className="select-form"
            multiple
            placeholder="Imagen"
            fontSize="2xl"
            autoComplete
            required
            type="file"
            {...register("file", {
              required: false,
              validate: (value) => value[0].size <= 10000000,
            })}
          />
        )}
        <br />

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
            {textButton}
          </Button>
          <Button
            mt="10"
            fontSize="2xl"
            bg="var(--red)"
            color="var(--white)"
            p="10"
            rounded="20"
            type="button"
            onClick={backPage}
            _hover={{
              background: "var(--red-second)",
            }}
          >
            Cancelar
          </Button>
          <Button
            mt="10"
            fontSize="2xl"
            bg="var(--red)"
            color="var(--white)"
            p="10"
            rounded="20"
            type="button"
            onClick={handleReset}
            _hover={{
              background: "var(--red-second)",
            }}
          >
            Reset
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default RegistroInmueble;
