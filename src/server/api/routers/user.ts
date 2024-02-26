import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserSchema } from "@/lib/validations";
import type { User } from "@/utils/interface";

export const userRouter = createTRPCRouter({
  register: publicProcedure.input(UserSchema).mutation(async ({ ctx, input }): Promise<User> => {
    try {
      const existUser = await ctx.db.user.findUnique({ where: { id: input.id } });

      if (existUser) {
        return existUser as User;
      } else {
        const newUser = await ctx.db.user.create({
          data: {
            id: input.id,
            name: input.name,
            email: input.email,
            avatar: input.avatar
          }
        });

        return newUser as User;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }),

  getById: publicProcedure.input(z.object({ id: z.string().min(1) })).query(async ({ ctx, input }) => {
    try {
      const user = await ctx.db.user.findUnique({ where: { id: input.id } });

      if (!user) {
        return {
          success: false,
          message: "User Not Found"
        };
      } else {
        return user as User;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }),
});
