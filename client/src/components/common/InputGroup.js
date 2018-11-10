import React from 'react'
import classnames from 'classnames';
import PropType from 'prop-types';

const InputGroup = ({
name,
placeholder,
value,
error,
onChange,
icon,
type
}) => {
  return (
    <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className={icon}/>
                  </span>
                </div>
                <input 
                className={classnames("form-control form-control-lg",
                { "is-invalid" : error})}
                 placeholder={placeholder}
                  name={name}
                   value={value}
                    onChange={onChange}
                    
                 />
                 {error && (<div className="invalid-feedback">{error}</div>)}
              </div>
              
  );
};

InputGroup.propTypes = {
  name: PropType.string.isRequired,
  placeholder: PropType.string.isRequired,
  value: PropType.string.isRequired,
  error: PropType.string,
  icon: PropType.string,
  type: PropType.string.isRequired,
  onChange: PropType.func.isRequired

}

InputGroup.defaultProps = {
type: 'text'

}

export default InputGroup;
