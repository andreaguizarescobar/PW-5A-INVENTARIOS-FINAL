import {  InfoAdModel } from "../../inventories/models/InfoAdModel.jsx";

export const InfoAdValues = (values)=>{
   let InfoAd =  InfoAdModel()
   InfoAd.IdEtiquetaOK=values.IdEtiquetaOK,
   InfoAd.IdEtiqueta=values.IdEtiqueta,
   InfoAd.Etiqueta=values.Etiqueta,
   InfoAd.Valor=values.Valor,
   InfoAd.IdTipoSeccionOK=values.IdTipoSeccionOK,
   InfoAd.Secuencia=values.Secuencia
   return InfoAd
}