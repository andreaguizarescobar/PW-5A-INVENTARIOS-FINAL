import {  InstitutoModel } from "../models/InstitutosModel";

export const InstitutoValues = (values)=>{
   let Instituto =  InstitutoModel()
   Instituto.IdInstitutoOK=values.IdInstitutoOK,
   Instituto.NombreInstituto=values.NombreInstituto,
   Instituto.IdProdServOK=values.IdProdServOK,
   Instituto.IdPresentaOK=values.IdPresentaOK
   return Instituto
}