import { LoadingModal } from "@/components/modal";
import { LoadingKeys } from "@/core/domain";
import SignInForm from "../../components/auth/SignInForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignIn() {
  return (
    <>
      <PageMeta title="Idealab.id | Sign in" description="Sign in to Idealab" />
      <AuthLayout>
        <SignInForm />
        <LoadingModal
          loadingKey={LoadingKeys.LOADING_LOGIN}
          isAbleToEscape={false}
        />
      </AuthLayout>
    </>
  );
}
