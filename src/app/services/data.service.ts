import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import 'rxjs-compat/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //server: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  //serverweb: string = "https://promine-ec.000webhostapp.com/servicios";
  serverweb: string = "https://getssoma.com/servicios";
  aspirante

  constructor(
    private http: HttpClient
  ) { }


  getMenu() {
    return this.http.get("/assets/data/menu.json")
  }


  getSubMenu(nombre) {

    var listafill = []

    this.http.get("/assets/data/submenu.json").subscribe((res: any[]) => {

      res.forEach(element => {

        if (element['padre'] === nombre) {
          //console.log(element)
          listafill.push(element)
        }

      });

    })

    return listafill

  }


  getAspiranteLData(lista: string) {
    return <any>this.http.get("/assets/data/aspirantes/" + lista + ".json")
  }

  getEmpleadoLData(lista: string) {
    return <any>this.http.get("/assets/data/empleados/" + lista + ".json")
  }

  getListanuevos(texto) {
    const body = JSON.stringify({ 'task': 'buscar', texto })
    //const x = parse this.serverweb + "/aspirante.php/?" + body
    //return this.http.get(this.serverweb + "/library/config.php")
    //return this.http.get(`${this.serverweb}/aspirante.php/?${body}`)
    return this.http.post(this.serverweb + "/aspirante.php", body)
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  nuevoAspirante(aspirante) {
    var body

    Object.entries(aspirante).forEach(([key, value], index) => {
      // 👇️ name Tom 0, country Chile 1
      aspirante[key] = value.toString().trim()
      if (key.substring(0, 4) == "asp_") {
        aspirante[key] = value.toString().toUpperCase()
      }
    });

    //aspirante['asp_estado']
    body = { ...aspirante, task: 'nuevo' };
    body['asp_edad'] = body['asp_edad'].toString()

    //console.log(JSON.stringify(body))
    return this.http.post(this.serverweb + "/aspirante.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  updateAspirante(aspirante) {
    var body

    Object.entries(aspirante).forEach(([key, value], index) => {
      // 👇️ name Tom 0, country Chile 1
      if (key.substring(0, 4) == "asp_") {
        aspirante[key] = value.toString().toUpperCase()
      } else if (key.substring(0, 4) == "atv_") {
        aspirante[key] = value.toString()
      }
    });

    //aspirante['asp_estado']
    body = { ...aspirante, task: 'actualizar' };
    body['asp_edad'] = body['asp_edad'].toString()

    //console.log(JSON.stringify(body))  
    return this.http.post(this.serverweb + "/aspirante.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  verifyTalento(aspirante) {
    var body

    var objTalento = {}

    Object.entries(aspirante).forEach(([key, value], index) => {
      // 👇️ name Tom 0, country Chile 1
      if (key.substring(0, 4) == "atv_") {
        objTalento[key] = value.toString()
      }
    });

    objTalento['asp_estado'] = aspirante['asp_estado']
    body = { ...objTalento, task: 'talentoh1' };

    //console.log(body)
    return this.http.post(this.serverweb + "/validaciones.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  verifyPsicologia(aspirante) {
    var body

    var objTalento = {}

    Object.entries(aspirante).forEach(([key, value], index) => {
      // 👇️ name Tom 0, country Chile 1
      if (key.substring(0, 4) == "apv_") {
        objTalento[key] = value.toString()
      }
    });

    objTalento['asp_estado'] = aspirante['asp_estado']
    body = { ...objTalento, task: 'psicologia1' };

    //console.log(body)
    return this.http.post(this.serverweb + "/validaciones.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  autorizarExocupacion(aspirante) {
    var body

    var objTalento = {}

    Object.entries(aspirante).forEach(([key, value], index) => {
      // 👇️ name Tom 0, country Chile 1
      if (key.substring(0, 4) == "apv_") {
        objTalento[key] = value.toString()
      }
    });

    objTalento['asp_estado'] = aspirante['asp_estado']
    body = { ...objTalento, task: 'psicologia1' };

    //console.log(body)
    return this.http.post(this.serverweb + "/validaciones.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  listarPorEstado(id_estado) {
    var body

    //aspirante['asp_estado']
    body = { task: 'listarporestado', id_estado: id_estado };
    //body['asp_edad'] = body['asp_edad'].toString()

    //console.log(JSON.stringify(body))  
    return this.http.post(this.serverweb + "/aspirante.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  listadoPorDepartamento(estado) {
    var body

    //aspirante['asp_estado']
    body = { task: 'aspiranterol', asp_estado: estado };
    //body['asp_edad'] = body['asp_edad'].toString()

    //console.log(JSON.stringify(body))  
    return this.http.post(this.serverweb + "/validaciones.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  getAspirante(cedula) {
    var body

    //aspirante['asp_estado']
    body = { task: 'obtener', texto: cedula };
    //body['asp_edad'] = body['asp_edad'].toString()

    //console.log(JSON.stringify(body))  
    return this.http.post(this.serverweb + "/aspirante.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  getAspiranteRole(cedula,role) {
    var body

    //aspirante['asp_estado']
    body = { task: 'getaspiranterol', cedula, role };
    //body['asp_edad'] = body['asp_edad'].toString()

    //console.log(JSON.stringify(body))  
    return this.http.post(this.serverweb + "/validaciones.php", JSON.stringify(body))
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }

  newObjAspirante(aspirante) {

    aspirante.asp_cedula = ""
    aspirante.asp_codigo = ""
    aspirante.asp_nombres = ""
    aspirante.asp_apellidop = ""
    aspirante.asp_apellidom = ""
    aspirante.asp_pais = ""
    aspirante.asp_sexo = ""
    aspirante.asp_edad = ""
    aspirante.asp_correo = ""
    aspirante.asp_ecivil = ""
    aspirante.asp_gpo_sanguineo = ""
    aspirante.asp_cargo = ""
    aspirante.asp_sueldo = ""
    aspirante.asp_conadis = ""
    aspirante.asp_nro_conadis = ""
    aspirante.asp_discapacidad = ""
    aspirante.asp_porcentaje = ""
    aspirante.asp_experiencia = ""
    aspirante.asp_nmb_experiencia = ""
    aspirante.asp_ing_entrevista = ""
    aspirante.asp_fch_ingreso = ""
    aspirante.asp_telefono = ""
    aspirante.asp_direccion = ""
    aspirante.asp_hora_entrevista = ""
    aspirante.asp_referencia = ""
    aspirante.asp_estado = ""
    aspirante.asp_observaciones = "ninguna"
    aspirante.asp_observacion_medico = ""
    aspirante.asp_observacion_final = ""
    aspirante.asp_academico = ""
    aspirante.asp_fecha_nacimiento = ""
    aspirante.asp_militar = ""
    aspirante.asp_aprobacion = ""
    aspirante.asp_evaluacion = ""
    aspirante.asp_condicion = ""
    aspirante.asp_lugar_nacimiento = ""
    aspirante.asp_etnia = ""
    aspirante.asp_religion = ""
    aspirante.asp_banco = ""
    aspirante.asp_nro_cuenta = ""
    aspirante.asp_nombre_familiar = ""
    aspirante.asp_parentezco_familiar = ""
    aspirante.asp_telefono_familiar = ""
    aspirante.asp_descripcion_vivienda = ""
    aspirante.asp_referencia_vivienda = ""
    aspirante.asp_cargas = ""
    aspirante.asp_cargas_primaria = ""
    aspirante.asp_cargas_secundaria = ""
    aspirante.asp_vivienda = ""
    aspirante.asp_construccion = ""
    aspirante.asp_movilizacion = ""
    aspirante.asp_recomendado = ""


    aspirante.atv_aspirante = ""
    aspirante.atv_fingreso = ""
    aspirante.atv_fverificado = ""
    aspirante.atv_plegales = "false"
    aspirante.atv_pfiscalia = "false"
    aspirante.atv_ppenales = "false"
    aspirante.atv_plaborales = "false"
    aspirante.atv_verificado = "false"
    aspirante.atv_aprobado = "NO"

    return aspirante
  }

}


