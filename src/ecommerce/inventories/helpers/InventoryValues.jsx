import {  InventoryModel } from "../models/InventoriesModel";

export const InventoryValues = (values)=>{
   let Inventory =  InventoryModel()
   Inventory.IdAlmacenOK=values.IdAlmacenOK,
   Inventory.Principal=values.Principal,
   Inventory.CantidadActual=values.CantidadActual,
   Inventory.CantidadDisponible=values.CantidadDisponible,
   Inventory.CantidadApartada=values.CantidadApartada,
   Inventory.CantidadTransito=values.CantidadTransito,
   Inventory.StockMaximo=values.StockMaximo,
   Inventory.StockMinimo=values.StockMinimo
   return Inventory
}