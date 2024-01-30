import { retrievePrismaClient } from "@utils/PrismaClient";

export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    const prismaClient = retrievePrismaClient();
    const prompts = prismaClient.prompt.findMany({
      where: {
        creatorId: params.id,
      },
    });
    if (!prompts) return new Response("Prompts not found", { status: 404 });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: any }) => {
  const { prompt, tag } = await req.json();
  try {
    const prismaClient = retrievePrismaClient();
    const Currprompt = await prismaClient.prompt.update({
      where: {
        id: params.id,
      },
      data: {
        prompt: prompt,
        tag: tag,
      },
    });
    if (!Currprompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(Currprompt), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: any }) => {
  try {
    const prismaClient = retrievePrismaClient();
    await prismaClient.prompt.delete({
      where: {
        id: params.id,
      },
    });
    return new Response("Prompt Deleted successfully", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
