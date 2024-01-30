import { retrievePrismaClient } from "@utils/PrismaClient";
import { revalidatePath } from "next/cache";
export const GET = async (req: Request) => {
  try {
    revalidatePath("/");
    const prismaClient = retrievePrismaClient();
    const prompts = await prismaClient.prompt.findMany({
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
