export const moneyFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB", // Baht
});

export const phoneNumberFormatter = (
  phoneCode: string | undefined,
  phoneNumbers: string[] | undefined,
) => {
  const results: string[] = [];
  phoneNumbers &&
    phoneNumbers.forEach((phoneNumber) => {
      const formattedPhoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(
        3,
        6,
      )}-${phoneNumber.substring(6, phoneNumber.length)}`;
      const res = `+${phoneCode}(0)${formattedPhoneNumber}`;
      results.push(res);
    });

  return results;
};

export const phoneNumberFormatter2 = (phoneCode: string | undefined, phoneNumber: string) => {
  const formattedPhoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(
    3,
    6,
  )}-${phoneNumber.substring(6, phoneNumber.length)}`;
  return `+${phoneCode}(0)${formattedPhoneNumber.replace(/^0/, "")}`;
};

export const phoneNumberFormatter22 = (
  phoneCode: string | undefined,
  phoneNumber: string | undefined,
) => {
  const formattedPhoneNumber = `${phoneNumber?.substring(0, 3)}-${phoneNumber?.substring(
    3,
    6,
  )}-${phoneNumber?.substring(6, phoneNumber?.length)}`;
  return `+${phoneCode}(0)${formattedPhoneNumber.replace(/^0/, "")}`;
};

export const phoneNumberFormatter3 = (phoneNumber: string) => {
  const formattedPhoneNumber = `${phoneNumber.substring(0, 2)}-${phoneNumber.substring(
    2,
    5,
  )}-${phoneNumber.substring(5, phoneNumber.length)}`;
  return `0${formattedPhoneNumber}`;
};

export const phoneNumberFormatter234 = (phoneCode: string | undefined, phoneNumber: string) => {
  const formattedPhoneNumber = `${phoneNumber.substring(0, 2)}-${phoneNumber.substring(
    2,
    5,
  )}-${phoneNumber.substring(5, phoneNumber.length)}`;
  return `+${phoneCode}(0)${formattedPhoneNumber}`;
};

export function formatNumber(num: number = 0) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
