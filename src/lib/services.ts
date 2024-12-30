import type { User } from "node-telegram-bot-api";
import { db } from "./db";

export async function create_new_user_database(
  users: User[] | undefined
): Promise<User[] | undefined> {
  const unique_users_ids = users?.map((user) => user.id);

  try {
    const existing_users = await db.user.findMany({
      where: {
        user_id: {
          in: unique_users_ids,
        },
      },
    });

    const existing_users_ids = existing_users.map((user) => user.user_id);

    const no_users = users?.filter(
      (user) => !existing_users_ids.includes(BigInt(user.id))
    );

    no_users?.forEach(async (user) => {
      await db.user.create({
        data: {
          fist_name: user.first_name,
          user_id: user.id,
          username: user.username as string,
        },
      });
    });

    return no_users;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
