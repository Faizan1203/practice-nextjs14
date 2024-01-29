import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";
export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDatabase();
    const newPrompt = await new Prompt({
      creator: userId,
      prompt,
      tag,
    }).save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
