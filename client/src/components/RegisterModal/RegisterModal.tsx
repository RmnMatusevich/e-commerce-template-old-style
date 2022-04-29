import * as React from "react";
import * as Modal from "react-modal";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { ModalProps } from "@typings/modal";
import "@styles/RegisterModal.css";

const RegisterModal = ({
  isOpen,
  onRequestClose,
  setActiveModal,
}: ModalProps) => (
  <Modal
    className="register-modal"
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  >
    <form className="form" action="/auth/register" method="POST">
      <h1>Register</h1>
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
      <TextField
        hintText="Введите E-mail"
        floatingLabelText="E-mail"
        name="email"
      />
      <br />
      <TextField
        hintText="Введите адрес"
        floatingLabelText="Адрес"
        name="address"
      />
      <br />
      <TextField
        hintText="Введите номер телефона"
        floatingLabelText="Номер телефона"
        name="phone"
      />
      <br />
      <RaisedButton
        className="btn"
        label="Submit"
        primary={true}
        type="submit"
      />
      <p>
        Уже есть аккаунт? <a onClick={() => setActiveModal("login")}>Войти</a>.
      </p>
    </form>
  </Modal>
);

export default RegisterModal;
