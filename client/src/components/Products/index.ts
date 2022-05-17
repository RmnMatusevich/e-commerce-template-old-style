import { compose } from "recompose";
import { connect } from "react-redux";
import { initCatalog, clearFilters, setSortBy } from "@actions/index";
import {
  isCatalogLoaded,
  sortProducts,
  filterProducts,
  selectSortBy,
} from "@selectors/catalog";
import { IState } from "@typings/state/index";
import Products from "./Products";
import { selectUser } from "@selectors/user";
import { getUser } from "@actions/index";
import { selectIsAdmin } from "@selectors/route";

const mapStateToProps = (state: IState) => ({
  catalogLoaded: isCatalogLoaded(state),
  catalog: sortProducts(filterProducts(state), state.sortBy),
  sortBy: selectSortBy(state),
  user: selectUser(state),
  isAdmin: selectIsAdmin(state),
});

const actions = {
  initCatalog,
  clearFilters,
  setSortBy,
  getUser,
};

export default compose(connect(mapStateToProps, actions))(Products);
