import * as React from "react";
import * as moment from "moment";
import * as numeral from "numeral";
import { IUser, IOrder } from "@typings/state/index";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import AccountModal from "../AccountModal";
import "@styles/Account.css";

interface Props {
  user: IUser;
  getUser: () => any;
}

interface State {
  accountModalOpen: boolean;
}

class Account extends React.Component<Props, State> {
  state = {
    accountModalOpen: false,
  };

  toggleAccountModal = () => {
    this.setState((prevState: State) => ({
      accountModalOpen: !prevState.accountModalOpen,
    }));
  };

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return (
        <div className="account-container">
          <div className="loader">
            <img src="/img/loader.gif" />
            <h1>Загрузка...</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className="account-container">
          <h1>Ваш аккаунт</h1>
          <div className="account">
            <div className="account-info">
              <div className="top">
                <h2>Инфо</h2>
                <IconButton
                  color="primary"
                  aria-label="Edit"
                  onClick={this.toggleAccountModal}
                >
                  <EditIcon />
                </IconButton>
              </div>
              <Divider />
              <p>
                <b>Имя: </b>
                {user.username}
              </p>
              <p>
                <b>E-mail: </b>
                {user.email}
              </p>
              <p>
                <b>Адрес: </b>
                {user.address}
              </p>
              <p>
                <b>Номер телефона: </b>
                {user.phone}
              </p>
            </div>
            <div className="account-history">
              <h2>История заказов</h2>
              <Divider />
              <div className="orders">
                {user.orders.length ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Дата создания</th>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>Кол</th>
                        <th>Всего</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.orders.map((order: IOrder) => {
                        return (
                          <tr key={order.name}>
                            <td>{moment(order.dateCreated).format("ll")}</td>
                            <td>{order.name}</td>
                            <td>
                              {numeral(order.price).format("0,0.00") + " руб"}
                            </td>
                            <td>{order.quantity}</td>
                            <td>
                              {numeral(
                                parseInt(order.price) * parseInt(order.quantity)
                              ).format("0,0.00") + " руб"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <h1>Нет заказов</h1>
                )}
              </div>
            </div>
          </div>
          <AccountModal
            user={user}
            isOpen={this.state.accountModalOpen}
            onRequestClose={this.toggleAccountModal}
          />
        </div>
      );
    }
  }
}

export default Account;
