import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { id, email } = await req.json();

  await prisma.user.upsert({
    where: { id },
    update: {},
    create: { id, email, role: "user" },
  });

  return new Response("User saved", { status: 200 });
}