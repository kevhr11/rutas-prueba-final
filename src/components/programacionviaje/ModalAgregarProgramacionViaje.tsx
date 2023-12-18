import React, { useEffect, useState } from "react";
import { dataProgramacionViajes } from "@/app/programacionviajes/dataProgramacionViajes";
import { dataTable } from "@/app/rutas/dataTableInterface";
import { dataConductores } from "@/app/conductores/dataConductoresInterface";
import { dataVehiculos } from "@/app/vehiculos/dataVehiculosInterface";
import { Form, Input, Button, Modal, Select } from "antd";
import axios from "axios";
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
  const [dataRutas, setDataRutas] = useState<dataTable[]>([]);
  const [dataConductores, setDataConductores] = useState<dataConductores[]>([]);
  const [dataVehiculos, setDataVehiculos] = useState<dataVehiculos[]>([]);

  /* Estados para los select */
  const [dataRutasOptions, setDataRutasOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [dataConductoresOptions, setDataConductoresOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [dataVehiculosOptions, setDataVehiculosOptions] = useState<
    { value: string; label: string }[]
  >([]);

  /* --------------------Metodo para obtener datos rutas------------------------------------------------------ */
  const obtenerDatosRuta = async () => {
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

      setDataRutas(datosConvertidos);

      // Mapear los datos para el formato de opciones de Select
      const opcionesConductores = datosConvertidos.map((ruta) => ({
        value: ruta.key,
        label: ruta.nombreRuta,
      }));
      setDataRutasOptions(opcionesConductores);
    } catch (error) {
      // Manejar errores de manera más informativa
      console.error("Error al obtener datos de Firebase:", error);
    }
  };

  /* --------------------Metodo para obtener datos conductores------------------------------------------------------ */
  /* const obtenerDatosConductores = async () => {
    try {
      const firebaseURL =
        "https://firestore.googleapis.com/v1/projects/rutas-c1289/databases/(default)/documents/conductores";

      const response = await axios.get(firebaseURL);

      // Convertir los datos de la API a la estructura que MyTable espera
      const datosConvertidos: dataConductores[] = response.data.documents.map(
        (item: any) => {
          const partesCadena = item.name.split("/");
          return {
            key: partesCadena[partesCadena.length - 1],
            foto: item.fields.foto.stringValue,
            nombre: item.fields.nombre.stringValue,
            dui: item.fields.dui.stringValue,
            direccion: item.fields.direccion.stringValue,
            edad: item.fields.edad.stringValue,
            licencia: item.fields.licencia.stringValue,
            telefono: item.fields.telefono.stringValue,
            correo: item.fields.correo.stringValue,
          };
        }
      );

      setDataConductores(datosConvertidos);
    } catch (error) {
      // Manejar errores de manera más informativa
      console.error("Error al obtener datos de Firebase:", error);
    }
  }; */

  /* --------------------Metodo para obtener datos vehiculos------------------------------------------------------ */
  /* const obtenerDatosVehiculos = async () => {
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

      setDataVehiculos(datosConvertidos);
    } catch (error) {
      // Manejar errores de manera más informativa
      console.error("Error al obtener datos de Firebase:", error);
    }
  };
 */
  //Obtener datos
  useEffect(() => {
    obtenerDatosRuta();
    /* obtenerDatosConductores();
    obtenerDatosVehiculos(); */
  }, []);

  /* --------------Cerrar el modal----------------------------- */
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
          <Select
            placeholder="Seleccione una ruta"
            style={{ width: 200 }}
            options={dataRutasOptions}
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default ModalAgregar;
