import { LoadingModal, MessageModal } from "@/components/modal";
import { GENERAL_ERROR_KEY, LOADING_LOGIN_KEY } from "@/core/domain";
import SignInForm from "../../components/auth/SignInForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm />
        <LoadingModal loadingKey={LOADING_LOGIN_KEY} />
        <MessageModal modalKey={GENERAL_ERROR_KEY} />
      </AuthLayout>
    </>
  );
}
