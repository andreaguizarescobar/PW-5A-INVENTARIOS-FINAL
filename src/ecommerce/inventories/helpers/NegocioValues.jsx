import {  NegocioModel } from "../models/NegociosModel";

export const NegocioValues = (values)=>{
   let Negocio =  NegocioModel()
   Negocio.IdNegocioOK=values.IdNegocioOK,
   Negocio.NombreNegocio=values.NombreNegocio,
   Negocio.ControlaSerie=values.ControlaSerie
   return Negocio
}