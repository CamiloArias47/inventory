import React from "react"
import { withStyles, FormControl, TextField } from "material-ui";
import customInputStyle from "variables/styles/customInputStyle"; //estilos del input

function CustomDatePicker({...props}){

  const {
    classes,
    labelText,
    defaultDate,
    id,
    formControlProps,
    inputProps
  } = props;

  var d = new Date(),
      m = d.getMonth()+1,
      month = (m <10) ? "0"+m : m,
      today = d.getFullYear()+"-"+month+"-"+d.getDate();

  return(<FormControl {...formControlProps} className={classes.formControl}>
            <TextField
            id={id}
            label={labelText}
            type="date"
            defaultValue={ (defaultDate) ? defaultDate : today}
            className={classes.textField}
            InputLabelProps={{ shrink: true,}}
            InputProps={inputProps}
            />
        </FormControl>)
}

export default withStyles(customInputStyle)(CustomDatePicker);
