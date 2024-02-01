"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { PostData, PromptCardListProps } from "@app/types/types";

const PromptCardList = (promptCardListProps: PromptCardListProps) => {
  const { data, handleTagClick } = promptCardListProps;
  return (
    <div className="mt-16 prompt_layout">
      {data.length > 0 &&
        data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
            handleDelete={() => {}}
            handleEdit={() => {}}
          ></PromptCard>
        ))}
    </div>
  );
};
const Feed = () => {
  // const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<PostData[]>([]); // Provide an empty array as the initial value
  const handleSearchChange = () => {};
  const handleTagClick = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data: PostData[] = await res.json();
      setPosts(data);
    };
    fetchPosts().then((r) => r);
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={""}
          onChange={() => handleSearchChange()}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
