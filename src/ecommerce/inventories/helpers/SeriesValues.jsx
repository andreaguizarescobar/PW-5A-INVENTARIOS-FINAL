import {  SeriesModel } from "../models/SeriesModel";

export const SeriesValues = (values) => {
   let Series = SeriesModel();
 
   Series.IdAlmacenOK = values.IdAlmacenOK;


   Series.series = [
       {
           Serie: values.Serie,
           Placa: values.Placa,
           Observacion: values.Observacion || null, 
       },
   ];
 
   return Series;
 };