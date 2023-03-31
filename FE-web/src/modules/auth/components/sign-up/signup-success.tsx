import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonMui, Title } from "src/components";
import { routeSigninBase } from "src/constants/routes";
import { TimeAutoRedirect } from "src/constants/signup";
import useCounter from "src/hooks/conter";

export default function SignUpSuccess() {
  const { t } = useTranslation("common");
  const { counter } = useCounter(TimeAutoRedirect);
  const router = useRouter();
  const [disabled, setdisabled] = useState(false);

  const backToSignIn = () => {
    setdisabled(true);
    router.push(routeSigninBase);
  };

  useEffect(() => {
    if (counter === 0) {
      backToSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <div className="pt-5 flex items-center flex-col">
      <div className="max-w-14.5 flex flex-col">
        <Title title={t`signup_success_title`} className="text-[16px] text-center min-w-max" />
        <Title title={t`signup_success_body`} className="text-center mt-4 -m-2" />
      </div>

      <div className="pl-4 pr-4 mt-10 w-full">
        <ButtonMui fullWidth onClick={backToSignIn} disabled={disabled}>
          {t`redirect_to_signin_in`} {counter}s
        </ButtonMui>
      </div>
    </div>
  );
}
