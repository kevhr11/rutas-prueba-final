import React, { useState } from "react";
import { dataProgramacionViajes } from "@/app/programacionviajes/dataProgramacionViajes";
import { Form, Input, Button, Modal, Upload, message, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface ModalAgregarProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddData: (rowData: dataProgramacionViajes) => void;
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

  /*  const props: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info: any) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
}; */

  return (
    <Modal
      title="Agregar programación de viajes"
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

        {/* <Item
          label="Foto"
          name="foto"
          rules={[
            {
              required: true,
              message: "Debe ingresar la foto del conductor",
            },
          ]}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Subir archivo</Button>
          </Upload>
        </Item> */}
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

export default ModalAgregar;
