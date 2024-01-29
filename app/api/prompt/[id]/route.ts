import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: any }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    const Currprompt = await Prompt.findById(params.id);
    if (!Currprompt) return new Response("Prompt not found", { status: 404 });
    Currprompt.prompt = prompt;
    Currprompt.tag = tag;
    await Currprompt.save();
    return new Response(JSON.stringify(Currprompt), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: any }) => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt Deleted successfully", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
