import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Drawer from "material-ui/Drawer";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { ICatalogProduct, IUser } from "@typings/state/index";
import FiltersList from "../FiltersList";
import Product from "../Product";
import "@styles/Products.css";
import ProductModal from "../ProductModal";

interface Props {
  catalogLoaded: boolean;
  catalog: ICatalogProduct[];
  sortBy: string;
  initCatalog: () => void;
  clearFilters: () => void;
  setSortBy: (value: string) => void;
  user: IUser;
  getUser: () => any;
  isAdmin: boolean;
}

interface State {
  drawerOpen: boolean;
  value: string;
  productModalOpen: boolean;
  currentEditItem?: ICatalogProduct;
}

export class Products extends React.Component<Props, State> {
  state = {
    drawerOpen: false,
    value: this.props.sortBy || "Name: A-Z",
    productModalOpen: false,
    currentEditItem: undefined,
  };

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleChange = (e: React.ChangeEvent, index: number, value: string) => {
    this.props.setSortBy(value);
    this.setState({ value });
  };

  toggleProductModal = (item?: ICatalogProduct) => {
    this.setState((prevState: State) => ({
      productModalOpen: !prevState.productModalOpen,
      currentEditItem: !prevState.productModalOpen
        ? item
          ? item
          : undefined
        : undefined,
    }));
  };

  componentDidMount() {
    this.props.initCatalog();
    this.props.getUser();
  }

  render() {
    const { catalogLoaded, catalog, clearFilters, user } = this.props;

    if (!catalogLoaded) {
      return (
        <div className="loader">
          <img src="/img/loader.gif" />
          <h1>LOADING PRODUCTS...</h1>
        </div>
      );
    } else
      return (
        <div className="products">
          {this.props.isAdmin && (
            <RaisedButton
              className="btn"
              label="???????????????? ??????????????"
              primary={true}
              onClick={() => this.toggleProductModal()}
            />
          )}
          <div className="products-handle">
            <div className="products-found">
              <span>
                <b>??????????: </b>
                {catalog.length}
              </span>
            </div>
            <div className="filters">
              <div className="set-filters">
                <RaisedButton
                  className="btn"
                  label="??????????????"
                  onClick={this.toggleDrawer}
                  primary={true}
                />
              </div>
              <RaisedButton
                className="btn"
                label="??????????????????"
                onClick={clearFilters}
                secondary={true}
              />
            </div>
            <div className="products-sort">
              <span>
                <b>?????????????????????? ????:</b>
              </span>
              <SelectField
                className="sort-field"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <MenuItem value="Name: A-Z" primaryText="??????: A-??" />
                <MenuItem value="Name: Z-A" primaryText="??????: ??-A" />
                <MenuItem
                  value="Price: Low to High"
                  primaryText="???????? ???? ??????????????????????"
                />
                <MenuItem
                  value="Price: High to Low"
                  primaryText="???????? ???? ????????????????"
                />
              </SelectField>
              <Drawer
                docked={false}
                width={200}
                open={this.state.drawerOpen}
                onRequestChange={this.toggleDrawer}
              >
                <FiltersList />
              </Drawer>
            </div>
          </div>
          {catalog.length ? (
            catalog.map((item) => {
              return (
                <Product
                  key={item.info.name}
                  item={item}
                  onEdit={this.toggleProductModal}
                  isAdmin={this.props.isAdmin}
                />
              );
            })
          ) : (
            <h1 className="no-products">?????? ??????????????????????.</h1>
          )}
          <ProductModal
            isOpen={this.state.productModalOpen}
            editItem={this.state.currentEditItem}
            onRequestClose={this.toggleProductModal}
          />
        </div>
      );
  }
}

export default Products;
