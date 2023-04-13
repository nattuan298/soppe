import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { RoleModel } from "src/types/role.model";
import { ApiListModel } from "src/types/api-list.model";

// export const getRoleList = createAsyncThunk(
//   "role/getRoleList",
//   async (params: ParamListRequestModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/roles`, {
//       params,
//     })) as ApiListModel<RoleModel>;
//     return response;
//   },
// );

// export const getActiveRoleList = createAsyncThunk("role/getActiveRoleList", async () => {
//   const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/roles/active`);
//   return response;
// });

// export const getAllRoleList = createAsyncThunk("role/getAllRoleList", async () => {
//   const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/roles/list/all`);
//   return response;
// });

// export const getRoleDetail = createAsyncThunk("role/getRoleDetail", async (id: string) => {
//   const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/roles/${id}`);
//   return response;
// });

interface InitialStateType {
  roleData: ApiListModel<RoleModel>;
  activeRoleList: { _id: string; name: string }[];
  allRoleList: { _id: string; name: string }[];
  currentPermissions: any;
  roleDetail: RoleModel;
  loading: boolean;
}

const initialState: InitialStateType = {
  roleData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  currentPermissions: {},
  roleDetail: {
    permissions: [],
    _id: "",
    name: "",
    status: "",
    fullAccess: false,
    updatedAt: "",
  },
  activeRoleList: [],
  allRoleList: [],
  loading: true,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    resetCurrentPermissions: (state) => {
      state.currentPermissions = {};
    },
    setLoadingRole: (state, action) => {
      state.loading = action.payload.loading;
    },
    setListRole: (state, action) => {
      state.loading = false;
      state.roleData = action.payload;
    },
    setAllRoleList: (state, action) => {
      state.loading = false;
      state.allRoleList = action.payload;
    },
    setRoleActive: (state, action) => {
      state.loading = false;
      state.activeRoleList = action.payload;
    },
    setDetailRole: (state, action) => {
      state.loading = false;
      state.roleDetail = action.payload;
      const current: any = {};
      for (let i = 0; i < action.payload.permissions.length; i++) {
        current[action.payload.permissions[i].action] = action.payload.permissions[i];
      }
      state.currentPermissions = current;
    },
  },
  extraReducers: {
    // get roles
    // [getRoleList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getRoleList.fulfilled.toString()]: (state, action: PayloadAction<ApiListModel<RoleModel>>) => {
    //   state.loading = false;
    //   state.roleData = action.payload;
    // },
    // [getRoleList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // get active roles
    // [getActiveRoleList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<{ _id: string; name: string }[]>,
    // ) => {
    //   state.activeRoleList = action.payload;
    // },
    // get all roles
    // [getAllRoleList.pending.toString()]: (state) => {},
    // [getAllRoleList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<{ _id: string; name: string }[]>,
    // ) => {
    //   state.allRoleList = action.payload;
    // },
    // [getAllRoleList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // get roles
    // [getRoleDetail.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getRoleDetail.fulfilled.toString()]: (state, action: PayloadAction<RoleModel>) => {
    //   state.loading = false;
    //   state.roleDetail = action.payload;
    //   const current: any = {};
    //   for (let i = 0; i < action.payload.permissions.length; i++) {
    //     current[action.payload.permissions[i].action] = action.payload.permissions[i];
    //   }
    //   state.currentPermissions = current;
    // },
    // [getRoleDetail.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  resetCurrentPermissions,
  setLoadingRole,
  setListRole,
  setAllRoleList,
  setRoleActive,
  setDetailRole,
} = rolesSlice.actions;

export default rolesSlice.reducer;
