import React from "react";

const InputType = ({
  labelText,
  value,
  onChange,
  inputType,
  name,
  lableFor,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor={lableFor} className="form-label">
            {labelText}
          </label>
          <input
            type={inputType}
            className="form-control"
            value={value}
            onChange={onChange}
            name={name}
          />
        </div>
      </div>
    </>
  );
};

export default InputType;
