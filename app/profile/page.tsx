"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import { PostData } from "@app/types/types";
import { Prompt } from "@prisma/client";
import ConfirmationModal from "@components/ConfirmationModal";

const ProfilePage = () => {
  const router = useRouter();
  let [isAccept, setIsAccept] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const { data: session } = useSession();
  const handleEdit = (post: Prompt) => {
    router.push(`update-prompt?id=${post.id}`);
  };
  const handleDelete = async (post: Prompt) => {
    ConfirmationModal({ setIsAccept });
    if (isAccept) {
      try {
        await fetch(`/api/prompt/${post.id.toString()}`, {
          method: "DELETE",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
          }),
        });

        const filteredPosts = posts?.filter((p) => p.id !== post.id);

        setPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) {
      fetchPosts().then((r) => r);
    }
  }, [session?.user.id]);
  return (
    <Profile
      name={""}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
