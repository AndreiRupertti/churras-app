import { UserRepository } from "@server/repositories";
import jwt from "jsonwebtoken";
import { ISchema } from "pg-mem";
import { cookies } from "next/headers";
import { User } from "types/event";
import { NextResponse } from "next/server";

export const auth = async (req: Request, db: ISchema): Promise<User | null> => {
  const token = req.headers.get("authorization") ?? "";
  try {
    if (!token) return null;

    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_KEY!) as User;

    if (!decodedToken?.password || !decodedToken.email) return null;

    const user = await UserRepository(db).findOne(decodedToken);

    return user ? user : null;
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = () => {
  return cookies().has("accessToken");
};

export const unauthorized = () => {
  return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
};
