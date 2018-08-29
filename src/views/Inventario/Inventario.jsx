import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Input,
  FormControl,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions
} from "material-ui";

import { Dvr, Code, Cloud, Assignment} from "material-ui-icons";

import { Tasks, RegularCard, Table, ProfileCard,
Button,
CustomInput,
CustomSelect,
CustomDatePicker,
Snackbar,
ItemGrid } from "components";

import { bugs, website, server } from "variables/general";

import tasksCardStyle from "variables/styles/tasksCardStyle";
import customInputStyle from "variables/styles/customInputStyle"; //estilos del input
import avatar from "assets/img/placeholder.jpg";

/*
  * Ventana Modal para crear una nueva categoria
  Props
  onClose       = function("string") => callBack cuando se cierra el modal, se le debe pasar un string al callback
  open          = bool        //true para abrir el modal, false para cerrarlo
  title         = string      //titulo del modal
  labelText     = string      //texto del input
  idInput       = string      //id del input
  handleChange  = function() //funcion que maneja el keyup del input
  handleSave    = function()  //maneja el onclik del boton guardar
*/
class ModalWithInput extends React.Component{
  //Se ejecuta cuando se cierra la ventana modal
  handleClose = (e) => {
   let btn = e.target.id
   if(btn == "Btn-closeModalWithInput"){
     this.props.onClose("close")
   }
   else{
     this.props.onClose("callback"); //este es un callBack
   }
  };

  handleSave = (e) => {
  }

  render(){
    return(
      <Dialog onClose={this.handleClose} open={this.props.open} aria-labelledby="simple-dialog-title">
        <DialogTitle id="simple-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <CustomInput
            labelText={this.props.labelText}
            id={this.props.idInput}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{onChange:this.props.handleChange}}
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleClose} name="Btn-closeModalWithInput" color="primary">
              Cancelar
            </Button>
            <Button onClick={this.props.handleSave} color="primary" autoFocus>
              Guardar
            </Button>
          </DialogActions>
      </Dialog>
    )
  }
}

class Inventario extends React.Component {

  state = {
    value: 0, //pestaña seleccionada [0: , 1:Registro]
    cantidad : 0, //value del input cantidad
    valorUnitario : 0, //valor unitario
    total: 0, //total cantidad * valorUnitario
    stockMinimo : 0,
    fechaIngreso : "", //fehca de ingreso
    imagen : "", //value del input de imagen
    description : "",
    selectCategory : "",
    selectBrand : "",
    newCategory : "", //valor del input de nueva categoria
    openModalCategory : false, //true para mostrar el modal de crear categoria
    categories : [], //categorias, se hace una petición para llenarlas desde la base de datos
    brands : [], // marcas, se hace una peticion para cargar las marcas
    messageSnackBar : "", //mensaje para mostrar en el snakBar
    colorSnackBar: "info", //tipo de snackbar opt ["info", "success", "warning", "danger", "primary"]
    closeSnackBar : true,
    openSnackBar : false, //estado del Snackbar
    openModalBrand : false, //true para mostrar el modal de marca
    newBrand : "", //valor del in put de nueva marca
    preview : avatar, //ruta de la imagen de preview
  };

  constructor(props){
    super(props)
    this.handlerCahngeCategory = this.handlerCahngeCategory.bind()
    this.handlerChangeBrand = this.handlerChangeBrand.bind()
  }

  //maneja el cambio de pestaña
  handleChange = (event, value) => {
    if(value == 1){ //si se da clic en la pestaña numero 1 (registro)
      this.getCategories() //se cargan las categorias en el select
      this.getBrands() // se cargan las marcas en el select
    }
    this.setState({ value });
  };

  //maneja el onChange de los input
  handleChangeInput = e =>{
    var name = e.target.name
    this.setState({[name]:e.target.value})
    if(name == "cantidad" || name == "valorUnitario"){
      this.setState({total:this.state.cantidad*this.state.valorUnitario})
    }
    if(name == "imagen"){
      this.preview(e)
    }
  }



  //realiza una peticion a la api, obtine las categorias de los Productos
  getCategories(){
    let categories = []
    fetch('/getAllCategories')
      .then( res => res.json() )
      .then( data => {
                      categories.push({value:"nuevo", name:"Crear nueva categoria"})
                      data.data.map( category => {
                        categories.push({value:category.category_id, name:category.name}) //convertimos la informacion en el formato del CustomSelect
                      })

                      this.setState({categories:categories})
                     }
           )
      .catch( e => console.error(`[peticion] '/getAllCategories' error`) )
  }

  //maneja el evento onChange del selector de categoria
  handlerCahngeCategory = (e) => {
    if(e.target.value == "nuevo"){ //Se ejecuta cuando se selecciona "nuevo" en el selector de categoria, abre un modal
      console.log(`[debug] Abrir modal`);
      this.setState({
        openModalCategory: true,
      });
    }
    this.setState({selectCategory:e.target.value})
  }

  //maneja el keyUp del input de nueva categoria
  changeInputNewCategory = e =>{
    console.log(`[debug] type... ${e.target.value}`);
    this.setState({newCategory:e.target.value})
  }

  //realiza una petición post para guardar la categoria
  handleSaveNewCategory = e =>{
    console.log(`[debug] guardar el valor ${this.state.newCategory}`);
    let category = JSON.stringify({product_id: "01",
                    name:this.state.newCategory}),
        opts =  {headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                 method:'POST',
                 body: category
                }

    fetch('/saveCategory',opts)
      .then( res => res.json() )
      .then( data => { if(data.save === true){
                        this.getCategories()
                        this.setState({openModalCategory:false})
                        this.setState({selectCategory:data.data.category_id})
                      }else{
                        console.log(`[debug]error al guardar`)
                        this.setState({messageSnackBar:"No fue posible guardar la categoria",
                                      colorSnackBar:"danger",
                                      closeSnackBar:true,
                                      openSnackBar:true})
                      }
                     }
            )
      .catch(e => console.error(`[peticion] '/saveCategory'`) )
  }

  //maneja cuando se cierra el modal de crear una categoria
  handlerCloseModalCategory = value =>{
    console.log(`[debug] handlerCloseModalCategory value = ${value}`);
    if(value == "close"){
        this.setState({selectCategory:""})
    }
    this.setState({openModalCategory:false})
  }



  //realiza una peticion a la api, obtine las marcas
  getBrands(){
    let brands = []
    fetch('/getAllBrands')
      .then( res => res.json() )
      .then( data => {
                      brands.push({value:"nuevo", name:"Crear nueva marca"})
                      data.data.map( brand => {
                        brands.push({value:brand.brand_id, name:brand.name}) //convertimos la informacion en el formato del CustomSelect
                      })

                      this.setState({brands:brands})
                     }
           )
      .catch( e => console.error(`[peticion] '/getAllBrands' error`) )
  }

  //Maneja el evento del select de marca
  handlerChangeBrand = e =>{
    if(e.target.value == "nuevo"){ //Se ejecuta cuando se selecciona "nuevo" en el selector de marca, abre un modal
      this.setState({
        openModalBrand: true,
      });
    }
    this.setState({selectBrand:e.target.value})
  }

  //maneja el keyUp del input de nueva marca
  changeInputNewBrand = e =>{
    this.setState({newBrand:e.target.value})
  }

  //realiza una petición post para guardar nueva marca
  handleSaveNewBrand = e =>{
    let brand = JSON.stringify({brand_id: "01",
                                name:this.state.newBrand}),
        opts =  {headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                 method:'POST',
                 body: brand
                }

    fetch('/saveBrand',opts)
      .then( res => res.json() )
      .then( data => { if(data.save === true){
                        this.getBrands()
                        this.setState({openModalBrand:false})
                        this.setState({selectBrand:data.data.brand_id})
                      }else{
                        console.log(`[debug]error al guardar`)
                        this.setState({messageSnackBar:"No fue posible guardar la marca",
                                      colorSnackBar:"danger",
                                      closeSnackBar:true,
                                      openSnackBar:true})
                      }
                     }
            )
      .catch(e => console.error(`[peticion] '/saveCategory'`) )
  }

  //maneja cuando se cierra el modal de crear una marca
  handlerCloseModalBrand = value =>{
    console.log(`[debug] handlerCloseModalBrand value = ${value}`);
    if(value == "close"){
        this.setState({selectBrand:""})
    }
    this.setState({openModalBrand:false})
  }



  //Pone una vista previa
  preview = evt =>{
      var files = evt.target.files, // FileList object
          _this = this;

        //Obtenemos la imagen del campo "file".
      for (var i = 0, f; f = files[i]; i++) {
           //Solo admitimos imágenes.
           if (!f.type.match('image.*')) {
                continue;
           }

           var reader = new FileReader();

           reader.onload = (function(theFile) {
               return function(e) {
               // Creamos la imagen.
                _this.setState({preview: e.target.result})
               };
           })(f);

           reader.readAsDataURL(f);
       }
  }



  //cierra el Snackbar
  closeSnackBar = e =>{
    this.setState({openSnackBar:false})
  }

  componentDidMount(){
    var d = new Date(),
        m = d.getMonth()+1,
        month = (m <10) ? "0"+m : m,
        today = d.getFullYear()+"-"+month+"-"+d.getDate();

    this.setState({fechaIngreso:today})
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle,
            content: classes.cardHeaderContent
          }}
          action={
            <Tabs
              classes={{
                flexContainer: classes.tabsContainer
              }}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorClassName={classes.displayNone}
              textColor="inherit"
            >
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  rootLabelIcon: classes.labelIcon,
                  label: classes.label,
                  rootInheritSelected: classes.rootInheritSelected
                }}
                icon={<Dvr className={classes.tabIcon} />}
                label={"Products"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  rootLabelIcon: classes.labelIcon,
                  label: classes.label,
                  rootInheritSelected: classes.rootInheritSelected
                }}
                icon={<Assignment className={classes.tabIcon} />}
                label={"Registro"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  rootLabelIcon: classes.labelIcon,
                  label: classes.label,
                  rootInheritSelected: classes.rootInheritSelected
                }}
                icon={<Cloud className={classes.tabIcon} />}
                label={"Server"}
              />
            </Tabs>
          }
        />
        <CardContent>
          {this.state.value === 0 && (
            <Typography component="div">
              <h1>Hola</h1>

                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Name", "Country", "City", "Salary"]}
                      tableData={[
                        ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                        ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                        ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                        ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                        ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                        ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                      ]}
                    />
            </Typography>
          )}
          {this.state.value === 1 && (
            <Typography component="div">
              <div>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={8}>
                    <Card>
                      <CardContent>
                        <div>
                          <form id="formCreateProduct">
                              <Grid container>
                                <ItemGrid xs={12} sm={12} md={6}>
                                  <CustomInput
                                    labelText="Nombre"
                                    id="product_name"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </ItemGrid>
                              </Grid>
                              <Grid container>
                                <ItemGrid xs={12} sm={12} md={6}>
                                  <CustomSelect
                                    labelText="Categoria"
                                    eventHandler={this.handlerCahngeCategory}
                                    id="category"
                                    selectProps={{
                                      name:"categoria",
                                      value:this.state.selectCategory,
                                      inputProps:{
                                         id: 'category-required',
                                      }
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    options={this.state.categories}
                                  />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={6}>
                                  <CustomSelect
                                    labelText="Marca"
                                    eventHandler={this.handlerChangeBrand}
                                    id="marca"
                                    selectProps={{
                                      name:"marca",
                                      value:this.state.selectBrand,
                                      inputProps:{
                                         id: 'marca-required',
                                      }
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    options={this.state.brands}
                                  />
                                </ItemGrid>
                              </Grid>

                              <Grid container>
                                <ItemGrid xs={12} sm={12} md={6}>
                                  <CustomDatePicker labelText="Fecha de ingreso"
                                                    id="fechaIngreso"
                                                    formControlProps={{fullWidth: true}}
                                                    inputProps={{name:"fechaIngreso",onChange:this.handleChangeInput,onKeyUp:this.handleChangeInput}}
                                  />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={6}>
                                  <CustomInput
                                    labelText="Stock minimo"
                                    id="stockMinimo"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{type:"number",name:"stockMinimo",onChange:this.handleChangeInput,onKeyUp:this.handleChangeInput}}
                                  />
                                </ItemGrid>
                              </Grid>

                              <Grid container>
                                <ItemGrid xs={12} sm={12} md={4}>
                                  <CustomInput
                                    labelText="Cantidad"
                                    id="cantidad"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{name:"cantidad",onChange:this.handleChangeInput,onKeyUp:this.handleChangeInput}}
                                  />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={4}>
                                  <CustomInput
                                    labelText="Valor unitario"
                                    id="valorUnitario"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{name:"valorUnitario",onChange:this.handleChangeInput,onKeyUp:this.handleChangeInput}}
                                  />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={4}>
                                  <div style={{width:"100%",marginTop:"4.1em"}}>
                                    <b>Total: ${this.state.total}</b>
                                  </div>
                                </ItemGrid>
                              </Grid>

                              <Grid container>
                                <ItemGrid xs={12} sm={12} md={4}>
                                  <img src={this.state.preview} className="img-responsive" style={{marginTop:"1.5em"}}/>
                                  <CustomInput
                                    labelText="Imagen"
                                    id="imagen"
                                    formControlProps={{
                                      fullWidth: true, style:{margin:"0 0 0 0"}
                                    }}
                                    inputProps={{type:"file",name:"imagen",onChange:this.handleChangeInput,onKeyUp:this.handleChangeInput}}
                                  />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={4}>

                                </ItemGrid>
                              </Grid>

                              <Grid container>
                                <ItemGrid xs={12} sm={12} md={12}>
                                  <CustomInput
                                    labelText="Descripción"
                                    id="description"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      name: "description",
                                      multiline: true,
                                      rows: 5,
                                      onChange:this.handleChangeInput,onKeyUp:this.handleChangeInput
                                    }}
                                  />
                                </ItemGrid>
                              </Grid>
                          </form>
                        </div>
                        <Button color="primary">Guardar producto</Button>
                      </CardContent>
                  </Card>
                  </ItemGrid>
                </Grid>
              </div>

              <ModalWithInput onClose={this.handlerCloseModalCategory}
                              open={this.state.openModalCategory}
                              handleChange={this.changeInputNewCategory}
                              handleSave={this.handleSaveNewCategory}
                              title="Crear Categoria"
                              labelText="Nombre categoria"
                              idInput="Category_name"
              />

              <ModalWithInput onClose={this.handlerCloseModalBrand}
                              open={this.state.openModalBrand}
                              handleChange={this.changeInputNewBrand}
                              handleSave={this.handleSaveNewBrand}
                              title="Crear Marca"
                              labelText="Nombre Marca"
                              idInput="Marca_name"
              />

            </Typography>
          )}
          {this.state.value === 2 && (
            <Typography component="div">
              <Tasks
                checkedIndexes={[1]}
                tasksIndexes={[0, 1, 2]}
                tasks={server}
              />
            </Typography>
          )}
        </CardContent>
        <Snackbar message={this.state.messageSnackBar}
                  color={this.state.colorSnackBar}
                  close={this.state.closeSnackBar}
                  place="tr"
                  open={this.state.openSnackBar}
                  closeNotification={this.closeSnackBar}
                  />
      </Card>
    );
  }
}

Inventario.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(tasksCardStyle)(Inventario);
