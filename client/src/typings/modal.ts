import { ICartProduct, ICatalogProduct } from "./state/index";

export type modal =
  | null
  | "snackbar"
  | "checkout"
  | "orderSuccess"
  | "dialog"
  | "login"
  | "register";

export interface ModalProps {
  isOpen: boolean;
  setActiveModal: (modal: modal) => void;
  onRequestClose?: (event: MouseEvent) => void;
  cart?: ICartProduct[];
  makeOrder?: () => void;
}

export interface ProductModalProps {
  isOpen: boolean;
  // setActiveModal: (modal: modal) => void;
  onRequestClose?: (event: MouseEvent) => void;
  onSubmit?: () => void;
  editItem?: ICatalogProduct;
}
