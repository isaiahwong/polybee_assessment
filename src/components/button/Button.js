import React from 'react';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import style from './Button.module.css';

const CustomButton = (props) => (
    <Button onClick={props.onClick} className={cn(style.button, props.className)}>
        {props.value}
    </Button>
);

export default CustomButton;