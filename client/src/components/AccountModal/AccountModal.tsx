import * as React from "react";
import * as Modal from "react-modal";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { IUser } from "@typings/state/index";
import "@styles/AccountModal.css";

interface Props {
  user: IUser;
  isOpen: boolean;
  onRequestClose: () => void;
}

interface State {
  email: string;
  address: string;
  phone: string;
}

class AccountModal extends React.Component<Props, State> {
  state = {
    email: this.props.user.email,
    address: this.props.user.address,
    phone: this.props.user.phone,
  };

  onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const key = e.currentTarget.name;

    this.setState((prevState: State) => ({
      ...prevState,
      [key]: value,
    }));
  };

  render() {
    return (
      <Modal
        className="account-modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <form className="form" action="/api/user" method="POST">
          <h1>Редактировать</h1>
          <TextField
            id="email"
            hintText="Введите E-mail"
            floatingLabelText="E-mail"
            name="email"
            value={this.state.email}
            onChange={this.onInputChange}
          />
          <br />
          <TextField
            id="address"
            hintText="Введите адрес"
            floatingLabelText="Адрес"
            name="address"
            value={this.state.address}
            onChange={this.onInputChange}
          />
          <br />
          <TextField
            id="phone"
            hintText="Введите номер телефона"
            floatingLabelText="Номер телефона"
            name="phone"
            value={this.state.phone}
            onChange={this.onInputChange}
          />
          <br />
          <RaisedButton
            className="btn"
            label="Сохранить"
            primary={true}
            type="submit"
          />
        </form>
      </Modal>
    );
  }
}

export default AccountModal;
