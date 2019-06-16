import React from "react";
import { Link } from "react-router-dom";
import LazyloadImage from "../../LazyloadImage";
import CardWrapper from "./top100.style";
import imgData from "./image";

const Card = props => (
  <CardWrapper>
    <Link to={`/top100/${props.name}/${props.id}`}>
      <div className="card-img">
        {/* <Link to={`/top100/${props.name}/${props.id}`}> */}
        <LazyloadImage
          className="img"
          src={imgData[props.id] || imgData[props.name]}
        />
        {/* </Link> */}
        <div className="opac" />
      </div>
      <div className="card-info">
        <div className="card-title" title={props.title}>
          Top 100 {props.title}
        </div>
      </div>
    </Link>
  </CardWrapper>
);

export default Card;
