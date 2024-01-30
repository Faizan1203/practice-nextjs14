import prisma from "@utils/PrismaClient";
export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        creatorId: params.id,
      },
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
