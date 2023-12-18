import React, { useState } from "react";
import { dataTable } from "@/app/rutas/dataTableInterface";
import { Table, Button } from "antd";
import ModalMapa from "./ModalMapa";

interface MyTableProps {
  data: dataTable[];
  modalEditar: (rowData: dataTable) => void;
}

const MyTable: React.FC<MyTableProps> = ({ data, modalEditar }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [destinoRuta, setDestinoRuta] = useState<string>();

  /* ------------------------------ Función Modal Insertar ------------------------------ */
  const abrirModal = (destinoOrigen: string) => {
    setDestinoRuta(destinoOrigen);
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
    /* {
      title: "Georreferenciación",
      dataIndex: "georreferenciacion",
      key: "georreferenciacion",
    }, */
    {
      title: "Ver georreferenciación",
      /* dataIndex: "verGeorreferenciacion", */
      key: "verGeorreferenciacion",
      render: (data: dataTable) => (
        <>
          <Button
            type="link"
            onClick={() => abrirModal(data.destinoRuta)}
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
        dataDestino={destinoRuta || ""}
      />
    </>
  );
};

export default MyTable;
