
import React from "react";
import PropTypes from "prop-types"; //para que mande alertas si no se pasan los props con el tipo de dato establecido
import { Router, Switch, Route, Redirect } from "react-router-dom"; //manejar el enrutamiento de las views, lado del cliente
// creates a beautiful scrollbar
import { createBrowserHistory } from "history"; //administra el historial de sesiones, historial (creo que guarda en un objeto el historial)
import PerfectScrollbar from "perfect-scrollbar"; //un scrollbar stetico, trasparente
import "perfect-scrollbar/css/perfect-scrollbar.css"; //estilos del scroll
import { withStyles } from "material-ui"; //para  inyectarle estilos (objetos de estilos) al material-ui

import { Header, Footer, Sidebar } from "components";

import appRoutes from "routes/app.jsx"; //rutas del app admin

import appStyle from "variables/styles/appStyle.jsx"; //Estilos de la app

import image from "assets/img/sidebar-3.jpg"; //fondo del Sidebar (menu lateral)
//var image = "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png"; //logo del Sidebar (menu lateral)
const logoText = "Titulo del menu lateral";
const hist = createBrowserHistory();

//aca se renderiza el componente segun la ruta, esta constante luego se pone abajo
const switchRoutes = (
  //<Router history={hist}>
    <Switch>
      {appRoutes.map((prop, key) => {
        console.log(`[debug]: key: ${key}`);
        if (prop.redirect){
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        }
        else {
          return <Route exact path={prop.path} component={prop.component} key={key} />;
        }
      })}
    </Switch>
  //</Router>
);

class App extends React.Component {
  state = {
    mobileOpen: false
  };
  //cuando se llama cambia el state mobileOpen, lo que provoca que se oculte(false) o se muestre(true) el menu lateral para mobiles
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  //retorna true si es la ruta de mapas
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  componentDidMount() {
    //if(navigator.platform.indexOf('Win') > -1){ //solo en windows??
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    //}
  }
  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
        <div className={classes.wrapper}>
          <Sidebar
            routes={appRoutes}
            logoText={logoText}
            logo={logo}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Header
              routes={appRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {this.getRoute() ? (
              //en caso que sea una ruta diferente a la del mapa
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            ) : (
              //si es el mapa
              <div className={classes.map}>{switchRoutes}</div>
             )
            }
            {this.getRoute() ?  <Footer /> : null} {/*si es el mapa no pone el footer*/}
          </div>
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
