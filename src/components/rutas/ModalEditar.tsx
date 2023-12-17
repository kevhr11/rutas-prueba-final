import React, { useEffect } from "react";
import { dataTable } from "@/app/rutas/dataTableInterface";
import { Form, Input, Button, Modal } from "antd";

interface ModalEditarProps {
  modalVisibleEditar: boolean;
  setModalVisibleEditar: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditData: (values: dataTable, id: string) => void;
  getDataEditar: dataTable | undefined;
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
      title="Editar ruta"
      open={modalVisibleEditar}
      onOk={accionEditar}
      onCancel={cerrarModalEditar}
      centered
      footer={[
        <Button onClick={cerrarModalEditar}>Cancelar</Button>,
        <Button type="primary" onClick={accionEditar}>
          Enviar
        </Button>,
      ]}
    >
      <Form form={form} initialValues={getDataEditar || {}} {...layoutForm}>
        <Item
          label="Tipo de Viaje"
          name="tipoViaje"
          rules={[
            {
              required: true,
              message: "Debe ingresar el tipo de viaje",
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
          label="Nombre de la ruta"
          name="nombreRuta"
          rules={[
            {
              required: true,
              message: "Debe ingresar el nombre de la ruta",
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
          label="Origen de la ruta"
          name="origenRuta"
          rules={[
            {
              required: true,
              message: "Debe ingresar el origen de la ruta",
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
          label="Destino de la ruta"
          name="destinoRuta"
          rules={[
            {
              required: true,
              message: "Debe ingresar el destino de la ruta",
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
        </Item>
        <Item
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
        </Item>
      </Form>
    </Modal>
  );
};

export default ModalEditar;