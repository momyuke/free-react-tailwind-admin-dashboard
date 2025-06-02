import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { LoadingModal } from "@/components/modal";
import { LoadingKeys, ModalKeys } from "@/core/domain";
import {
  AddButton,
  AddOrEditClientModal,
  TableClient,
} from "@/pages/Client/Components";
import { DeleteClientModal } from "@/pages/Client/Components/Modals";

export default function Client() {
  return (
    <>
      <PageMeta
        title="Client | Idealab.id"
        description="List Client for Idealab.id"
      />
      <PageBreadcrumb pageTitle="Client" />
      <div className="w-full space-y-6">
        <ComponentCard title="List Client">
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
