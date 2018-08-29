import React from "react";
import { withStyles, FormControl, InputLabel, Select, MenuItem, Input } from "material-ui";
import PropTypes from "prop-types";

import customSelectStyle from "variables/styles/customSelectStyle"; //estilos del input

function CustomSelect({ ...props }) {
  //clases se lo pasa withStyles() que recibe un objeto con variables qeu dan estilo
  const {
    classes,
    formControlProps,
    labelText,
    id,
    value,
    eventHandler,
    labelProps,
    selectProps,
    error,
    success,
    options
  } = props;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        classes={{
          root: classes.marginTop,
          disabled: classes.disabled
        }}
        input={<Input name="age" id="age-helper" />}
        {...selectProps}
        onChange={eventHandler}
      >
        {options.map( option=>(
          <MenuItem value={option.value} key={option.value}>{option.name}</MenuItem>
        ))}

      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  value:PropTypes.string,
  selectProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  options: PropTypes.array
};

//withStyles le pone los estilos
export default withStyles(customSelectStyle)(CustomSelect);
