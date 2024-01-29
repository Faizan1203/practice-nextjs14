import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";
export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
