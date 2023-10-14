import { useForm, Controller } from "react-hook-form";
import { sendEmail } from "../../Api/Rule_email";
import "./formContact.css";

function FormContact() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      sendEmail(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="containerLogin">
        <form onSubmit={handleSubmit(onSubmit)} className="formContact">
          <div>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "*Este campo es requerido",
                minLength: {
                  value: 10,
                  message: "*Debes ingresar tu nombre completo",
                },
                maxLength: {
                  value: 50,
                  message: "*No puedes ingresar mas de 50 caracteres",
                },
              }}
              render={({ field }) => (
                <input className="inputForm" placeholder="Nombre Completo" {...field} />
              )}
            />
            <p className="textError">{errors.name && errors.name.message}</p>
          </div>

          <div>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "*Este campo es requerido",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "*Correo electrónico inválido",
                },
              }}
              render={({ field }) => (
                <input className="inputForm" placeholder="Email" {...field} />
              )}
            />
            <p className="textError">{errors.email && errors.email.message}</p>
          </div>

          <div>
            <Controller
              name="message"
              control={control}
              rules={{
                required: "*Este campo es requerido",
                maxLength: {
                  value: 1000,
                  message: "*Mensaje demasiado largo",
                },
                minLength: {
                  value: 10,
                  message: "*Mensaje demasiado corto",
                },
              }}
              render={({ field }) => (
                <textarea
                  className="inputForm"
                  placeholder="Deja tu consulta aquí"
                  {...field}
                />
              )}
            />
            <p className="textError">{errors.message && errors.message.message}</p>
          </div>

          <br />
          <br />
          <input className="btnLogin btnForm" type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}

export default FormContact;
