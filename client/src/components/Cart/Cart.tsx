import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as numeral from "numeral";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import NavigateNext from "material-ui/svg-icons/image/navigate-next";
import RemoveShoppingCart from "@material-ui/icons/RemoveShoppingCart";
import Dialog from "material-ui/Dialog";
import Snackbar from "material-ui/Snackbar";
import CheckoutModal from "../CheckoutModal";
import OrderSuccessModal from "../OrderSuccessModal";
import { ICart } from "@typings/state/index";
import { modal } from "@typings/modal";
import "@styles/Cart.css";

interface Props {
  cart: ICart;
  getCart: () => ICart;
}

interface State {
  activeModal: modal;
}

class Cart extends React.Component<Props, State> {
  state = {
    activeModal: null,
  };

  setActiveModal = (modal: modal) => {
    this.setState({ activeModal: modal });
  };

  removeItem = async (itemId: string) => {
    await axios.put("/api/cart", {
      cartId: this.props.cart._id,
      itemId: itemId,
    });

    this.props.getCart();

    this.setActiveModal("snackbar");
    setTimeout(() => {
      this.setActiveModal(null);
    }, 4000);
  };

  emptyCart = async () => {
    await axios.delete("/api/cart", { params: { id: this.props.cart._id } });
    await this.setState({ activeModal: null });
    await this.props.getCart();
  };

  makeOrder = async () => {
    const order = this.props.cart.items.map((item) => {
      let order = {
        name: item.product.info.name,
        price: item.product.info.price,
        quantity: item.quantity,
        dateCreated: Date.now(),
      };
      return order;
    });

    await axios.post("/api/order", { order: order });
    await this.emptyCart();

    this.setActiveModal("orderSuccess");
  };

  componentWillMount() {
    this.props.getCart();
  }

  render() {
    const { cart } = this.props;
    console.log({ cart });
    const cartExists = cart.isLoaded && !cart.error && cart.items.length;

    return (
      <div className="cart-container">
        <h1>??????????????</h1>
        <div className="cart">
          <div className="cart-info">
            <div className="info">
              <p>
                <b>??????????????????????: </b>
                {cartExists
                  ? cart.items.reduce((acc, item) => (acc += item.quantity!), 0)
                  : 0}
              </p>
              <p>
                <b>??????????: </b>
                <span className="total">
                  {cartExists
                    ? numeral(
                        cart.items.reduce(
                          (acc, item) =>
                            (acc += item.product.info.price * item.quantity!),
                          0
                        )
                      ).format("0,0.00") + " ??????"
                    : numeral(0).format("0,0.00") + " ??????"}
                </span>
              </p>
            </div>
            <div className="btns">
              <RaisedButton
                onClick={() => this.setActiveModal("checkout")}
                className="btn"
                label="????????????????"
                labelPosition="before"
                icon={<NavigateNext />}
                primary={true}
                disabled={!cartExists}
              />
              <RaisedButton
                onClick={() => this.setActiveModal("dialog")}
                className="btn"
                label="??????????????????"
                labelPosition="before"
                icon={<RemoveShoppingCart style={{ color: "#fff" }} />}
                secondary={true}
                disabled={!cartExists}
              />
            </div>
            <CheckoutModal
              isOpen={this.state.activeModal === "checkout"}
              onRequestClose={() => this.setActiveModal}
              setActiveModal={this.setActiveModal}
              makeOrder={this.makeOrder}
            />
            <OrderSuccessModal
              isOpen={this.state.activeModal === "orderSuccess"}
              setActiveModal={this.setActiveModal}
            />
            <Dialog
              title="???? ??????????????, ?????? ???????????? ?????????????????? ???????????????"
              actions={[
                <FlatButton
                  label="????????????????"
                  primary={true}
                  onClick={() => this.setActiveModal(null)}
                />,
                <FlatButton
                  label="????"
                  primary={true}
                  onClick={this.emptyCart}
                />,
              ]}
              modal={true}
              open={this.state.activeModal === "dialog"}
            >
              ?????? ???????????? ???? ?????????????? ???????? ??????????????.
            </Dialog>
          </div>
          <div className="cart-items">
            {cartExists ? (
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>????????????????????????</th>
                    <th>????????</th>
                    <th>????????????????????</th>
                    <th>??????????</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => {
                    return (
                      <tr key={item.product.info.name}>
                        <td>
                          <img src={item.product.info.photo} />
                        </td>
                        <td>
                          <Link to={`/product/${item.product._id}`}>
                            {item.product.info.name}
                          </Link>
                        </td>
                        <td>
                          {numeral(item.product.info.price).format("0,0.00") +
                            " ??????"}
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          {numeral(
                            item.product.info.price * item.quantity!
                          ).format("0,0.00") + " ??????"}
                        </td>
                        <td>
                          <button
                            title="?????????????? ?????????????? ???? ??????????????"
                            onClick={() => this.removeItem(item._id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h1>?????? ??????????????.</h1>
            )}
            <Snackbar
              open={this.state.activeModal === "snackbar"}
              message="?????????? ???????????? ???? ??????????????"
              bodyStyle={{ textAlign: "center" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
