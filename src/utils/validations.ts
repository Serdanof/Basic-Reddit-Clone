import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().min(1, "User Id is required."),
  email: z.string().min(1, "Email is required").email("Must be a valid email."),
  name: z.string().min(1, "Username is required."),
  avatar: z.string().min(1, "User avatar is required."),
});
