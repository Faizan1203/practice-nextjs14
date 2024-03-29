import prisma from "@utils/PrismaClient";
export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        id: params.id,
      },
    });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: any }) => {
  const { data, tag } = await req.json();
  try {
    const Currprompt = await prisma.prompt.update({
      where: {
        id: params.id,
      },
      data: {
        prompt: data,
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
    await prisma.prompt.delete({
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
