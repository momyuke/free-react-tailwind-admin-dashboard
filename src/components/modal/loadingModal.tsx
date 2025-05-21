import { GeneralModal } from "@/components/modal/generalModal";

interface LoadingModalProps {
  loadingKey: string;
}

export const LoadingModal = (props: LoadingModalProps) => {
  return (
    <GeneralModal
      modalKey={props.loadingKey}
      className="max-w-[700px] p-6 lg:p-10 m-10"
      childClassName="flex flex-col items-center justify-items-center text-center"
    >
      <img
        className="w-30 h-30"
        src="/images/infinite-spinner.svg"
        alt="loading"
      />

      <p>Please wait...</p>
    </GeneralModal>
  );
};
