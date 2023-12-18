"use client";

import axios from "axios";
import { Card, Button, Form, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { dataProgramacionViajes } from "./dataProgramacionViajes";
import ModalAgregar from "@/components/programacionviaje/ModalAgregarProgramacionViaje";
import ModalEditar from "@/components/programacionviaje/ModalEditarProgramacionViaje";

const Page: React.FC = () => {
  const [getData, setGetData] = useState<dataProgramacionViajes[]>([]);
  const [getDataEditar, setGetDataEditar] = useState<dataProgramacionViajes>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState<boolean>(false);
  const [form] = Form.useForm();

  /* --------------------Metodo para obtener datos------------------------------------------------------ */
  const obtenerDatos = async () => {
    try {
      const firebaseURL =
        "https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/programacionviaje";

      const response = await axios.get(firebaseURL);

      // Convertir los datos de la API a la estructura que MyTable espera
      const datosConvertidos: dataProgramacionViajes[] = response.data.documents.map(
        (item: any) => {
          const partesCadena = item.name.split("/");
          return {
            key: partesCadena[partesCadena.length - 1],
            nombreViaje: item.fields.nombreViaje.stringValue,
            fechaHoraRecorrida: item.fields.fechaHoraRecorrida.stringValue,
            fechaHoraLlegada: item.fields.fechaHoraLlegada.stringValue,
            conductor: item.fields.conductor.stringValue,
            vehiculo: item.fields.vehiculo.stringValue,
            ruta: item.fields.ruta.stringValue,
          };
        }
      );

      /* console.log("Datos obtenidos exitosamente", datosConvertidos); */
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
  const handleAddData = async (values: dataProgramacionViajes) => {
    console.log("file ", values);

    try {
      // Insertar datos en Firestore con la URL de la imagen
      const firestoreURL =
        "https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/programacionviaje";
      const response = await axios.post(
        firestoreURL,
        {
          fields: {
            nombreViaje: { stringValue: values.nombreViaje },
            fechaHoraRecorrida: { stringValue: values.fechaHoraRecorrida },
            fechaHoraLlegada: { stringValue: values.fechaHoraLlegada },
            conductor: { stringValue: values.conductor },
            vehiculo: { stringValue: values.vehiculo },
            ruta: { stringValue: values.ruta },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Datos agregados con éxito:", response.data);
      // Actualizar la lista de datos después de agregar
      await obtenerDatos();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };
  /* const handleAddData = async (values: dataConductores) => {
    console.log("file ", values.foto);

    try {
      // Crear un formulario para enviar la imagen
      const formData = new FormData();
      formData.append("file", values.foto);

      // Subir la imagen a Firebase Storage
      const firebaseStorageURL =
        "https://firebasestorage.googleapis.com/v0/b/rutas-c1289/o";
      const imageName = `images/${values.foto}`;
      const storageUploadURL = `${firebaseStorageURL}/${imageName}?uploadType=media`;
      await axios.put(storageUploadURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Obtener la URL de la imagen almacenada
      const imageUrl = `${firebaseStorageURL}/${imageName}`;

      // Insertar datos en Firestore con la URL de la imagen
      const firestoreURL =
        "https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/conductores";
      const response = await axios.post(
        firestoreURL,
        {
          fields: {
            foto: { stringValue: imageUrl },
            nombre: { stringValue: values.nombre },
            dui: { stringValue: values.dui },
            direccion: { stringValue: values.direccion },
            edad: { stringValue: values.edad },
            licencia: { stringValue: values.licencia },
            telefono: { stringValue: values.telefono },
            correo: { stringValue: values.correo },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Datos agregados con éxito:", response.data);
      // Actualizar la lista de datos después de agregar
      await obtenerDatos();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  }; */

  /* --------------------Metodo para editar datos------------------------------------------------------ */
  const handleEditData = async (values: dataProgramacionViajes, id: string) => {
    console.log("datos ingresar", values);
    try {
      const response = await axios.patch(
        `https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/programacionviaje/${id}`,
        {
          fields: {
            nombreViaje: { stringValue: values.nombreViaje },
            fechaHoraRecorrida: { stringValue: values.fechaHoraRecorrida },
            fechaHoraLlegada: { stringValue: values.fechaHoraLlegada },
            conductor: { stringValue: values.conductor },
            vehiculo: { stringValue: values.vehiculo },
            ruta: { stringValue: values.ruta },
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

  const seleccionarRutaEditar = (rowData: dataProgramacionViajes) => {
    abrirModalEditar(rowData);
  };

  const abrirModalEditar = (rowData: dataProgramacionViajes) => {
    form.setFieldsValue(rowData);
    setGetDataEditar(rowData);
    setModalVisibleEditar(true);
  };

  return (
    <div>
      {/* ---------------- Modal insertar -------------------- */}
      <Button type="primary" onClick={abrirModal}>
        Agregar conductor
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
      <Row gutter={16}>
        {getData ? (
          getData.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card
                title="Card title"
                hoverable={true}
                extra={
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => seleccionarRutaEditar(item)}
                  />
                }
                style={{ width: "100%", marginBottom: 16, textAlign: "center" }}
              >
                <p>
                  <b>Nombre del viaje: </b>
                  {item.nombreViaje}
                </p>
                <p>
                  <b>Fecha y hora de recogida: </b>
                  {item.fechaHoraRecorrida}
                </p>
                <p>
                  <b>Fecha y hora de llegada: </b>
                  {item.fechaHoraLlegada}
                </p>
                <p>
                  <b>Conductor seleccionado: </b>
                  {item.conductor}
                </p>
                <p>
                  <b>Vehiculo seleccionado: </b>
                  {item.vehiculo}
                </p>
                <p>
                  <b>Ruta seleccionada: </b>
                  {item.ruta}
                </p>
              </Card>
            </Col>
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </Row>
    </div>
  );
};

export default Page;
