import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { LoadingModal } from "@/components/modal";
import { LoadingKeys, ModalKeys } from "@/core/domain";
import {
  AddButton,
  TableClient
} from "@/pages/Client/Components";
import { AddOrEditProjectModal, DeleteProjectModal } from "@/pages/Project/Components";

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
          <TableClient />
        </ComponentCard>
      </div>
      <AddOrEditProjectModal type={ModalKeys.ADD_PROJECT} />
      <AddOrEditProjectModal type={ModalKeys.UPDATE_PROJECT} />
      <DeleteProjectModal />
      <LoadingModal
        loadingKey={LoadingKeys.LOADING_CUD_PROJECT}
        isAbleToEscape={false}
      />
    </>
  );
}
