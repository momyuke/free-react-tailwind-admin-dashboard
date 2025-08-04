import { axiosApi } from "@/core/api";
import {
  ApiResponse,
  APP_PATH_API,
  IInvoice,
  IInvoiceItem,
  PaginationRequest,
  PaginationResponse
} from "@/core/domain";

const INVOICE = `${APP_PATH_API}/invoice`;

export const getInvoicesApi = async ({
  page,
  perPage,
}: PaginationRequest): Promise<PaginationResponse<IInvoice>> => {
  const result = await axiosApi.get(
    `${INVOICE}/list?page=${page}&per_page=${perPage}`
  );
  const response: ApiResponse<PaginationResponse<IInvoice>> = result.data;
  return response.data;
};

export const downloadPdfInvoiceApi = async  (invoiceId: string) => {
  const result = await axiosApi.get(`${INVOICE}/export/pdf/${invoiceId}`);
  const data = result.data as ApiResponse<unknown>
  return data.data as string
}


export const createInvoiceApi = async (invoice: IInvoice) => {
  const response = await axiosApi.post(`${INVOICE}/create`, invoice);
  return response.data as ApiResponse<unknown>;
};

export const editItemForInvoiceApi = async (invoiceItem: IInvoiceItem) => {
  const response  = await axiosApi.put(`${INVOICE}/edit/${invoiceItem.invoiceId}`, invoiceItem)
  return response.data as ApiResponse<unknown>
}

// export const editProjectApi = async (project: IProject) => {
//   const response = await axiosApi.put(
//     `${PROJECT}/edit/${project.id}`,
//     project
//   );
//   return response.data as ApiResponse<unknown>;
// };

// export const deleteProjectsApi = async (id: string) => {
//   const response = await axiosApi.delete(`${PROJECT}/delete/${id}`);
//   return response.data as ApiResponse<unknown>;
// };

// export const changeActiveProjectsApi = async (id: string) => {
//   const response = await axiosApi.put(`${PROJECT}/status/${id}`);
//   return response.data as ApiResponse<unknown>;
// };
