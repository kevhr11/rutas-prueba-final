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
  const [getDataEditar, setGetDataEditar] = useState<dataTable>();
  /* const [envioDatos, setEnvioDatos] = useState({
    tipoViaje: "",
    nombreRuta: "",
    origenRuta: "",
    destinoRuta: "",
    georreferenciacion: "",
    verGeorreferenciacion: "",
  }); */

  /* Agregar */

  const [tipoViajeInput, setTipoViajeInput] = useState<string>("");
  const [nombreRutaInput, setNombreRutaInput] = useState<string>("");
  const [origenRutaInput, setOrigenRutaInput] = useState<string>("");
  const [destinoRutaInput, setDestinoRutaInput] = useState<string>("");
  const [georreferenciacionInput, setGeorreferenciacionInput] =
    useState<string>("");
  const [verGeorreferenciacionInput, setVerGeorreferenciacionInput] =
    useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState<boolean>(false);
  const [form] = Form.useForm();
  
  /* Editar */
  const [tipoViajeInputEditar, setTipoViajeInputEditar] = useState<string>("");
  const [nombreRutaInputEditar, setNombreRutaInputEditar] = useState<string>("");
  const [origenRutaInputEditar, setOrigenRutaInputEditar] = useState<string>("");
  const [destinoRutaInputEditar, setDestinoRutaInputEditar] = useState<string>("");
  const [georreferenciacionInputEditar, setGeorreferenciacionInputEditar] =
    useState<string>("");
  const [verGeorreferenciacionInputEditar, setVerGeorreferenciacionInputEditar] =
    useState<string>("");


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

  const handleAddData = async (values: dataTable) => {
    console.log("datos",values)
    try {
      const response = await axios.post(
        `https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/rutas`,
        {
          fields: {
            tipoViaje: { stringValue: values.tipoViaje },
            nombreRuta: { stringValue: values.nombreRuta },
            origenRuta: { stringValue: values.origenRuta },
            destinoRuta: { stringValue: values.destinoRuta },
            georreferenciacion: { stringValue: values.georreferenciacion },
            verGeorreferenciacion: {
              stringValue: values.verGeorreferenciacion,
            },
          },
        }
      );
      console.log("Datos agregados con éxito:", response.data);
      await obtenerDatos();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };

  /* ------------------------------ Funciones Modal Insertar ------------------------------ */

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
        handleAddData(values);
        cerrarModal();
      })
      .catch((errorInfo) => {
        console.log("Error al validar campos:", errorInfo);
      });
  };

  /* ------------------------------ Funciones Modal Editar ------------------------------ */

  const abrirModalEditar = () => {
    setModalVisibleEditar(true);
  };

  const cerrarModalEditar = () => {
    setModalVisibleEditar(false);
    form.resetFields();
  };

  const seleccionarRutaEditar = (rowData: dataTable) => {
    setGetDataEditar(rowData);
    console.log(rowData);
    abrirModalEditar();
  };

  const accionEditar = () => {
    form
      .validateFields()
      .then((values) => {
        // Aquí puedes enviar los datos a la API
        console.log("Datos a enviar:", values);
        /* handleAddData(values); */
        cerrarModal();
      })
      .catch((errorInfo) => {
        console.log("Error al validar campos:", errorInfo);
      });
  };



  const layoutForm = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 10,
    },
  };

  return (
    <div>
      Rutas Page
      <Row justify="center">
        <Col xs={22} sm={20} md={18} lg={20}>
          {/* ---------------- Modal insertar -------------------- */}
          <Button type="primary" onClick={abrirModal}>
            Agregar ruta
          </Button>
          <br />
          <br />
          <Modal
            title="Agregar ruta"
            open={modalVisible}
            onOk={accion}
            onCancel={cerrarModal}
            destroyOnClose={true}
            centered
            footer={[
              <Button onClick={cerrarModal}>Cancelar</Button>,
              <Button type="primary" onClick={accion}>
                Enviar
              </Button>,
            ]}
          >
            <Form form={form} {...layoutForm}>
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
              </Item>
              <Item></Item>
            </Form>
          </Modal>

          {/* ------------------------Modal Editar------------------------------------ */}

          <Modal
            title="Editar ruta"
            open={modalVisibleEditar}
            onOk={accion}
            onCancel={cerrarModalEditar}
            destroyOnClose={true}
            centered
            footer={[
              <Button onClick={cerrarModalEditar}>Cancelar</Button>,
              <Button type="primary" onClick={accionEditar}>
                Enviar
              </Button>,
            ]}
          >
            <Form form={form} {...layoutForm}>
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
                <Input
                  onChange={(e) => setTipoViajeInputEditar(e.target.value)}
                  defaultValue={getDataEditar && getDataEditar.tipoViaje}
                />
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
                <Input
                  onChange={(e) => setNombreRutaInputEditar(e.target.value)}
                  defaultValue={getDataEditar && getDataEditar.nombreRuta}
                />
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
                <Input
                  onChange={(e) => setOrigenRutaInputEditar(e.target.value)}
                  defaultValue={getDataEditar && getDataEditar.origenRuta}
                />
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
                <Input
                  onChange={(e) => setDestinoRutaInputEditar(e.target.value)}
                  defaultValue={getDataEditar && getDataEditar.destinoRuta}
                />
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
                  onChange={(e) =>
                    setGeorreferenciacionInputEditar(e.target.value)
                  }
                  defaultValue={getDataEditar && getDataEditar.georreferenciacion}
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
                    setVerGeorreferenciacionInputEditar(e.target.value)
                  }
                  defaultValue={
                    getDataEditar && getDataEditar.verGeorreferenciacion
                  }
                />
              </Item>
              <Item></Item>
            </Form>
          </Modal>
          {/* <Table data={getData} modalEditar={abrirModalEditar} /> */}
          <Table data={getData} modalEditar={seleccionarRutaEditar} />
        </Col>
      </Row>
    </div>
  );
};

export default Page;
