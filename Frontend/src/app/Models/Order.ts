export interface Order {
  expanded?: boolean;
  id: number;
  name: string;
  address: string;
  totalPrice: number;
  discount: number;
  paidAmount: number;
  remainingAmount: number;
  orderStatusId: number;
  boardId: number;
  employeesName: string;
  equipmentsName: string;
  materialsName: string;
}
