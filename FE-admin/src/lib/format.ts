export const moneyFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB", // Baht
});

export const phoneNumberFormatter = (
  phoneCode: string | undefined,
  phoneNumber: string | undefined,
) => {
  if (phoneCode && phoneNumber) {
    const formattedPhoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(
      3,
      6,
    )}-${phoneNumber.substring(6, phoneNumber.length)}`;
    return `+${phoneCode}(0)${formattedPhoneNumber.replace(/^0/, "")}`;
  }
  return "";
};

export const textChangeLanguage = (text: string): string => {
  text?.trim();
  let str = "";
  for (let i = 0; i < text?.length; i++) {
    if (text[i] !== " ") {
      str += text[i];
    } else {
      str += "_";
    }
  }

  return str.trim().toLocaleLowerCase();
};

export enum LOCALBASE {
  MYR = "MYR",
  VND = "VND",
  THB = "THB",
  SGD = "SGD",
  LAK = "LAK",
  KHR = "KHR",
  MMK = "MMK",
}

export const getSymbolCurrencyLocalbase = (localBase: LOCALBASE): string => {
  const symbols = {
    MYR: "RM",
    VND: "₫",
    THB: "฿",
    SGD: "$",
    LAK: "₭",
    KHR: "$",
    MMK: "K",
    USD: "$",
  };
  return symbols[localBase];
};
