"use client";

import axios from "axios";
import { dataTable } from "./dataTableInterface";
import React, { useEffect, useState } from "react";
import Table from "../../components/rutas/Table";
import { Form, Input, Button, Col, Row, Modal } from "antd";
const { Item } = Form;

/* interface rutas {
  id: string;
  tipoViaje: {
    stringValue: string;
  };
  nombreRuta: {
    stringValue: string;
  };
  origenRuta: {
    stringValue: string;
  };
  destinoRuta: {
    stringValue: string;
  };
  georreferenciacion: {
    stringValue: string;
  };
  verGeorreferenciacion: {
    stringValue: string;
  };
} */

const Page = () => {
  const [getData, setGetData] = useState<dataTable[]>([]);
  /* const [envioDatos, setEnvioDatos] = useState({
    tipoViaje: "",
    nombreRuta: "",
    origenRuta: "",
    destinoRuta: "",
    georreferenciacion: "",
    verGeorreferenciacion: "",
  }); */

  const [tipoViajeInput, setTipoViajeInput] = useState<string>("");
  const [nombreRutaInput, setNombreRutaInput] = useState<string>("");
  const [origenRutaInput, setOrigenRutaInput] = useState<string>("");
  const [destinoRutaInput, setDestinoRutaInput] = useState<string>("");
  const [georreferenciacionInput, setGeorreferenciacionInput] =
    useState<string>("");
  const [verGeorreferenciacionInput, setVerGeorreferenciacionInput] =
    useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const obtenerDatos = async () => {
    try {
      const firebaseURL =
        "https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/rutas";

      const response = await axios.get(firebaseURL);

      /* let datos: Array<rutas> = [];
      // Verificar la estructura de la respuesta
      response.data.documents.map((item: any) => {
        //Dividir cadane mediante la /
        const partesCadena = item.name.split("/");
        return (datos = [
          ...datos,
          { ...item.fields, id: partesCadena[partesCadena.length - 1] },
        ]);
      }); */

      // Convertir los datos de la API a la estructura que MyTable espera
      const datosConvertidos: dataTable[] = response.data.documents.map(
        (item: any) => {
          const partesCadena = item.name.split("/");
          return {
            key: partesCadena[partesCadena.length - 1],
            tipoViaje: item.fields.tipoViaje.stringValue,
            nombreRuta: item.fields.nombreRuta.stringValue,
            origenRuta: item.fields.origenRuta.stringValue,
            destinoRuta: item.fields.destinoRuta.stringValue,
            georreferenciacion: item.fields.georreferenciacion.stringValue,
            verGeorreferenciacion:
              item.fields.verGeorreferenciacion.stringValue,
          };
        }
      );

      console.log("Datos obtenidos exitosamente");
      console.log(datosConvertidos);
      setGetData(datosConvertidos);

      /* console.log("Datos obtenidos exitosamente", datos);
      setGetData(datos); */
    } catch (error) {
      // Manejar errores de manera más informativa
      console.error("Error al obtener datos de Firebase:", error);
    }
  };

  //Obtener datos
  useEffect(() => {
    obtenerDatos();
  }, []);

  const handleAddData = async () => {
    try {
      const response = await axios.post(
        `https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/rutas`,
        {
          fields: {
            tipoViaje: { stringValue: tipoViajeInput },
            nombreRuta: { stringValue: nombreRutaInput },
            origenRuta: { stringValue: origenRutaInput },
            destinoRuta: { stringValue: destinoRutaInput },
            georreferenciacion: { stringValue: georreferenciacionInput },
            verGeorreferenciacion: { stringValue: verGeorreferenciacionInput },
            /* tipoViaje: { stringValue: envioDatos.tipoViaje },
            nombreRuta: { stringValue: envioDatos.nombreRuta },
            origenRuta: { stringValue: envioDatos.origenRuta },
            destinoRuta: { stringValue: envioDatos.destinoRuta },
            georreferenciacion: { stringValue: envioDatos.georreferenciacion },
            verGeorreferenciacion: {
              stringValue: envioDatos.verGeorreferenciacion,
            }, */
            // ... otros campos
          },
        }
      );
      console.log("Datos agregados con éxito:", response.data);
      await obtenerDatos();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const accion = () => {
    form
      .validateFields()
      .then((values) => {
        // Aquí puedes enviar los datos a la API
        console.log("Datos a enviar:", values);
        handleAddData();
        cerrarModal();
      })
      .catch((errorInfo) => {
        console.log("Error al validar campos:", errorInfo);
      });
  };

  const verificarDatos = () => {
    console.log(tipoViajeInput);
  };

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      Rutas Page
      <Row justify="center">
        <Col xs={22} sm={20} md={18} lg={20}>
          <Button type="primary" onClick={abrirModal}>
            Open Modal
          </Button>
          <br />
          <br />
          <Modal
            title="Agregar rutas"
            open={modalVisible}
            onOk={accion}
            onCancel={cerrarModal}
            centered
            footer={[
              <Button onClick={cerrarModal}>Cancelar</Button>,
              <Button type="primary" onClick={accion}>
                Enviar
              </Button>,
            ]}
          >
            <Form form={form}>
              <Item
                label="Tipo de Viaje"
                name="tipoViaje"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar el tipo de viaje",
                  },
                ]}
              >
                <Input onChange={(e) => setTipoViajeInput(e.target.value)} />
              </Item>
              <Item
                label="Nombre de la ruta"
                name="nombreRuta"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar el nombre de la ruta",
                  },
                ]}
              >
                <Input onChange={(e) => setNombreRutaInput(e.target.value)} />
              </Item>
              <Item
                label="Origen de la ruta"
                name="origenRuta"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar el origen de la ruta",
                  },
                ]}
              >
                <Input onChange={(e) => setOrigenRutaInput(e.target.value)} />
              </Item>
              <Item
                label="Destino de la ruta"
                name="destinoRuta"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar el destino de la ruta",
                  },
                ]}
              >
                <Input onChange={(e) => setDestinoRutaInput(e.target.value)} />
              </Item>
              <Item
                label="Georreferenciacion"
                name="georreferenciacion"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar la georreferenciacion",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setGeorreferenciacionInput(e.target.value)}
                />
              </Item>
              <Item
                label="Ver georreferenciacion"
                name="verGeorreferenciacion"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar ver la georreferenciacion",
                  },
                ]}
              >
                <Input
                  onChange={(e) =>
                    setVerGeorreferenciacionInput(e.target.value)
                  }
                />
              </Item>
              <Item></Item>
            </Form>
          </Modal>
          <Table data={getData} />
        </Col>
      </Row>
    </div>
  );
};

export default Page;
