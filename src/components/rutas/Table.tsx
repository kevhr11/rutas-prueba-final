import React from "react";
import { dataTable } from "@/app/rutas/dataTableInterface";
import { Table, Button } from "antd";

const MyTable: React.FC<{ data: dataTable[] }> = ({ data }) => {
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
      title: "Georreferenciacion",
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
      dataIndex: "verGeorreferenciacion",
      key: "acciones",
      render: () => (
        <>
          <Button type="primary" >Editar</Button> <Button type="primary" danger>Editar</Button>
        </>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};


export default MyTable;