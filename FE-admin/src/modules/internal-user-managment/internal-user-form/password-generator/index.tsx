import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { Button, CopyableInput, PasswordGeneratorInput } from "src/components";
import generatePassword from "src/lib/generatePassword";
import "./styles.css";

interface PasswordGeneratorProps {
  mode?: "create" | "edit";
  onChange?: (value: string) => void;
  errorMessage?: string;
  setPassword?: Function;
  setResetPassword?: Function;
}

export default function PasswordGenerator({
  mode,
  onChange,
  errorMessage,
  setPassword,
  setResetPassword,
}: PasswordGeneratorProps) {
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (mode === "edit") setPasswordValue("password");
  }, [mode]);

  function handleChangePasswordEdit(event: ChangeEvent<HTMLInputElement>) {
    setPasswordValue(event.target.value);
    onChange && onChange(event.target.value);
    if (!event.target.value) setShowPassword(true);
  }
  function handleChangePasswordCreate(value: string) {
    setPasswordValue(value);
    onChange && onChange(value);
  }
  function handleClickResetPassword() {
    setPasswordValue("");
    setPassword && setPassword("");
    setResetPassword && setResetPassword(true);
    setShowPassword(true);
  }
  function handleClickGenerate() {
    const pass = generatePassword(8);
    setPasswordValue(pass);
    onChange && onChange(pass);
    setShowPassword(true);
  }

  return (
    <>
      <div className={clsx("flex password-generator", errorMessage ? "mb-6" : "mb-5")}>
        {mode === "create" && (
          <CopyableInput
            type="password"
            className="mr-7.5 password-input"
            value={passwordValue}
            errorMessage={errorMessage}
            onChangeValue={handleChangePasswordCreate}
          />
        )}
        {mode === "edit" && (
          <PasswordGeneratorInput
            className="mr-7.5 password-input"
            showPassword={isShowPassword}
            value={passwordValue}
            errorMessage={errorMessage}
            onChange={handleChangePasswordEdit}
          />
        )}
        <Button
          variant="text"
          className="button-generate bg-orange-light text-white password-generate-btn hover:bg-orange-hover"
          onClick={handleClickGenerate}
        >
          {t("auto-generate")}
        </Button>
        {mode === "edit" && (
          <Button
            variant="text"
            className="button-reset bg-red-light text-white password-generate-btn ml-7.5"
            onClick={handleClickResetPassword}
          >
            {t("reset-password")}
          </Button>
        )}
      </div>
      <p className="text-sm">{t("password-requirement")}</p>
    </>
  );
}
