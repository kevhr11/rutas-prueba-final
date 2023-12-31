import React, { useState } from "react";
import { dataTable } from "@/app/rutas/dataTableInterface";
import { Form, Input, Button, Modal } from "antd";

interface ModalAgregarProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddData: (rowData: dataTable) => void;
}

const ModalAgregar: React.FC<ModalAgregarProps> = ({
  modalVisible,
  setModalVisible,
  handleAddData,
}) => {
  const [form] = Form.useForm();
  const { Item } = Form;

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

  const layoutForm = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 10,
    },
  };

  return (
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
          Guardar
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
            {
              pattern: /^[a-zA-ZáéíóúüÜÁÉÍÓÚ\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
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
            {
              pattern: /^[a-zA-ZáéíóúüÜÁÉÍÓÚ\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
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
            {
              pattern: /^[a-zA-ZáéíóúüÜÁÉÍÓÚ\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
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
            {
              pattern: /^[a-zA-ZáéíóúüÜÁÉÍÓÚ\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
        {/* <Item
          label="Georreferenciacion"
          name="georreferenciacion"
          rules={[
            {
              required: true,
              message: "Debe ingresar la georreferenciacion",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item> */}
        {/*  <Item
          label="Ver georreferenciacion"
          name="verGeorreferenciacion"
          rules={[
            {
              required: true,
              message: "Debe ingresar ver la georreferenciacion",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item> */}
      </Form>
    </Modal>
  );
};

export default ModalAgregar;
