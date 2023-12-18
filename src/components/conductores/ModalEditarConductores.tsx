import React, { useEffect } from "react";
import { dataConductores } from "@/app/conductores/dataConductoresInterface";
import { Form, Input, Button, Modal } from "antd";

interface ModalEditarProps {
  modalVisibleEditar: boolean;
  setModalVisibleEditar: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditData: (values: dataConductores, id: string) => void;
  getDataEditar: dataConductores | undefined;
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
      title="Editar conductor"
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
              message: "Debe ingresar la foto del conductor",
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
          label="Nombre del conductor"
          name="nombre"
          rules={[
            {
              required: true,
              message: "Debe ingresar el nombre del conductor",
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
          label="DUI del conductor"
          name="dui"
          rules={[
            {
              required: true,
              message: "Debe ingresar el DUI del conductor",
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
          label="Dirección del conductor"
          name="direccion"
          rules={[
            {
              required: true,
              message: "Debe ingresar la dirección del conductor",
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
          label="Edad del conductor"
          name="edad"
          rules={[
            {
              required: true,
              message: "Debe ingresar la edad del conductor",
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
          label="Licencia del conductor"
          name="licencia"
          rules={[
            {
              required: true,
              message: "Debe ingresar la licencia del conductor",
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
          label="Telefono del conductor"
          name="telefono"
          rules={[
            {
              required: true,
              message: "Debe ingresar el telefono del conductor",
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
          label="Correo del conductor"
          name="correo"
          rules={[
            {
              required: true,
              message: "Debe ingresar el correo del conductor",
            },
            {
              pattern: /^[a-zA-Z0-9_.@\s-]*$/, // Expresión regular para aceptar letras y espacios
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
