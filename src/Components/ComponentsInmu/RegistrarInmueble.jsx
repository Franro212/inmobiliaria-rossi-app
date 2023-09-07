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
import ModalComponent from "../Modal/Modal";

function RegistroInmueble() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [inmuebleId, setInmuebleId] = useState({});
  const [title, setTitle] = useState("");
  const [textButton, setButton] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isActivityCreated, setIsActivityCreated] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    desc: "",
  });

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
      formData.append("images", data.images[0]);
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
      console.log(formData);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      if (!id) {
        const response = await agregarInmueble(formData, config);
        setIsActivityCreated(true);
        setModalInfo({
          title: "Exitoso!",
          desc: response.message,
        });
      } else {
        const response = await modificarInmueble(data, id);
        setModalInfo({
          title: "Exitoso!",
          desc: response.message,
        });
      }
      e.target.reset();
    } catch (error) {
      setIsActivityCreated(false);
      setModalInfo({
        title: "Error!",
        desc: error.message,
      });
    }
    switchIsOpen();
  };

  const setGestionTitleAndButton = () => {
    if (!id) {
      setTitle("Nueva publicación");
      setButton("Crear");
    } else {
      setTitle("Editar publicación");
      setButton("Editar");
      console.log(inmuebleId);
    }
  };

  const backPage = () => {
    navigate(-1);
  };
  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    if (isActivityCreated) {
      setIsOpen(false);
      navigate("/gestionPublicaciones");
    } else {
      switchIsOpen();
    }
  };

  return (
    <>
      <ModalComponent
        desc={modalInfo.desc}
        handleClose={closeForm}
        isOpen={isOpen}
        title={modalInfo.title}
      />
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
      <Flex mx="27rem" mt="20" justifyContent="space-between">
        <form onSubmit={handleSubmit(onSubmit)} className="formRegistrarInmu">
          <Heading mb="32">{title}</Heading>
          <div className="cont-cont-selct">
            <Flex direction="column" w="100%">
              <label>Tipo de Operacion</label>
              <select
                defaultValue={"tipo_operacion"}
                className="select-form"
                name="tipo_operacion"
                {...register("tipo_operacion")}
              >
                <option selected disabled>
                  Tipo de Operacion
                </option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
              </select>
            </Flex>
            <Flex direction="column" w="100%">
              <label>Tipo de inmueble</label>
              <select
                defaultValue={
                  inmuebleId && inmuebleId.tipo_operacion
                    ? inmuebleId.tipo_operacion
                    : ""
                }
                className="select-form"
                name="tipo_inmueble"
                placeholder="Tipo de inmueble"
                fontSize="2xl"
                {...register("tipo_inmueble")}
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
                name="banio"
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
                name="dormitorio"
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
                name="m2_terreno"
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
              name="m2_edificado"
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
                  name="departamento"
                  defaultValue={inmuebleId.departamento}
                  {...register("departamento")}
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
                  name="ciudad"
                  defaultValue={inmuebleId.ciudad}
                  {...register("ciudad")}
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
                  name="barrio"
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
                  name="direccion"
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
                  name="garantia"
                  defaultValue={inmuebleId.garantia}
                  {...register("garantia")}
                />
              </Flex>
              <Flex direction="column" w="100%">
                <label>Tipo de moneda</label>
                <select
                  defaultValue={"moneda"}
                  className="select-form"
                  name="moneda"
                  placeholder="Tipo de Moneda"
                  fontSize="2xl"
                  {...register("moneda")}
                >
                  <option selected disabled>
                    Tipo de moneda
                  </option>
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
                  name="precio"
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
                name="descripcion"
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
              name="images"
              type="file"
              {...register("images")}
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
      </Flex>
    </>
  );
}

export default RegistroInmueble;
