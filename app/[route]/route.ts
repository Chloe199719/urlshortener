import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { route: string } }
) {
  try {
    const data = await prisma.url.findUniqueOrThrow({
      where: {
        shortUrl: params.route,
      },
    });
    return NextResponse.redirect(new URL(data.url));
  } catch (error) {
    return NextResponse.redirect(new URL("https://google.com"));
  }
}
