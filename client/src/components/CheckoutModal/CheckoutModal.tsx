import * as React from "react";
import * as numeral from "numeral";
import * as Modal from "react-modal";
import { ICartProduct } from "@typings/state/index";
import { ModalProps } from "@typings/modal";
import RaisedButton from "material-ui/RaisedButton";
import "@styles/CheckoutModal.css";

const CheckoutModal: React.SFC<ModalProps> = ({
  cart,
  isOpen,
  setActiveModal,
  makeOrder,
}): JSX.Element => (
  <Modal
    className="checkout-modal"
    isOpen={isOpen}
    onRequestClose={() => setActiveModal(null)}
  >
    <div className="order">
      <h1>Информация о заказе</h1>
      <p>
        <i>Пожалуйста проверьте правильность заказа</i>
      </p>
      <table>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Всего</th>
          </tr>
        </thead>
        <tbody>
          {cart!.length &&
            cart!.map((item: ICartProduct) => {
              return (
                <tr key={item.product.info.name}>
                  <td>{item.product.info.name}</td>
                  <td>{numeral(item.product.info.price).format("$0,0.00")}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {numeral(item.product.info.price * item.quantity!).format(
                      "$0,0.00"
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <p className="total">
        <b>Всего: </b>
        <span>
          {numeral(
            cart!.length &&
              cart!.reduce(
                (acc, item) =>
                  (acc += item.product.info.price * item.quantity!),
                0
              )
          ).format("$0,0.00")}
        </span>
      </p>
      <div className="btns">
        <RaisedButton
          className="btn"
          onClick={() => setActiveModal(null)}
          secondary
        >
          Отменить
        </RaisedButton>
        <RaisedButton className="btn" onClick={makeOrder} primary>
          Подтвердить
        </RaisedButton>
      </div>
    </div>
  </Modal>
);

export default CheckoutModal;
