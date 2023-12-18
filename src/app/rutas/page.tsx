"use client";

import axios from "axios";
import { dataTable } from "./dataTableInterface";
import React, { useEffect, useState } from "react";
import Table from "../../components/rutas/Table";
import ModalAgregar from "@/components/rutas/ModalAgregar";
import { Form, Input, Button, Col, Row, Modal } from "antd";
import ModalEditar from "@/components/rutas/ModalEditar";
const { Item } = Form;

const Page = () => {
  const [getData, setGetData] = useState<dataTable[]>([]);
  const [getDataEditar, setGetDataEditar] = useState<dataTable>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState<boolean>(false);
  const [form] = Form.useForm();

  /* --------------------Metodo para obtener datos------------------------------------------------------ */
  const obtenerDatos = async () => {
    try {
      const firebaseURL =
        "https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/rutas";

      const response = await axios.get(firebaseURL);

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

      /* console.log("Datos obtenidos exitosamente");
      console.log(datosConvertidos); */
      setGetData(datosConvertidos);
    } catch (error) {
      // Manejar errores de manera más informativa
      console.error("Error al obtener datos de Firebase:", error);
    }
  };

  //Obtener datos
  useEffect(() => {
    obtenerDatos();
  }, []);

  /* --------------------Metodo para insertar datos------------------------------------------------------ */
  const handleAddData = async (values: dataTable) => {
    console.log("datos", values);
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

  /* --------------------Metodo para editar datos------------------------------------------------------ */
  const handleEditData = async (values: dataTable, id: string) => {
    console.log("datos", values);
    try {
      const response = await axios.patch(
        `https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/rutas/${id}`,
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
      console.log("Datos editados con éxito:", response.data);
      await obtenerDatos();
    } catch (error) {
      console.error("Error al editar datos:", error);
    }
  };

  /* ------------------------------ Función Modal Insertar ------------------------------ */
  const abrirModal = () => {
    setModalVisible(true);
  };

  /* ------------------------------ Funciones Modal Editar ------------------------------ */

  const seleccionarRutaEditar = (rowData: dataTable) => {
    abrirModalEditar(rowData);
  };

  const abrirModalEditar = (rowData: dataTable) => {
    form.setFieldsValue(rowData);
    setGetDataEditar(rowData);
    setModalVisibleEditar(true);
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

          {/* ------------------------Componente para el modal agregar----------------------------------- */}
          <ModalAgregar
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleAddData={handleAddData}
          />
          <br />
          <br />

          {/* ------------------------Componente para el modal Editar------------------------------------ */}
          <ModalEditar
            modalVisibleEditar={modalVisibleEditar}
            setModalVisibleEditar={setModalVisibleEditar}
            handleEditData={handleEditData}
            getDataEditar={getDataEditar}
          />
          {/* ------------------------Componente de tabla donde se muestran los datos------------------------------------ */}
          <Table data={getData} modalEditar={seleccionarRutaEditar} />
        </Col>
      </Row>
    </div>
  );
};

export default Page;
