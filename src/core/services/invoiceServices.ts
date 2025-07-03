import { createInvoiceApi } from "@/core/api/invoiceApi";
import {
    GENERAL_ERROR_MESSAGE,
    IInvoice,
    LoadingKeys,
    ModalKeys
} from "@/core/domain";
import {
    closeModal,
    openModal,
    setMessage,
} from "@/core/services/modalServices";

// export const getProjects = async ({ page, perPage }: PaginationRequest) => {
//   const { setState } = useAppStore;
//   openModal(LoadingKeys.LOADING_PROJECT);
//   try {
//     const response = await getProjectsApi({ page, perPage });
//     const pagination: SetPaginationProps = {
//       key: PaginationKeys.PROJECT,
//       perPage: perPage || 10,
//       page,
//       count: response.totalCount,
//     };
//     setPagination(pagination);
//     setState(() => ({ projects: response.items }));
//   } catch (e) {
//     setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
//     openModal(ModalKeys.GENERAL_MESSAGE);
//     console.info(e);
//   } finally {
//     closeModal(LoadingKeys.LOADING_PROJECT);
//   }
// };

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
