import * as React from "react";
import * as Modal from "react-modal";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { ModalProps } from "@typings/modal";
import "@styles/LoginModal.css";

const LoginModal: React.SFC<ModalProps> = ({
  isOpen,
  onRequestClose,
  setActiveModal,
}): JSX.Element => (
  <Modal
    className="login-modal"
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  >
    <form className="form" action="/auth/login" method="POST">
      <h1>Войти</h1>
      <TextField
        hintText="Введите имя"
        floatingLabelText="Имя"
        name="username"
        autoFocus
      />
      <br />
      <TextField
        hintText="Введите пароль"
        floatingLabelText="Пароль"
        name="password"
        type="password"
      />
      <br />
      <RaisedButton
        className="btn"
        label="Войти"
        primary={true}
        type="submit"
      />
      <p>
        Нет аккаунта?{" "}
        <a onClick={() => setActiveModal("register")}>Зарегестрироваться</a>.
      </p>
    </form>
  </Modal>
);

export default LoginModal;
