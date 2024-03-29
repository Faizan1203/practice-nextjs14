import React from "react";
import PromptCard from "./PromptCard";
import { PostData, ProfileProps } from "@app/types/types";

const Profile = (profileProps: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{profileProps.name} Profile</span>
      </h1>
      <p className="desc text-left">{profileProps.desc}</p>
      <div className="mt-16 prompt_layout">
        {profileProps.data.map((post: PostData) => (
          <PromptCard
            key={post.id}
            post={post}
            handleEdit={() =>
              profileProps.handleEdit && profileProps.handleEdit(post)
            }
            handleDelete={() =>
              profileProps.handleDelete && profileProps.handleDelete(post)
            }
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
