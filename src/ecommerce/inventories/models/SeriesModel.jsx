export function SeriesModel() {
    let Series = {
      IdAlmacenOK: { type: String },
       
      series: [
        {
          Serie: { type: String },      
          Placa: { type: String },      
          Observacion: { type: String }, 
        },
      ], 
    };
    return Series;
  }