import React, { useState } from "react";
import { dataTable } from "@/app/rutas/dataTableInterface";
import { Table, Button, Switch } from "antd";
import ModalMapa from "./ModalMapa";

interface MyTableProps {
  data: dataTable[];
  modalEditar: (rowData: dataTable) => void;
  cambiar: (rowData: dataTable, id: string) => void;
}

const MyTable: React.FC<MyTableProps> = ({ data, modalEditar, cambiar }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [destinoRuta, setDestinoRuta] = useState<string>();
  const [origenRuta, setOrigenRuta] = useState<string>();

  /* ------------------------------ Función Modal Insertar ------------------------------ */
  const abrirModal = (origen: string, destino: string) => {
    setOrigenRuta(origen);
    setDestinoRuta(destino);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Tipo de viaje",
      dataIndex: "tipoViaje",
      key: "tipoViaje",
    },
    {
      title: "Nombre de la ruta",
      dataIndex: "nombreRuta",
      key: "nombreRuta",
    },
    {
      title: "Origen de la ruta",
      dataIndex: "origenRuta",
      key: "origenRuta",
    },
    {
      title: "Destino de la ruta",
      dataIndex: "destinoRuta",
      key: "destinoRuta",
    },
    {
      title: "Estado",
      key: "estado",
      render: (data: dataTable) => (
        <Switch
          checked={data.estado}
          checkedChildren="Activo"
          unCheckedChildren="Inactivo"
          onChange={() => cambiar(data, data.key)}
        />
      ),
    },
    {
      title: "Ver georreferenciación",
      /* dataIndex: "verGeorreferenciacion", */
      key: "verGeorreferenciacion",
      render: (data: dataTable) => (
        <>
          <Button
            type="link"
            onClick={() => abrirModal(data.origenRuta, data.destinoRuta)}
          >
            Ver Mapa
          </Button>
        </>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (data: dataTable) => (
        <>
          <Button type="primary" onClick={() => modalEditar(data)}>
            Editar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={data} columns={columns} />
      <ModalMapa
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataOrigen={origenRuta || ""}
        dataDestino={destinoRuta || ""}
      />
    </>
  );
};

export default MyTable;
