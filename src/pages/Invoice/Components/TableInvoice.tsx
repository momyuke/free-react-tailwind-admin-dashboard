import { Loading } from "@/components/common/Loading";
import { ActionButton } from "@/components/ui/button/ActionButton";
import { Column, GenericTable } from "@/components/ui/table/GenericTable";
import { Pagination } from "@/components/ui/table/Pagination";
import {
  IInvoice,
  invoiceDefault,
  LoadingKeys,
  ModalKeys,
  PaginationKeys
} from "@/core/domain";
import { useFetchDispatch } from "@/core/hooks/useFetchDispatch";
import { downloadPdf, getInvoices, openModal, selectInvoice } from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";
import { camelToReadable, formatCurrency } from "@/core/utils";
import { useCallback, useMemo } from "react";
const excludeField = ["id", "createdAt", "clientId", "createdBy", "isDeleted", "projectId"];

export const TableInvoice = () => {
  const { invoices, isOpen } = useAppStore();

  // const onDelete = useCallback((invoice: IInvoice) => {
  //   selectProject(invoice);
  //   openModal(ModalKeys.DELETE_PROJECT);
  // }, []);

  const onUpdate = useCallback((invoice: IInvoice) => {
    selectInvoice(invoice);
    console.log(invoice)
    openModal(ModalKeys.ADD_ITEM_INVOICE);
  }, []);

  const onDownloadPdf = useCallback((invoice: IInvoice) => {
    downloadPdf(invoice?.id ?? '');
  }, [])


  // const onCreateInvoice = useCallback((project: IInvoice) => {
  //   selectProject(project);
  //   openModal(ModalKeys.ADD_INVOICE);
  // }, []);

  // const onChangeStatus = (id: string) => {
  //   setStatusActiveProject(id);
  // };

  const columns: Column<IInvoice>[] = useMemo(() => {
    return Object.keys({
      ...invoiceDefault,
      ...{ action: "" },
    })
      .filter((e) => !excludeField.includes(e))
      .map((key) => {
        switch (key) {
          case "paid":
          case "restOfBill":
          case "totalBill":
            return {
              key,
              label: camelToReadable(key),
              render(_, invoice) {
                return <p>Rp. {formatCurrency(invoice[key] ?? 0)}</p>
              }
            }

          case "action":
            return {
              key,
              label: camelToReadable(key),
              render: (_: unknown, data: IInvoice) => (
                <ActionButton<IInvoice>
                  data={data}
                  showUpdateButton
                  onUpdate={onDownloadPdf}
                  updateWordingButton="Download Invoice"
                />
              ),
            } as unknown as Column<IInvoice>;


          default:
            return {
              key,
              label: camelToReadable(key),
              render: null,
            } as unknown as Column<IInvoice>;
        }
      });
  }, []);

  useFetchDispatch(
    () => {
      getInvoices({ page: 1, perPage: 10 });
    },
    [],
    { componentDidMounted: true }
  );

  const onChange = (page: number, perPage: number) => {
    getInvoices({ page, perPage });
  };

  if (isOpen[LoadingKeys.LOADING_INVOICE]) {
    return <Loading />;
  }

  return (
    <div>
      <GenericTable<IInvoice> data={invoices} columns={columns} />
      <Pagination paginationKey={PaginationKeys.PROJECT} onChange={onChange} />
    </div>
  );
};
