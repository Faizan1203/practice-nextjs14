import prisma from "@utils/PrismaClient";
export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();
  try {
    const newPrompt = await prisma.prompt.create({
      data: {
        creatorId: userId,
        prompt: prompt,
        tag: tag,
      },
    });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
