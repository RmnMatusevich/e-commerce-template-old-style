import * as React from "react";
import { Link } from "react-router-dom";
import * as numeral from "numeral";
import RaisedButton from "material-ui/RaisedButton";
import NavigateNext from "material-ui/svg-icons/image/navigate-next";
import { ICatalogProduct } from "@typings/state/index";
import "@styles/Product.css";

interface Props {
  key: string;
  item: ICatalogProduct;
  onEdit: (item?: ICatalogProduct) => void;
  isAdmin: boolean;
}

const Product = ({ item: { info, tags, _id }, onEdit, isAdmin }: Props) => {
  const {
    photo,
    name,
    displaySize,
    displayResolution,
    cpu,
    internalMemory,
    ram,
    camera,
    price,
  } = info;

  return (
    <div className="product">
      <div className="content">
        {photo ? (
          <img src={photo} />
        ) : (
          <img
            style={{ width: 220 }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAB+UlEQVRoge2ZTUrDQBiGn4pCo3Vp0TO4EFd1rRU3IughPIZW6aIewAt4BkFci+61UBctWBRc1LWgIsbFTOyQn8mkTc2g80BI8zUzed9838w0KTgcjn9BCfCLFpEHU0ULyItp5XOpMBXj4cMfyogzYhvOiG3YZGQWOAZ6wLvcNwDPtAOf4hdFD7hRtKjbNXozP/ptMHIkNTwAG8AcUAf6Mn6oaWuVkZ7UsB6K12W8q2lrlZF3qaESis/L+JumrQ/4WQZ7FVjJJM+cJ7mvheJrcv9o0olJRqpAG+gAZVN1GWhIDX1EOVWATYZj5EDT1ri0AhPBeSfjqo7BQ8xOcbPWFfqbZ2RENdEFPuUWLoE8KCNmpy5izHQRmUirgFQjC8Cd/O4eWERkIzg2XqgmjNaImom2PAZxdzoy3kroeCZvpSkkGkkyEVBjWGLbwC7QBC6AQUKbSRJrJK6c4mgRPzB9pe3ShISHiRhJy4RKUGIDRCaawB5inTHtIy8iRrIKSJpNstyQPIgYSSunLKglqiu/1RyuFTGSl4kAEzMfiFV9nOei2DHyW3jAKfAlr33J6JODFb9+t4Bnef0XYGeEPqwwAqISzhUdZ4gHK1OsMQLiLec+8Ip+TOk2K4wELAO3jGBEfRvv3v3agDNiG86IbTgjtuH+1XU4HI5C+AYybe7UfoPmRQAAAABJRU5ErkJggg=="
          />
        )}
        <div className="content-left">
          <h3>{name}</h3>
          <div className="content-info">
            <div>
              <b>Размер экрана: </b>
              <span>{displaySize}</span>
            </div>
            <div>
              <b>Разрешение экрана: </b>
              <span>{displayResolution}</span>
            </div>
            <div>
              <b>CPU: </b>
              <span>{cpu}</span>
            </div>
            <div>
              <b>Internal memory: </b>
              <span>{internalMemory}</span>
            </div>
            <div>
              <b>RAM: </b>
              <span>{ram}</span>
            </div>
            <div>
              <b>Камера: </b>
              <span>
                {camera.length < 50 ? camera : camera.slice(0, 50) + "..."}
              </span>
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="content-info">
            <p>
              <b>Цена:</b>
            </p>
            <h2>{numeral(price).format("0,0.00")} руб.</h2>
          </div>
          {isAdmin && (
            <RaisedButton
              className="btn"
              label="Редактировать"
              secondary={true}
              onClick={() => onEdit({ info, tags, _id })}
              style={{ marginBottom: 8 }}
            />
          )}
          <RaisedButton
            containerElement={<Link to={`/product/${_id}`} />}
            className="btn"
            labelPosition="before"
            primary={true}
            icon={<NavigateNext />}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
