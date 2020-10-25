import React from "react";
import classes from './Button.module.scss';

const Button = ({children, type, disabled, onClick}) => {
  const cls = [
    classes.Button,
    classes[type]
  ];

  return (
    <button className={cls.join(' ')} onClick={onClick} disabled={disabled}>
      { children }
    </button>
  )
};

export default Button;
