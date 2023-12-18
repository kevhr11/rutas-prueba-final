import React, { useEffect } from "react";
import { dataProgramacionViajes } from "@/app/programacionviajes/dataProgramacionViajes";
import { Form, Input, Button, Modal } from "antd";

interface ModalEditarProps {
  modalVisibleEditar: boolean;
  setModalVisibleEditar: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditData: (values: dataProgramacionViajes, id: string) => void;
  getDataEditar: dataProgramacionViajes | undefined;
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
      title="Editar programación de viajes"
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
          label="Nombre del viaje"
          name="nombreViaje"
          rules={[
            {
              required: true,
              message: "Debe ingresar el nombre del viaje",
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
          label="Fecha y hora de recogida"
          name="fechaHoraRecorrida"
          rules={[
            {
              required: true,
              message: "Debe ingresar la fecha y hora de recogida",
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
          label="Fecha y hora de llegada"
          name="fechaHoraLlegada"
          rules={[
            {
              required: true,
              message: "Debe ingresar la fecha y hora de llegada",
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
          label="Conductor"
          name="conductor"
          rules={[
            {
              required: true,
              message: "Debe ingresar el conductor",
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
          label="Vehiculo"
          name="vehiculo"
          rules={[
            {
              required: true,
              message: "Debe ingresar el vehiculo",
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
          label="Ruta"
          name="ruta"
          rules={[
            {
              required: true,
              message: "Debe ingresar la ruta",
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
