import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { LoadingModal } from "@/components/modal";
import { LoadingKeys, ModalKeys } from "@/core/domain";
import {
  AddButton,
  AddOrEditClientModal,
  DeleteClientModal,
  TableClient,
} from "@/pages/Client/Components";

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
      <AddOrEditClientModal type={ModalKeys.ADD_CLIENT} />
      <AddOrEditClientModal type={ModalKeys.UPDATE_CLIENT} />
      <DeleteClientModal />
      <LoadingModal
        loadingKey={LoadingKeys.LOADING_CUD_CLIENT}
        isAbleToEscape={false}
      />
    </>
  );
}
