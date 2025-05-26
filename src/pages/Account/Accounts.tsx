import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import TableAccounts from "@/pages/Account/TableAccounts";

export default function Account() {
  return (
    <>
      <PageMeta
        title="Accounts | Idealab.id"
        description="List Accounts for Idealab.id"
      />
      <PageBreadcrumb pageTitle="Accounts" />
      <div className="space-y-6">
        <ComponentCard title="List Accounts">
          <TableAccounts />
        </ComponentCard>
      </div>
    </>
  );
}
