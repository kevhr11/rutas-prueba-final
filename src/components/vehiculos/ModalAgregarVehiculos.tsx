import React, { useState } from "react";
import { dataVehiculos } from "@/app/vehiculos/dataVehiculosInterface";
import { Form, Input, Button, Modal } from "antd";

interface ModalAgregarProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddData: (rowData: dataVehiculos) => void;
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
      title="Agregar vehiculo"
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
          label="Foto"
          name="foto"
          rules={[
            {
              required: true,
              message: "Debe ingresar la foto del vehiculo",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Marca del vehiculo"
          name="marca"
          rules={[
            {
              required: true,
              message: "Debe ingresar la marca del vehiculo",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Modelo del vehiculo"
          name="modelo"
          rules={[
            {
              required: true,
              message: "Debe ingresar el modelo del vehiculo",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Año del vehiculo"
          name="year"
          rules={[
            {
              required: true,
              message: "Debe ingresar el año del vehiculo",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Placa del vehiculo"
          name="placa"
          rules={[
            {
              required: true,
              message: "Debe ingresar la placa del vehiculo",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Capacidad del vehiculo"
          name="capacidad"
          rules={[
            {
              required: true,
              message: "Debe ingresar la capacidad del vehiculo",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Tipo de vehiculo"
          name="tipoVehiculo"
          rules={[
            {
              required: true,
              message: "Debe ingresar el tipo de vehiculo",
            },
            {
              pattern: /^[A-Za-z\s]+$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
        <Item></Item>
      </Form>
    </Modal>
  );
};

export default ModalAgregar;