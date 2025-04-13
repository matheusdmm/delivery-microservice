export type OrderStatus =
  | 'pending'
  | 'in progress'
  | 'on deliver'
  | 'delivered';

export interface Order {
  id: string;
  cliente: string;
  itens: string[];
  status: OrderStatus;
}
