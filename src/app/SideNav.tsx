"use client";

import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

interface props {
  children: any;
}

const SideNav = ({ children }: props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="ruta">
            <Link href="/rutas">Rutas</Link>
          </Menu.Item>
          <Menu.Item key="conductores">
            <Link href="/conductores">Conductores</Link>
          </Menu.Item>
          <Menu.Item key="vehiculos">
            <Link href="/vehiculos">Vehiculos</Link>
          </Menu.Item>
          <Menu.Item key="programacionviajes">
            <Link href="/programacionviajes">Programación de viajes</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
          style={{ margin: "24px 16px 0", minHeight: "calc(100vh - 64px)" }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SideNav;

