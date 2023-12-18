import { Form, Input, Button, Modal } from "antd";
import Mapa from "@/app/rutas/Mapa";

interface ModalMapaProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dataDestino: string;
}

const ModalAgregar: React.FC<ModalMapaProps> = ({
  modalVisible,
  setModalVisible,
  dataDestino,
}) => {
  const [form] = Form.useForm();
  const { Item } = Form;

  const cerrarModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const accion = () => {};

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
      title="Ruta georreferenciada"
      open={modalVisible}
      onOk={accion}
      onCancel={cerrarModal}
      destroyOnClose={true}
      centered
      footer={[<Button onClick={cerrarModal}>Cancelar</Button>]}
    >
      <Mapa country={dataDestino} />
    </Modal>
  );
};

export default ModalAgregar;
