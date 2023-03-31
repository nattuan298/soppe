/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import { createAction } from "@reduxjs/toolkit";
import { CheckoutState } from "./type";

export const handleChangeField = createAction<Partial<CheckoutState>>("checkout/handleChangeField");
export const saveStore = createAction("checkout/saveStore");
