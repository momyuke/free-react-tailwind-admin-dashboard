import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { LoadingModal } from "@/components/modal";
import { LoadingKeys, ModalKeys } from "@/core/domain";

import { AddButton, AddOrEditProjectModal, DeleteProjectModal } from "@/pages/Project/Components";
import { CreateInvoiceModal } from "@/pages/Project/Components/Modals";
import { TableProject } from "@/pages/Project/Components/TableProject";

export default function Project() {
  return (
    <>
      <PageMeta
        title="Project | Idealab.id"
        description="List Project for Idealab.id"
      />
      <PageBreadcrumb pageTitle="Project" />
      <div className="w-full space-y-6">
        <ComponentCard title="List Project">
          <AddButton />
          <TableProject />
        </ComponentCard>
      </div>
      <AddOrEditProjectModal type={ModalKeys.ADD_PROJECT} />
      <AddOrEditProjectModal type={ModalKeys.UPDATE_PROJECT} />
      <DeleteProjectModal />
      <CreateInvoiceModal />
      <LoadingModal
        loadingKey={LoadingKeys.LOADING_CUD_PROJECT}
        isAbleToEscape={false}
      />
    </>
  );
}
