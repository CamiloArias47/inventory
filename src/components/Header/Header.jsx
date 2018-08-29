import React from "react";
import PropTypes from "prop-types"; //establece el tipo de datao que debe ser cada props, genera alertas (creo que por consola y en la pagina)
import { Menu } from "material-ui-icons";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Button
} from "material-ui";
import cx from "classnames"; //renderizado condicional de clases html

import headerStyle from "variables/styles/headerStyle.jsx"; //constantes con los estilos

import HeaderLinks from "./HeaderLinks"; //contenido del menu superior Header

function Header({ ...props }) {
  //recorre las rutas de la app y la que este en la url retorna su nombre
  function makeBrand() {
    var name;
    props.routes.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color //establece el color de la barra superior header
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        {/*Contenido del menu superior Header, se muestra en pantallas grandes*/}
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        {/*Boton de opciones para mobiles, muestra o oculta el menu*/}
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle /*funcion que oculta o muestra el menu*/}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
