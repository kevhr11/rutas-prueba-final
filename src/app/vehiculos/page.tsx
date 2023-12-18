"use client";

import axios from "axios";
import { Card, Button, Form, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { dataVehiculos } from "./dataVehiculosInterface";
import ModalAgregar from "@/components/vehiculos/ModalAgregarVehiculos";
import ModalEditar from "@/components/vehiculos/ModalEditarVehiculos";

const Page: React.FC = () => {
  const [getData, setGetData] = useState<dataVehiculos[]>([]);
  const [getDataEditar, setGetDataEditar] = useState<dataVehiculos>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState<boolean>(false);
  const [form] = Form.useForm();

  /* --------------------Metodo para obtener datos------------------------------------------------------ */
  const obtenerDatos = async () => {
    try {
      const firebaseURL =
        "https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/vehiculos";

      const response = await axios.get(firebaseURL);

      // Convertir los datos de la API a la estructura que MyTable espera
      const datosConvertidos: dataVehiculos[] = response.data.documents.map(
        (item: any) => {
          const partesCadena = item.name.split("/");
          return {
            key: partesCadena[partesCadena.length - 1],
            foto: item.fields.foto.stringValue,
            marca: item.fields.marca.stringValue,
            modelo: item.fields.modelo.stringValue,
            year: item.fields.year.stringValue,
            placa: item.fields.placa.stringValue,
            capacidad: item.fields.capacidad.stringValue,
            tipoVehiculo: item.fields.tipoVehiculo.stringValue,
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
  const handleAddData = async (values: dataVehiculos) => {
    console.log("datos", values);
    try {
      const response = await axios.post(
        `https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/vehiculos`,
        {
          fields: {
            foto: { stringValue: values.foto },
            marca: { stringValue: values.marca },
            modelo: { stringValue: values.modelo },
            year: { stringValue: values.year },
            placa: { stringValue: values.placa },
            capacidad: { stringValue: values.capacidad },
            tipoVehiculo: { stringValue: values.tipoVehiculo },
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
  const handleEditData = async (values: dataVehiculos, id: string) => {
    console.log("datos ingresar", values);
    try {
      const response = await axios.patch(
        `https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/vehiculos/${id}`,
        {
          fields: {
            foto: { stringValue: values.foto },
            marca: { stringValue: values.marca },
            modelo: { stringValue: values.modelo },
            year: { stringValue: values.year },
            placa: { stringValue: values.placa },
            capacidad: { stringValue: values.capacidad },
            tipoVehiculo: { stringValue: values.tipoVehiculo },
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

  const seleccionarRutaEditar = (rowData: dataVehiculos) => {
    abrirModalEditar(rowData);
  };

  const abrirModalEditar = (rowData: dataVehiculos) => {
    form.setFieldsValue(rowData);
    setGetDataEditar(rowData);
    setModalVisibleEditar(true);
  };

  return (
    <div>
      {/* ---------------- Modal insertar -------------------- */}
      <Button type="primary" onClick={abrirModal}>
        Agregar vehiculo
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
                <p><b>Foto: </b>{item.foto}</p>
                <p><b>Marca: </b>{item.marca}</p>
                <p><b>Modelo: </b>{item.modelo}</p>
                <p><b>Año: </b>{item.year}</p>
                <p><b>Placa: </b>{item.placa}</p>
                <p><b>Capacidad: </b>{item.capacidad}</p>
                <p><b>Tipo de Vehiculo: </b>{item.tipoVehiculo}</p>
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
