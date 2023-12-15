import React from "react";
import { dataTable } from "@/app/rutas/dataTableInterface";
import { Table, Button } from "antd";

interface MyTableProps {
  data: dataTable[];
  modalEditar: (rowData: dataTable) => void;
}

const MyTable: React.FC<MyTableProps> = ({ data, modalEditar }) => {
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
      title: "Georreferenciación",
      dataIndex: "georreferenciacion",
      key: "georreferenciacion",
    },
    {
      title: "Ver georreferenciacion",
      dataIndex: "verGeorreferenciacion",
      key: "verGeorreferenciacion",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (data: dataTable) => (
        <>
          <Button type="primary" onClick={() => modalEditar(data)}>
            Editar
          </Button>{" "}
          <Button type="primary" danger>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};


export default MyTable;