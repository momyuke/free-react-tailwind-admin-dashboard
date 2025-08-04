import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";

import { AddItemInvoiceModal } from "./Components/Modals";
import { TableInvoice } from "./Components/TableInvoice";

export default function Invoice() {
  return (
    <>
      <PageMeta
        title="Invoice | Idealab.id"
        description="List Invoice for Idealab.id"
      />
      <PageBreadcrumb pageTitle="Invoices" />
      <div className="w-full space-y-6">
        <ComponentCard title="List Invoices">
          {/* <AddButton /> */}
          <TableInvoice />
        </ComponentCard>
      </div>
      <AddItemInvoiceModal />
      {/* <AddOrEditProjectModal type={ModalKeys.ADD_PROJECT} /> */}
      {/* <AddOrEditProjectModal type={ModalKeys.UPDATE_PROJECT} /> */}
      {/* <DeleteProjectModal /> */}
      {/* <CreateInvoiceModal /> */}
      {/* <LoadingModal
        loadingKey={LoadingKeys.LOADING_CUD_PROJECT}
        isAbleToEscape={false}
      /> */}
    </>
  );
}
