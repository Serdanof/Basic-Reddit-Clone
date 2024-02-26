import type { User } from "@/utils/interface";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  imageUrl: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state: User, action: PayloadAction<User>) => {
      state = action.payload;
    }
  }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
