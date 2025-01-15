import { TLoading } from "@/interfaces/loading.interface";
import { createAppSlice } from "@/libs/CreateAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export interface ILoadingSlice {
  status: TLoading;
}


const initialState: ILoadingSlice = {
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const loadingSlice = createAppSlice({
  name: "loading",
  // `createSlice` will infer the state type from the `initialState` argument,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    updateStatus: create.reducer((state, action: PayloadAction<TLoading>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.status = action.payload;
    }),

    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.

    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     const response = await fetchCount(amount);
    //     // The value we return becomes the `fulfilled` action payload
    //     return response.data;
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle";
    //       state.value += action.payload;
    //     },
    //     rejected: (state) => {
    //       state.status = "failed";
    //     },
    //   }
    // ),
  }),

  selectors: {
    selectStatus: (loading) => loading.status,
  },
});

// Action creators are generated for each case reducer function.
export const { updateStatus } = loadingSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus } = loadingSlice.selectors;

