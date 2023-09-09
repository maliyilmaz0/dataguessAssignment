import React from "react";

import "./Card.css";

const Card = (props) => {
  const classes = "card " + props.className;

  // Dinamik olarak belirlenen arka plan rengini style özelliği ile ekleyin
  const cardStyle = {
    backgroundColor: props.backgroundColor || "", // props üzerinden gelen renk veya boş bir değer
  };

  return (
    <div className={classes} style={cardStyle}>
      {props.children}
    </div>
  );
};

export default Card;
