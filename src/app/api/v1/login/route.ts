import crypto from "crypto";
import { NextResponse } from "next/server";
import { UserRepository } from "@server/repositories";
import conn from "@server/database/connection";
import jwt from "jsonwebtoken";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  try {
    const db = conn();
    const input = await loginSchema.parseAsync(body);

    const user = await UserRepository(db).findOne(input);

    if (!user) {
      return NextResponse.json(
        { error: "email ou senha inválidos" },
        { status: 401 }
      );
    }

    const accessToken = jwt.sign(user, process.env.AUTH_TOKEN_KEY!);

    return NextResponse.json({ accessToken });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
