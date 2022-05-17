import * as React from "react";
import * as Modal from "react-modal";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { ProductModalProps } from "@typings/modal";
import "@styles/LoginModal.css";

const ProductModal: React.SFC<ProductModalProps> = ({
  isOpen,
  onRequestClose,
  editItem,
  onSubmit,
}): JSX.Element => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <form className="form" action="/api/catalog" method={"POST"}>
      <h1>{editItem ? "Редактировать" : "Добавить"} продукт</h1>
      {console.log({ editItem })}
      {editItem && (
        <>
          <TextField
            type="hidden"
            name="_id"
            defaultValue={(editItem && editItem._id) || ""}
          />
          <br />
        </>
      )}
      <TextField
        hintText="Введите наименование"
        floatingLabelText="Наименование"
        name="name"
        autoFocus
        defaultValue={(editItem?.info && editItem.info.name) || ""}
      />
      <br />
      <TextField
        hintText="Введите размеры"
        floatingLabelText="Размеры"
        name="dimensions"
        defaultValue={(editItem?.info && editItem?.info.dimensions) || ""}
      />
      <br />
      <TextField
        hintText="Введите тип дисплея"
        floatingLabelText="Тип дисплея"
        name="displayType"
        defaultValue={(editItem?.info && editItem?.info.displayType) || ""}
      />
      <br />
      <TextField
        hintText="Введите размер дисплея"
        floatingLabelText="Размер дисплея"
        name="displaySize"
        defaultValue={(editItem?.info && editItem?.info.displaySize) || ""}
      />
      <br />
      <TextField
        hintText="Введите разрешение экрана"
        floatingLabelText="Разрешение экрана"
        name="displayResolution"
        defaultValue={
          (editItem?.info && editItem?.info.displayResolution) || ""
        }
      />
      <br />
      <TextField
        hintText="Введите ОС"
        floatingLabelText="ОС"
        name="os"
        defaultValue={(editItem?.info && editItem?.info.os) || ""}
      />
      <br />
      <TextField
        hintText="Введите CPU"
        floatingLabelText="CPU"
        name="cpu"
        defaultValue={(editItem?.info && editItem?.info.cpu) || ""}
      />
      <br />
      <TextField
        hintText="Введите Internal Memory"
        floatingLabelText="Internal Memory"
        name="internalMemory"
        defaultValue={(editItem?.info && editItem?.info.internalMemory) || ""}
      />
      <br />
      <TextField
        hintText="Введите RAM"
        floatingLabelText="RAM"
        name="ram"
        defaultValue={(editItem?.info && editItem?.info.ram) || ""}
      />
      <br />
      <TextField
        hintText="Введите камеру"
        floatingLabelText="Камера"
        name="camera"
        defaultValue={(editItem?.info && editItem?.info.camera) || ""}
      />
      <br />
      <TextField
        hintText="Введите аккумулятор"
        floatingLabelText="Аккумулятор"
        name="batery"
        defaultValue={(editItem?.info && editItem?.info.batery) || ""}
      />
      <br />
      <TextField
        hintText="Введите цвет"
        floatingLabelText="Цвет"
        name="color"
        defaultValue={(editItem?.info && editItem?.info.color) || ""}
      />
      <br />
      <TextField
        hintText="Введите цену"
        floatingLabelText="Цена"
        name="price"
        defaultValue={(editItem?.info && editItem?.info.price) || ""}
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

export default ProductModal;
