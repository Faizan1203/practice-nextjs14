import { Prompt, User } from "@prisma/client";

export interface PostData extends Prompt {
  creator: User;
}

export interface PostTagAndData {
  tag: string;
  data: string;
}

export interface PromptCardProps {
  post: PostData;
  handleTagClick?: Function;
  handleEdit: Function;
  handleDelete: Function;
}

export interface ProfileProps {
  name: string;
  desc: string;
  data: PostData[];
  handleEdit?: Function;
  handleDelete?: Function;
}

export interface PromptCardListProps {
  data: PostData[];
  handleTagClick?: Function;
}

export interface SignInProfile {
  name: string;
  email: string;
  image: string;
}

export interface FormProps {
  type: string;
  postTagAndData: PostTagAndData;
  setPost: Function;
  submitting: boolean;
  handleSubmit: Function;
}
