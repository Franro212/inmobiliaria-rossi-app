////////import componentes//////////////////////////
import Header from "../../Components/Header/Header";
import Main from "../../Components/Main/Main";
import Servicios from "../../Components/servicios/Servicios";
import Footer from "../../Components/Footer/Footer";
import FormContact from "../../Components/FormContact/FormContact";
import CardInmuebleHome from "../../Components/CardInmueble/CardInmueble";
import { AspectRatio } from "@chakra-ui/react";

import "./App.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListaInmuebles } from "../../Api/Rule_auth_inmobiliaria";

function App() {
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
      <div>
        <Header />
      </div>
      <div>
        <Main />
      </div>
      <div>
        <Servicios />
      </div>

      <div className="imgApp"></div>

      <div className="containerSectInmuebles">
        <div className="containerTitleSection">
          <h3 className="secSubtitle">Inmuebles</h3>
          <h2 className="secTitle">Últimos ingresos</h2>
        </div>
        <div className="containerCard">
          {inmuebles.slice(0, 4).map((inmueble, index) => (
            <CardInmuebleHome key={index} inmueble={inmueble} />
          ))}
        </div>

        <div className="contBtnApp">
          <Link to={"/pagePropiedades"}>
            {" "}
            <button className="btnRed btnVerMas">Ver más inmuebles </button>
          </Link>
        </div>
      </div>

      <div className="containerSectContact">
        <div className="containerTitleSection">
          <h3 className="secSubtitle" id="contacto">
            Contacto
          </h3>
          <h2 className="secTitle">¿Tienes alguna duda?</h2>
          <p className="description">
            Sus comentarios y sugerencias son importantes para poder mejorar
            nuestra atención, gracias por contactarnos
          </p>
        </div>
        <div className="contFormMap">
          <div className="contMap">
            <AspectRatio ratio={16 / 9}>
              <iframe src="https://www.google.com/maps/embed/v1/place?q=inmobiliaria+rossi&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" />
            </AspectRatio>
          </div>
          <div className="containerFormContact">
            <FormContact />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
