import React from "react";
import PropTypes from "prop-types"; //establece el tipo de dato qeu es cada props
import { NavLink } from "react-router-dom"; //componente para generar los cambios en las vistas segun la ruta
import cx from "classnames"; //renderiza clases de html condicionalmente. (las clases que sirven para poner estilos)
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "material-ui";

import { HeaderLinks } from "components"; //menu header, se llama por que si es un movil, se pone en este menu

import sidebarStyle from "variables/styles/sidebarStyle.jsx"; //estilos

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  // retorna true si la ruta que se le pase es la que esta en la url
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes } = props;

  console.log(`[debug] imagen de sidebar: ${image}`);

  var links = ( //contiene los items del menu, pone color a el item seleccionado, el activo
    <List className={classes.list}>
      {/*recorre las rutas de la app y retorna un item por cada una de ellas*/}
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        const listItemClasses = cx({ //pone la clase que da color al item seleccionado en el menu
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({ //pone letra blaca al item seleccionado
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="https://www.creative-tim.com" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      {/*Menu para mobiles*/}
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            //si se establece una imagen de fondo para el menu lateral
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>

      {/*Menu para pantallas grandes*/}
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
