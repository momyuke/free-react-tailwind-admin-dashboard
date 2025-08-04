import { InvoiceStoreState } from "@/core/domain";

export const createInvoiceStore = (): InvoiceStoreState => {
    return {
        invoices: [],
        selectedInvoice: {}
    };
};
