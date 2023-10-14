import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  agregarInmueble,
  getInmueblePorId,
  modificarInmueble,
} from "../../Api/Rule_auth_inmobiliaria";
import HeaderAdmin from "../Header/HeaderAdmin/HeaderAdmin";
import "./compInmu.css";

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComponent from "../Modal/Modal";

function RegistroInmueble() {
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const [inmuebleId, setInmuebleId] = useState({});
  const [title, setTitle] = useState("");
  const [textButton, setButton] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isActivityCreated, setIsActivityCreated] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    desc: "",
  });
  const [selectedTipoInmueble, setSelectedTipoInmueble] = useState(
    inmuebleId?.tipo_inmueble || "",
  );

  const [spinnerOn, setSpinnerOn] = useState(false);

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setSpinnerOn(true);
        setEdit(true);
        try {
          const response = await getInmueblePorId(id);
          setInmuebleId(response.data);
          Object.keys(response.data).forEach((key) => {
            setValue(key, response.data[key]);
          });
          setSelectedTipoInmueble(response.data.tipo_inmueble);
        } catch (error) {
          alert(error);
        }
        setSpinnerOn(false);
      }
      setGestionTitleAndButton();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, selectedTipoInmueble]);

  const onSubmit = async (data, e) => {
    const formData = new FormData();
    if (!id) {
      for (let i = 0; i <= 6; i++) {
        const images = data.images[i];
        formData.append("images", images);
      }
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
        const response = await agregarInmueble(formData, config);
        setIsActivityCreated(true);
        setSpinnerOn(true);
        setModalInfo({
          title: "Exitoso!",
          desc: response.message,
        });
      } else {
        const response = await modificarInmueble(data, id);
        setIsActivityCreated(true);
        setSpinnerOn(true);
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
        desc: error,
      });
    }
    setSpinnerOn(false);
    switchIsOpen();
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

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    setIsOpen(false);
    if (isActivityCreated) {
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

      {spinnerOn ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      ) : null}

      <HeaderAdmin edit={edit} />
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
      {!spinnerOn ? (
        <Flex mx="27rem" mt="20" justifyContent="space-between">
          <form onSubmit={handleSubmit(onSubmit)} className="formRegistrarInmu">
            <Heading mb="32">{title}</Heading>
            <div className="cont-cont-selct">
              <Flex direction="column" w="100%">
                <label>Tipo de Operación</label>
                <select
                  defaultValue={"tipo_operacion"}
                  className="select-form"
                  name="tipo_operacion"
                  {...register("tipo_operacion")}
                >
                  <option disabled>Tipo de Operación</option>
                  <option value="Venta">Venta</option>
                  <option value="Alquiler">Alquiler</option>
                </select>
                {errors.tipo_operacion && (
                  <p>{errors.tipo_operacion.message}</p>
                )}
              </Flex>
              <Flex direction="column" w="100%">
                <label>Tipo de Inmueble</label>
                <select
                  onInputCapture={(e) =>
                    setSelectedTipoInmueble(e.target.value)
                  }
                  defaultValue={
                    inmuebleId && inmuebleId.tipo_operacion
                      ? inmuebleId.tipo_operacion
                      : ""
                  }
                  className="select-form"
                  name="tipo_inmueble"
                  placeholder="Tipo de Inmueble"
                  fontSize="2xl"
                  {...register("tipo_inmueble")}
                >
                  <option disabled>Tipo de Inmueble</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Terreno">Terreno</option>
                </select>
                {errors.tipo_inmueble && <p>{errors.tipo_inmueble.message}</p>}
              </Flex>
            </div>
            {selectedTipoInmueble !== "Terreno" && <Divider my="10"></Divider>}
            {selectedTipoInmueble !== "Terreno" && (
              <Flex gap="10">
                <Flex direction="column" w="100%">
                  <label>Cantidad de Baños</label>
                  <Controller
                    name="banio"
                    control={control}
                    rules={{
                      required: "*Este campo es requerido",
                      max: {
                        value: 99,
                        message: "*Se excede el máximo permitido 99",
                      },
                      min: {
                        value: 1,
                        message: "*El mínimo permitido es 1",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "*Ingrese un número válido",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        className="select-form"
                        fontSize="2xl"
                        placeholder="Cant. Baños"
                        autoComplete="off"
                        type="number"
                        name="banio"
                        defaultValue={inmuebleId.banio}
                        {...register("banio")}
                        {...field}
                      />
                    )}
                  />

                  <p className="textError">
                    {errors.banio && errors.banio.message}
                  </p>
                </Flex>
                <Flex direction="column" w="100%">
                  <label>Cantidad de Dormitorios</label>
                  <Controller
                    name="dormitorio"
                    control={control}
                    rules={{
                      required: "*Este campo es requerido",
                      max: {
                        value: 99,
                        message: "*Se excede el máximo permitido 99",
                      },
                      min: {
                        value: 1,
                        message: "*El mínimo permitido es 1",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "*Ingrese un número válido",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        className="select-form"
                        fontSize="2xl"
                        placeholder="Cant. Dormitorios"
                        name="dormitorio"
                        autoComplete="off"
                        type="number"
                        defaultValue={inmuebleId.dormitorio}
                        {...register("dormitorio")}
                        {...field}
                      />
                    )}
                  />
                  <p className="textError">
                    {errors.dormitorio && errors.dormitorio.message}
                  </p>
                </Flex>
              </Flex>
            )}

            <Divider my="10"></Divider>

            <Flex gap="5">
              <Flex direction="column" w="100%">
                <label>Superficie del Terreno</label>
                <Controller
                  name="m2_terreno"
                  control={control}
                  rules={{
                    required: "*Este campo es requerido",
                    max: {
                      value: 3000,
                      message: "*Se excede el máximo permitido de 3000",
                    },
                    min: {
                      value: 1,
                      message: "*El mínimo permitido es 1",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "*Ingrese un número válido",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      className="select-form"
                      fontSize="2xl"
                      autoComplete="off"
                      name="m2_terreno"
                      placeholder="Superficie del Terreno"
                      type="number"
                      defaultValue={inmuebleId.m2_terreno}
                      {...register("m2_terreno")}
                      {...field}
                    />
                  )}
                />

                <p className="textError">
                  {errors.m2_terreno && errors.m2_terreno.message}
                </p>
              </Flex>
            </Flex>
            <br />
            {selectedTipoInmueble !== "Terreno" && (
              <Flex direction="column" w="100%">
                <label>Superficie Edificada</label>
                <Controller
                  name="m2_edificado"
                  control={control}
                  rules={{
                    required: "*Este campo es requerido",
                    max: {
                      value: 3000,
                      message: "*Se excede el máximo permitido",
                    },
                    min: {
                      value: 1,
                      message: "*El mínimo permitido es 1",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "*Ingrese un número válido",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      className="select-form"
                      fontSize="2xl"
                      placeholder="Superficie Edificada"
                      autoComplete="off"
                      name="m2_edificado"
                      type="number"
                      defaultValue={inmuebleId.m2_edificado}
                      {...register("m2_edificado")}
                      {...field}
                    />
                  )}
                />

                <p className="textError">
                  {errors.m2_edificado && errors.m2_edificado.message}
                </p>
              </Flex>
            )}
            <Divider my="10"></Divider>

            <Flex gap="10">
              <Flex direction="column" w="50%">
                <Flex direction="column" w="100%">
                  <label>Departamento</label>
                  <Controller
                    name="departamento"
                    control={control}
                    rules={{
                      required: "*Este campo es requerido",
                      maxLength: {
                        value: 20,
                        message: "*Se excede el máximo permitido de caracteres",
                      },
                      minLength: {
                        value: 5,
                        message: "*El mínimo permitido de caracteres es 5",
                      },
                      validate: (value) => {
                        const letras = /^[A-Za-z]+$/;
                        if (!value.match(letras)) {
                          return "*Este campo solo debe contener letras";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <input
                        className="select-form"
                        fontSize="2xl"
                        autoComplete="off"
                        placeholder="Departamento"
                        type="text"
                        name="departamento"
                        defaultValue={inmuebleId.departamento}
                        {...register("departamento")}
                        {...field}
                      />
                    )}
                  />
                  <p className="textError">
                    {errors.departamento && errors.departamento.message}
                  </p>
                </Flex>
                <br />
                <Flex direction="column" w="100%">
                  <label>Ciudad</label>
                  <Controller
                    name="ciudad"
                    control={control}
                    rules={{
                      required: "*Este campo es requerido",
                      maxLength: {
                        value: 20,
                        message: "*Se excede el máximo permitido de caracteres",
                      },
                      minLength: {
                        value: 5,
                        message: "*El mínimo permitido de caracteres es 5",
                      },
                      validate: (value) => {
                        const letras = /^[A-Za-z]+$/;
                        if (!value.match(letras)) {
                          return "*Este campo solo debe contener letras";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <input
                        className="select-form"
                        fontSize="2xl"
                        autoComplete="off"
                        placeholder="Ciudad"
                        type="text"
                        name="ciudad"
                        defaultValue={inmuebleId.ciudad}
                        {...register("ciudad")}
                        {...field}
                      />
                    )}
                  />
                  <p className="textError">
                    {errors.ciudad && errors.ciudad.message}
                  </p>
                </Flex>
                <br />
              </Flex>

              <Flex direction="column" w="50%">
                <Flex direction="column" w="100%">
                  <label>Barrio</label>
                  <Controller
                    name="barrio"
                    control={control}
                    rules={{
                      required: "*Este campo es requerido",
                      maxLength: {
                        value: 20,
                        message: "*Se excede el máximo permitido de caracteres",
                      },
                      minLength: {
                        value: 5,
                        message: "*El mínimo permitido de caracteres es 5",
                      },
                      validate: (value) => {
                        const letras = /^[A-Za-z]+$/;
                        if (!value.match(letras)) {
                          return "*Este campo solo debe contener letras";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <input
                        className="select-form"
                        fontSize="2xl"
                        placeholder="Barrio"
                        autoComplete="off"
                        type="text"
                        name="barrio"
                        defaultValue={inmuebleId.barrio}
                        {...field}
                      />
                    )}
                  />
                  <p className="textError">
                    {errors.barrio && errors.barrio.message}
                  </p>
                </Flex>
                <br />
                <Flex direction="column" w="100%">
                  <label>Dirección</label>
                  <Controller
                    name="direccion"
                    control={control}
                    rules={{
                      required: "*Este campo es requerido",
                      maxLength: {
                        value: 50,
                        message: "*Se excede el máximo permitido de caracteres",
                      },
                      minLength: {
                        value: 5,
                        message: "*El mínimo permitido de caracteres es 5",
                      },
                      validate: (value) => {
                        const contieneLetra = /[A-Za-z]/.test(value);
                        const contieneNumero = /\d/.test(value);

                        if (!contieneLetra || !contieneNumero) {
                          return "*El campo debe contener al menos una letra y un número.";
                        }

                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <input
                        className="select-form"
                        fontSize="2xl"
                        autoComplete="off"
                        placeholder="Dirección"
                        type="text"
                        name="direccion"
                        defaultValue={inmuebleId.direccion}
                        {...field}
                      />
                    )}
                  />
                  <p className="textError">
                    {errors.direccion && errors.direccion.message}
                  </p>
                </Flex>
                <br />
              </Flex>
            </Flex>

            <Divider my="10"></Divider>
            <Flex gap="10">
              <Flex flexDirection="column" w="50%">
                {selectedTipoInmueble !== "Terreno" && (
                  <Flex direction="column" w="100%">
                    <label>Garantía</label>
                    <Controller
                      name="garantia"
                      control={control}
                      rules={{
                        required: "*Este campo es requerido",
                        maxLength: {
                          value: 20,
                          message:
                            "*Se excede el máximo permitido de caracteres",
                        },
                        minLength: {
                          value: 5,
                          message: "*El mínimo permitido de caracteres es 5",
                        },
                        validate: (value) => {
                          const letras = /^[A-Za-z]+$/;
                          if (!value.match(letras)) {
                            return "*Este campo solo debe contener letras";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <input
                          className="select-form"
                          fontSize="2xl"
                          placeholder="Garantía"
                          autoComplete="off"
                          type="text"
                          name="garantia"
                          defaultValue={inmuebleId.garantia}
                          {...register("garantia")}
                          {...field}
                        />
                      )}
                    />
                    <p className="textError">
                      {errors.garantia && errors.garantia.message}
                    </p>
                  </Flex>
                )}
                <Flex direction="column" w="100%">
                  <label>Tipo de Moneda</label>
                  <select
                    defaultValue={"moneda"}
                    className="select-form"
                    name="moneda"
                    required
                    placeholder="Tipo de Moneda"
                    fontSize="2xl"
                    {...register("moneda")}
                  >
                    <option disabled>Tipo de Moneda</option>
                    <option value="USD">USD</option>
                    <option value="$">$</option>
                  </select>
                  {errors.moneda && <p>{errors.moneda.message}</p>}
                </Flex>
                <Flex direction="column" w="100%">
                  <label>Precio</label>
                  <Controller
                    name="precio"
                    control={control}
                    rules={{
                      required: "*Este campo es requerido",
                      max: {
                        value: 500000,
                        message: "*Se excede el máximo permitido",
                      },
                      min: {
                        value: 1,
                        message: "*El mínimo permitido es 1",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "*Ingrese un número válido",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        className="select-form"
                        fontSize="2xl"
                        required
                        placeholder="Precio"
                        autoComplete="off"
                        name="precio"
                        type="number"
                        defaultValue={inmuebleId.precio}
                        {...register("precio")}
                        {...field}
                      />
                    )}
                  />

                  <p className="textError">
                    {errors.precio && errors.precio.message}
                  </p>
                </Flex>
                <br />
              </Flex>
              <Flex direction="column" w="100%">
                <label>Descripción</label>
                <Controller
                  name="descripcion"
                  control={control}
                  rules={{
                    required: "*Este campo es requerido",
                    maxLength: {
                      value: 300,
                      message: "*Se excede el máximo permitido de caracteres",
                    },
                    minLength: {
                      value: 20,
                      message: "*El mínimo permitido de caracteres es 20",
                    },
                  }}
                  render={({ field }) => (
                    <textarea
                      className="select-form"
                      placeholder="Descripción"
                      name="descripcion"
                      defaultValue={inmuebleId.descripcion}
                      {...register("descripcion")}
                      {...field}
                    />
                  )}
                />
                <p className="textError">
                  {errors.descripcion && errors.descripcion.message}
                </p>
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
                autoComplete="off"
                name="images"
                type="file"
                {...register("images", {
                  required: "Este campo es requerido",
                  validate: (files) => {
                    if (!files || files.length === 0) {
                      return "Este campo es requerido";
                    }
                    if (files.length > 10) {
                      return "No puedes cargar más de 10 imágenes";
                    }
                    for (let i = 0; i < files.length; i++) {
                      const file = files[i];
                      const allowedExtensions = [
                        "jpg",
                        "jpeg",
                        "png",
                        "gif",
                        "bmp",
                      ];
                      const fileExtension = file.name
                        .split(".")
                        .pop()
                        .toLowerCase();
                      if (!allowedExtensions.includes(fileExtension)) {
                        return "Formato de imagen no válido";
                      }
                    }
                    return true;
                  },
                })}
              />
            )}
            <p className="textError">
              {errors.images && errors.images.message}
            </p>

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
      ) : null}
    </>
  );
}

export default RegistroInmueble;
