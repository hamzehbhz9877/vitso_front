import {instantClient} from "@/services/httpservice";

export const RequestShoppingCart =  (): Promise<ApiResponse<ShoppingCart>> =>
    instantClient.get('ShoppingCart',);
export const RequestShoppingCartPay =  () =>
    instantClient.post('ShoppingCart/Pay',);

export const RequestClearShoppingCart =  () =>
    instantClient.get('ShoppingCart/Clear',);

export const RequestShoppingCartAddItem =  (data) =>
    instantClient.post('ShoppingCart/AddItem', data);

export const RequestShoppingCartDeleteItem =  (id) =>
    instantClient.delete(`ShoppingCart/DeleteItem/${id}`);
