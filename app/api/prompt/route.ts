import prisma from "@utils/PrismaClient";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";
export const GET = async (req: Request) => {
  try {
    revalidatePath("/");
    const prompts = await prisma.prompt.findMany({
      include: {
        creator: true,
      },
    });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
