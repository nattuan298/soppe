/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { RootState } from "src/state/store";
import { actionCallAPIPending, handleChangeField } from "./slice";
import { BodyPost, SignupState } from "./type";

export const createTempAccount = createAsyncThunk(
  "signup/createTempAccount",
  async (refOrderId: string, thunkAPI) => {
    try {
      // disable button
      thunkAPI.dispatch(actionCallAPIPending());
      // declare body
      const { signup } = thunkAPI.getState() as RootState;
      const { phoneCode, phoneNumber, citizenship, memberType, orderId, side, coupon } = signup;
      let newPhoneNumber = phoneNumber;
      if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
        newPhoneNumber = phoneNumber.slice(1);
      }

      const body: BodyPost = {
        sponsorId: signup.sponsor.sponsorId,
        phoneCode,
        phoneNumber: newPhoneNumber,
        prefixName: signup.prefixName,
        firstName: signup.firstName.trim(),
        lastName: signup.lastName.trim(),
        dateOfBirth: dayjs(signup.birth).format("YYYY-MM-DD"),
        gender: signup.gender,
        country: signup.country,
        postalCode: signup.postalCode,
        province: signup.city.title,
        district: signup.district.title,
        subDistrict: signup.subDistrict.title,
        address: signup.address.trim(),
        bankCode: signup.bankCode,
        bankBranch: signup.bankBranch.trim(),
        accountNumber: signup.accountNumber.trim(),
        accountName: signup.accountName.trim(),
        images: [],
        citizenship,
        memberType: memberType === "1" ? 1 : 2,
        referenceOrder: orderId || refOrderId,
        side,
        couponCode: coupon,
        provinceEng: signup.city.titleEng,
        districtEng: signup.district.titleEng,
        subDistrictEng: signup.subDistrict.titleEng,
        isRemarked: signup.isRemarked,
      };
      if (signup.district.title) {
        body.district = signup.district.title;
      }
      if (signup.subDistrict.title) {
        body.subDistrict = signup.subDistrict.title;
      }
      if (signup.city.titleEng) {
        body.provinceEng = signup.city.titleEng;
      }
      if (signup.district.titleEng) {
        body.districtEng = signup.district.titleEng;
      }
      if (signup.subDistrict.titleEng) {
        body.subDistrictEng = signup.subDistrict.titleEng;
      }

      if (signup.email) {
        body.email = signup.email;
      }
      const isThai = citizenship === "Thai";
      if (isThai) {
        body.idCard = signup.idCardNumber.trim();
      } else {
        body.passportNumber = signup.idCardNumber.trim();
      }

      if (signup.idCartPhoto) {
        body.images.push({
          type: isThai ? "ID_CARD_PHOTO" : "PASSPORT_PHOTO",
          key: signup.idCartPhoto.key,
        });
      }
      if (signup.beneficiaryPhoto) {
        body.images.push({
          type: isThai ? "BENEFICIARY_ID_CARD_PHOTO" : "BENEFICIARY_PASSPORT_PHOTO",
          key: signup.beneficiaryPhoto.key,
        });
      }
      if (signup.bank_photo) {
        body.images.push({
          type: isThai ? "BOOK_BANK_PHOTO" : "CASH_CARD_PHOTO",
          key: signup.bank_photo.key,
        });
      }
      if (signup.relationship_certificate) {
        body.images.push({ type: "CERTIFICATE_PHOTO", key: signup.relationship_certificate.key });
      }

      const response = await axios.post(apiRoute.signup.temporaryAccounts, body);

      return response;
    } catch (e: any) {
      const message = e?.response?.data?.message || "";
      return thunkAPI.rejectWithValue(
        e.response?.status !== 401 && e.response?.status !== 503 ? message : "",
      );
    }
  },
);

export const paymentSignUp = createAsyncThunk(
  "signup/paymentSignUp",
  async (
    {
      token,
      data,
      callbackError,
      urlObject,
    }: {
      token?: string;
      data: SignupState;
      callbackError: (message: string) => void;
      urlObject?: URL;
    },
    { dispatch },
  ) => {
    try {
      if (data) {
        // const stateSignUp = JSON.parse(stateString) as SignupState;
        const stateSignUp = data;
        const res = await axios.post(apiRoute.sponsors.makeOrder, {
          dateOfBirth: dayjs(stateSignUp.birth).format("YYYY-MM-DD"),
          firstName: stateSignUp.firstName,
          lastName: stateSignUp.lastName,
          phoneNumber: stateSignUp.phoneNumber,
          phoneCode: stateSignUp.phoneCode,
          citizenship: stateSignUp.citizenship,
          email: stateSignUp.email,
          sponsorId: stateSignUp.sponsor.sponsorId,
          memberType: stateSignUp.memberType === "1" ? 1 : 2,
          couponCode: stateSignUp.coupon,
        });
        const orderId = res.data._id;
        dispatch(handleChangeField({ orderId }));
        dispatch(createTempAccount(orderId));
        const price = stateSignUp.memberType === "1" ? 300 : 100;

        if (
          stateSignUp.paymentMethod === "QR code" &&
          price - stateSignUp.couponRedeemAmount !== 0
        ) {
          const res2 = await axios.post(apiRoute.payment.createOrderForQRRegister, {
            amount: price - stateSignUp.couponRedeemAmount,
            currency: "THB",
            description: "Register payment by QR code",
            source_type: "qr",
            reference_order: orderId,
            ref_1: "register",
            couponCode: stateSignUp.coupon,
          });
          if (urlObject) {
            localStorage.setItem("stateSignUp", JSON.stringify({ ...stateSignUp, orderId }));
            urlObject.searchParams.set("orderIdForQR", res2.data.id);
            urlObject.searchParams.set("paymentMethod", "qr");
            window.location.href = urlObject.href;
          }
          return;
        }

        if (!token) {
          dispatch(handleChangeField({ paymentStatusForNonSecure: "success" }));
          return;
        }
        const res2 = await axios.post(apiRoute.payment.registerCharge, {
          amount: price - stateSignUp.couponRedeemAmount,
          currency: "THB",
          description: "Register Payment",
          source_type: "card",
          mode: "token",
          reference_order: orderId,
          token,
          ref_1: "register",
          couponCode: stateSignUp.coupon,
        });

        const { id, status, redirect_url, transaction_state } = res2.data;
        // non secure
        if (status === "success" && !redirect_url && transaction_state === "Authorized") {
          dispatch(handleChangeField({ paymentStatusForNonSecure: status }));
        }

        dispatch(handleChangeField({ chargeId: id, redirect_url }));
      }
    } catch (e: any) {
      const error = e.response?.status !== 401 ? e.response?.data?.message : "";
      // rejectWithValue(e.response?.status !== 401 ? e.response?.data?.message : "");
      if (error && callbackError) {
        callbackError(error);
      }
      console.error("paymentSignUp faild", e);
    }
  },
);
