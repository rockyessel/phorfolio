export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

import React from 'react';
import { ParsedUrlQuery } from 'querystring';

export interface DefaultMetaDataProps {
  description: string;
  title: string;
  image: string;
  type: string;
  alt: string;
  keywords: string;
  publishedAt: string;
  updatedAt: string;
  MIME: string;
  author_name: string;
}

export interface HeaderProps {
  props: DefaultMetaDataProps;
}

export interface MetaInfoTagsProps {
  name: string;
  content: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  description: string;
  title: string;
  image: string;
  type: string;
  alt: string;
  keywords: string;
  publishedAt: string;
  updatedAt: string;
  MIME: string;
  author_name: string;
}

export interface CommonPath {
  success: boolean;
  response: {
    count: number;
    items: {
      slug: string;
    }[];
  };
}

export interface FormDataProps {
  name: string;
  email: string;
  message: string;
}

export interface FormErrorProps {
  state: boolean;
  msg: string;
}

interface CommentFormDataProps {
  name: string;
  profile: string;
  email: string;
  comment: string;
  _id: string;
}

interface THOUGHT_ID_PROPS {
  url: string;
  _id: string;
  close: () => void;
}

export interface Params extends ParsedUrlQuery {
  article: string;
}

export interface ApiResponse {
  success: boolean;
  response: {
    count: number;
    items: WebDeveloper[];
  };
}

export interface WebDeveloper {
  created_at: string;
  description: string;
  email: string;
  github: string;
  id: string | null;
  linkedin: string;
  sub_title: string;
  title: string;
  tools: string;
  x: string;
}

export interface ProjectResponse {
  success: boolean;
  response: {
    count: number;
    items: ProjectItem[];
  };
}

export interface ProjectItem {
  id: string;
  images: string; // Array of image URLs
  title: string;
  content: string;
  slug: string;
  description: string;
  caption: string;
  tags: string; // Array of tags or keywords
  keywords: string; // Array of keywords
  audio_url: string; // URL to audio content
  published_datetime: string; // Date and time of publication
  is_comment_disabled: boolean;
  article_id: string; // Referencing an article
  user_id: string; // Referencing a user
  portfolio_id: string; // Referencing a portfolio
  seen_count: number;
  comments_count: number;
  liked_count: number;
  is_published: boolean;
  word_count: number;
  character_count: number;
  reading_minutes: number;
  technologies: string; // Array of technologies used in the project
  github_repo: string; // URL to the GitHub repository
  live_demo_url: string; // URL to live demo or project website
  video_url: string; // URL to video demonstration
  contributors: string; // Array of contributors or team members
  licenses: string; // Array of licenses or permissions
  dependencies: string; // Array of project dependencies
  frameworks: string; // Array of frameworks used
  platform: string; // The platform or environment the project runs on
  project_status: string; // Status of the project
  support_email: string; // Contact email for support
  // issue_tracker_url: string; // URL to the issue tracker
  // release_notes_url: string; // URL to release notes
  deployment_platform: string; // Platform for deployment
  deployment_status: string; // Deployment status
  demo_credentials: string; // Demo login credentials
  certificate_url: string; // Demo login credentials
}

export interface SlugResponse {
  success: boolean;
  response: {
    count: number;
    items: ArticleItem[];
  };
}
export interface ArticleResponse {
  success: boolean;
  response: {
    count: number;
    items: ArticleItem[];
  };
}
export interface PaginationResponse {
  success: boolean;
  response: {
    count: number;
    items: { total_pages: number }[];
  };
}

export interface ArticleItem {
  id: string;
  image: string;
  title: string;
  content: string;
  slug: string;
  description: string;
  caption: string;
  tags: string;
  keywords: string;
  audio_url: string;
  published_datetime: string;
  also_published_on: string;
  is_comment_disabled: boolean;
  user_id: string;
  portfolio_id: string;
  seen_count: number;
  comments_count: number;
  liked_count: number;
  is_published: boolean;
  word_count: number;
  character_count: number;
  reading_minutes: number;
}

export interface Block {
  id: string;
  type: string;
  data: {
    text: string;
  };
}

export interface EditorDataProps {
  time: number;
  version: string;
  blocks: Block[];
}

export interface ContentCheckerProps {
  success: boolean;
  response: {
    items: {
      exists: boolean;
    }[];
    schema: boolean;
  };
}

export interface EditorContentProps {
  editorcontentoutput: string;
}

export interface EditorContentOutputProps {
  success: boolean;
  response: {
    items: EditorContentProps[];
    schema: boolean;
  };
}

export interface User {
  name: string;
  username: string;
  email: string;
  image: string;
  id: string;
  password: string;
}

export interface CommentProps {
  comment_id: string;
  reply_id: string | '';
  user_id: string;
  content: string;
  article_id: string;
  project_id: string;
  parent_comment_id?: string | '';
  created_at: string;
  replies?: CommentProps[];
}
[];

export interface AboutMe {
  id: string;
  user_id: string;
  content: string;
  hashnode_url: string;
  hackernoon_url: string;
  medium_url: string;
  freecodecamp_url: string;
  velog_url: string;
  devto_url: string;
  x_url: string;
  youtube_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  web_framework: string;
  db: string;
  version_control: string;
  lang: string;
  testing: string;
  library: string;
  github_username: string;
  profile_url: string;
  profile_url_id: string;
  full_name: string;
  email: string;
  show_github_graph: boolean;
}

export interface HomeContent {
  id: string;
  title: string;
  sub_title: string;
  description: string;
  footer_description: string;
  user_id: string;
}

export interface UserAccountEnvProps {
  id: string;
  user_id: string;
  next_public_email: string;
  next_public_email_pass: string;
}

export interface MessageProps {
  id: string;
  conversation_id: string;
  sender_id: string;
  text: string;
  created_at: string;
}

export interface ConversationProps {
  id: string;
  admin_id: string;
  user_id: string;
  subdomain: string;
  created_at: string;
}


export interface ContentCheckerProps {
  success: boolean;
  response: {
    items: {
      exists: boolean;
    }[];
    schema: boolean;
  };
}
