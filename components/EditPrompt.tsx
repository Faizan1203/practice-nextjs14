"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { PostTagAndData } from "@app/types/types";

const HandleEdit = () => {
  const promptId = useSearchParams().get("id");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  let [post, setPost] = useState<PostTagAndData>({
    data: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        data: data[0].prompt, // TODO: RENAME PROMPT TO DATA IN DATABASE
        tag: data[0].tag,
      });
    };
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);
  const updatePrompt = async (e: Event) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) {
      return alert("Prompt not found");
    }
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          data: post.data,
          tag: post.tag,
        } as PostTagAndData),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      postTagAndData={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default HandleEdit;
