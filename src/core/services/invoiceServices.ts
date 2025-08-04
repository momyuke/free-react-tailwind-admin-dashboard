import { createInvoiceApi, downloadPdfInvoiceApi, editItemForInvoiceApi, getInvoicesApi } from "@/core/api/invoiceApi";
import {
  GENERAL_ERROR_MESSAGE,
  IInvoice,
  IInvoiceItem,
  LoadingKeys,
  ModalKeys,
  PaginationKeys,
  PaginationRequest
} from "@/core/domain";
import {
  closeModal,
  openModal,
  setMessage,
} from "@/core/services/modalServices";
import { useAppStore } from "../stores/appStore";
import { setPagination, SetPaginationProps } from "./paginationServices";

export const getInvoices = async ({ page, perPage }: PaginationRequest) => {
  const { setState } = useAppStore;
  openModal(LoadingKeys.LOADING_INVOICE);
  try {
    const response = await getInvoicesApi({ page, perPage });
    const pagination: SetPaginationProps = {
      key: PaginationKeys.INVOICE,
      perPage: perPage || 10,
      page,
      count: response.totalCount,
    };
    setPagination(pagination);
    setState(() => ({ invoices: response.items }));
  } catch (e) {
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
    console.info(e);
  } finally {
    closeModal(LoadingKeys.LOADING_INVOICE);
  }
};

// const getProjectsWithPagination = () => {
//   const { getState } = useAppStore;
//   const { paginations } = getState();
//   getProjects(paginations[PaginationKeys.PROJECT]);
// };

export const createInvoice = async (invoice: IInvoice) => {
  openModal(LoadingKeys.LOADING_CUD_INVOICE);
  try {
    const response = await createInvoiceApi(invoice);
    setMessage(
      ModalKeys.GENERAL_MESSAGE,
      response.message ?? "Success Add Invoice Data"
    );
    openModal(ModalKeys.GENERAL_MESSAGE);
    // getProjectsWithPagination();
  } catch (e) {
    console.info(e);
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
  } finally {
    closeModal(LoadingKeys.LOADING_CUD_INVOICE);
    closeModal(ModalKeys.ADD_PROJECT);
  }
};

export const selectInvoice = (invoice: IInvoice) => {
  const { setState } = useAppStore;
  setState(() => ({ selectedInvoice: invoice }))
}

export const editItemForInvoice = async (invoiceItem: IInvoiceItem) => {
  openModal(LoadingKeys.LOADING_CUD_INVOICE);
  try {

    const response = await editItemForInvoiceApi(invoiceItem)
    setMessage(
      ModalKeys.GENERAL_MESSAGE,
      response.message ?? "Success Add Invoice Data"
    );
    openModal(ModalKeys.GENERAL_MESSAGE);
  } catch (e) {
    console.info(e);
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
  } finally {
    closeModal(LoadingKeys.LOADING_CUD_INVOICE);
    closeModal(ModalKeys.ADD_PROJECT);
  }
}

export const downloadPdf = async (invoiceId: string) => {
  openModal(LoadingKeys.LOADING_CUD_INVOICE);
  try {

    const base64 = await downloadPdfInvoiceApi(invoiceId)

    // Convert base64 to a Blob
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length)
      .fill()
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "document.pdf";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    setMessage(
      ModalKeys.GENERAL_MESSAGE,
      "Success Download Invoice"
    );
    openModal(ModalKeys.GENERAL_MESSAGE);
  } catch (e) {
    console.info(e);
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
  } finally {
    closeModal(LoadingKeys.LOADING_CUD_INVOICE);
    closeModal(ModalKeys.ADD_PROJECT);
  }
}

// export const editProject = async (project: IProject) => {
//   openModal(LoadingKeys.LOADING_CUD_PROJECT);
//   try {
//     const response = await editProjectApi(project);
//     setMessage(
//       ModalKeys.GENERAL_MESSAGE,
//       response.message ?? "Success Edit Project Data"
//     );
//     openModal(ModalKeys.GENERAL_MESSAGE);
//     getProjectsWithPagination();
//     removeSelectedProject();
//   } catch (e) {
//     console.info(e);
//     setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
//     openModal(ModalKeys.GENERAL_MESSAGE);
//   } finally {
//     closeModal(LoadingKeys.LOADING_CUD_PROJECT);
//     closeModal(ModalKeys.UPDATE_PROJECT);
//   }
// };

// export const setStatusActiveProject = async (id: string) => {
//   changeActiveProjectsApi(id);
// };

// export const deleteProject = async (id: string) => {
//   openModal(LoadingKeys.LOADING_CUD_PROJECT);
//   try {
//     const response = await deleteProjectsApi(id);
//     setMessage(
//       ModalKeys.GENERAL_MESSAGE,
//       response.message ?? "Success Delete Project Data"
//     );
//     openModal(ModalKeys.GENERAL_MESSAGE);
//     getProjectsWithPagination();
//     removeSelectedProject();
//   } catch (e) {
//     console.info(e);
//     setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
//     openModal(ModalKeys.GENERAL_MESSAGE);
//   } finally {
//     closeModal(LoadingKeys.LOADING_CUD_PROJECT);
//     closeModal(ModalKeys.DELETE_PROJECT);
//   }
// };

// export const selectProject = (project?: IProject) => {
//   const { setState } = useAppStore;
//   setState(() => ({ selectedProject: project }));
// };

// export const removeSelectedProject = () => {
//   const { setState } = useAppStore;
//   setState(() => ({ selectedProject: undefined }));
// };
