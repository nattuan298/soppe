import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ButtonMui, Title } from "src/components";

export default function SignUpSuccess() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const backToHome = () => {
    router.push("/");
  };

  return (
    <div className="pt-5 flex items-center flex-col">
      <div className="flex flex-col">
        {/* <Title title={t`signup_success_title`} className="text-[16px] text-center" /> */}
        <Title title={t`your_payment_is_being_processed1`} className="text-center mt-4 w-full" />
        <Title title={t`your_payment_is_being_processed2`} className="text-center" />
      </div>

      <div className="pl-4 pr-4 mt-10 w-full">
        <ButtonMui fullWidth onClick={backToHome}>
          {t`back_to_home_page`}
        </ButtonMui>
      </div>
    </div>
  );
}
