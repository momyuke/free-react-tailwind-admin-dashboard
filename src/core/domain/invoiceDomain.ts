
export interface IInvoice {
  createdAt?: string;
  createdBy?: string;
  description?: string;
  dueDate?: string;
  id?: string;
  invoiceNo?: string;
  isDeleted?: number;
  paid?: number;
  projectId?: string;
  restOfBill?: number;
  totalBill?: number;
}

export const invoiceDefault: IInvoice = {
  createdAt: '',
  createdBy: '',
  description: '',  
  dueDate: '',
  id: '',
  invoiceNo: '',
  isDeleted: 0,
  paid: 0,
  projectId: '',
  restOfBill: 0,
  totalBill: 0,
}

export interface IInvoiceItem {
  id?: string,
  invoiceId?: string,
  item?: string,
  price?: number
}

export const invoiceItemDefault: IInvoiceItem = {
  id : '',
  invoiceId: '',
  item: '',
  price: 0
}