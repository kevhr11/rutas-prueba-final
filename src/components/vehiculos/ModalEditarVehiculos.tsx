import React, { useEffect } from "react";
import { dataVehiculos } from "@/app/vehiculos/dataVehiculosInterface";
import { Form, Input, Button, Modal } from "antd";

interface ModalEditarProps {
  modalVisibleEditar: boolean;
  setModalVisibleEditar: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditData: (values: dataVehiculos, id: string) => void;
  getDataEditar: dataVehiculos | undefined;
}

const ModalEditar: React.FC<ModalEditarProps> = ({
  modalVisibleEditar,
  setModalVisibleEditar,
  handleEditData,
  getDataEditar,
}) => {
  const [form] = Form.useForm();
  const { Item } = Form;

  useEffect(() => {
    if (modalVisibleEditar && getDataEditar) {
      form.setFieldsValue(getDataEditar);
    }
  }, [modalVisibleEditar, getDataEditar, form]);

  const cerrarModalEditar = () => {
    form.resetFields();
    setModalVisibleEditar(false);
  };

  const accionEditar = () => {
    form
      .validateFields()
      .then((values) => {
        if (getDataEditar && getDataEditar.key !== undefined) {
          handleEditData(values, getDataEditar.key);
        }
        cerrarModalEditar();
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
      title="Editar vehiculos"
      open={modalVisibleEditar}
      onOk={accionEditar}
      onCancel={cerrarModalEditar}
      centered
      footer={[
        <Button onClick={cerrarModalEditar}>Cancelar</Button>,
        <Button type="primary" onClick={accionEditar}>
          Guardar
        </Button>,
      ]}
    >
      <Form form={form} initialValues={getDataEditar || {}} {...layoutForm}>
        <Item
          label="Foto"
          name="foto"
          rules={[
            {
              required: true,
              message: "Debe ingresar la foto del vehiculo",
            },
            {
              pattern: /^[a-zA-Z0-9_.-\s]*$/, // Expresión regular para aceptar letras y espacios
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
              pattern: /^[a-zA-Z0-9_.-\s]*$/, // Expresión regular para aceptar letras y espacios
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
              pattern: /^[a-zA-Z0-9_.-\s]*$/, // Expresión regular para aceptar letras y espacios
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
              pattern: /^[a-zA-Z0-9_.-\s]*$/, // Expresión regular para aceptar letras y espacios
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
              pattern: /^[a-zA-Z0-9_.-\s]*$/, // Expresión regular para aceptar letras y espacios
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
              pattern: /^[a-zA-Z0-9_.-\s]*$/, // Expresión regular para aceptar letras y espacios
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
              pattern: /^[a-zA-Z0-9_.-\s]*$/, // Expresión regular para aceptar letras y espacios
              message: "Solo se permite texto con espacios",
            },
          ]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

export default ModalEditar;
