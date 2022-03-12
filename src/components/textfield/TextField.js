import React, { forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import style from './TextField.module.css';

const TextField = forwardRef((props, ref) =>
    <input
        ref={ref}
        placeholder={props.placeholder}
        className={cn(props.className, style.textfield)}
        type="text"
        onChange={props.onChange}
    />
);

TextField.defaultProps = {
    onChange: (_) => { },
    placeholder: "Your text here",
};

TextField.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
}

export default forwardRef((props, ref) => <TextField ref={ref} {...props} />);