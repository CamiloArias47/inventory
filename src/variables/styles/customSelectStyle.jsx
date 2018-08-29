// ##############################
// // // CustomSelectStyle styles
// #############################

import {
  primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from "variables/styles";

const customSelectStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:before": {
      backgroundColor: "#D2D2D2",
      height: "1px !important"
    }
  },
  inkbar: {
    "&:after": {
      backgroundColor: primaryColor
    }
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857"
  },
  formControl: {
    paddingBottom: "10px",
    margin: "12px 0 0 0",
    position: "relative"
  },
  marginTop: {
    marginTop: "16px"
  }
}

export default customSelectStyle;
