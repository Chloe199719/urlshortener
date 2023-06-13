import prisma from "@/lib/prisma/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const reqObj = await req.json();
  try {
    const { url } = z
      .object({
        url: z.string().url(),
      })
      .parse(reqObj);
    const check = await prisma.url.findUnique({
      where: {
        url: url,
      },
    });
    if (check) {
      return new Response(JSON.stringify({ url: check.shortUrl }), {
        status: 200,
      });
    }
    let shortUrl = "";
    let isFree = false;
    while (!isFree) {
      const shortUrlTemp = Math.random().toString(36).substring(2, 7);
      const check = await prisma.url.findUnique({
        where: {
          shortUrl: shortUrlTemp,
        },
      });
      if (!check) {
        shortUrl = shortUrlTemp;
        isFree = true;
      }
    }
    const newUrl = await prisma.url.create({
      data: {
        url: url,
        shortUrl: shortUrl,
      },
    });
    return new Response(JSON.stringify({ url: shortUrl }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "didnt work sorry" }), {
      status: 400,
    });
  }
}
