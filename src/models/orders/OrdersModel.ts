import { PaymentMethod } from "../_enums/PaymentMethodEnum";
import { OrderProductsModel } from "./OrderProductsModel";

export interface OrdersModel {
    OrderId: number;
    OrderDate: string;
    UserId: string;
    Products: OrderProductsModel[];
    PaymentType: PaymentMethod;
}