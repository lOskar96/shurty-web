import { useAppStore } from "@/zustand";
import { message } from "antd";
import { Input, Modal, Form, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { login, register } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

const LoginRegisterModal = ({ open, handleCancel }) => {
  const navigate = useNavigate();
  const [registerMode, setRegisterMode] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const setUser = useAppStore((s) => s.setUser);

  const [messageApi, contextHolder] = message.useMessage();

  const URL = import.meta.env.VITE_API_URL;
  const { Password } = Input;

  const { mutate: handleAuth, isLoading } = useMutation({
    mutationFn: () =>
      registerMode ? register(data) : login(data.email, data.password),
    onSuccess: (res) => {
      if (registerMode) {
        setRegisterMode(false);
        messageApi.success("Registrado");
      } else {
        setUser(res);
        navigate("/dashboard");
        messageApi.success("Conectado");
      }
      handleCancel();
    },
    onError: (err) => messageApi.error(err.message),
  });

  const toggleRegisterMode = () => {
    setRegisterMode((prev) => !prev);
  };

  const handleLoginRegister = async () => {
    handleAuth();
  };

  return (
    <Modal
      title="Crear nueva URL"
      closable
      open={open}
      onOk={handleLoginRegister}
      onCancel={handleCancel}
      destroyOnHidden
      okButtonProps={{ text: "Crear" }}
      footer={[
        <Button key="cancel" onClick={toggleRegisterMode}>
          {registerMode ? "Iniciar Sesión" : "Registrarse"}
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleLoginRegister}
          loading={isLoading}
        >
          {!registerMode ? "Iniciar Sesión" : "Registrarse"}
        </Button>,
      ]}
    >
      {contextHolder}
      <div>
        <Form layout="vertical">
          {registerMode && (
            <Form.Item label="Usuario">
              <Input
                placeholder="Username"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </Form.Item>
          )}
          <Form.Item label="Correo electrónico">
            <Input
              placeholder="email@example.com"
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Contraseña">
            <Password
              placeholder="Password"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              onPressEnter={handleLoginRegister}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default LoginRegisterModal;
