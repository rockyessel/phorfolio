import { ArticleItem, ArticleResponse, PaginationResponse } from '@/interface';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_OUTERBASE_URL!;

export const getAllArticles = async (pageOffset: number = 0) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/articles/all?pageOffset=${pageOffset}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createArticle = async (articleData: ArticleItem) => {
  try {
    const l = toast.loading('Publishing article');

    const { data } = await axios.post(`${baseURL}/article/create`, {
      ...articleData,
    });

    if (data.success) {
      toast.success('Article published successfully');
      toast.done(l);
    } else if (!data.success && data.error) {
      toast.error('No publish date added.');
    } else {
      toast.error('Unknown error occurred');
    }
  } catch (error) {
    console.error(error);
    toast.error('An error occurred while publishing the article');
  }
};

export const getArticleBySlug = async (slug: string) => {
  const { data } = await axios.get<{ response: { items: ArticleItem[] } }>(
    `${baseURL}/data/slug?slug=${slug}`
  );
  const article = data.response?.items?.[0];

  return article;
};

export const getAllArticlesSlugs = async () => {
  const { data } = await axios.get(`${baseURL}/data/all/slug`);
  return data;
};

export const getArticlePagination = async () => {
  try {
    const { data } = await axios.get<PaginationResponse>(`${baseURL}/pages`);
    return data.response.items?.[0].total_pages;
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = async (articleData: ArticleItem, id: string) => {
  try {
    const l = toast.loading('Updating article...');
    const response = await fetch(`${baseURL}/article/update?id=${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...articleData }),
    });

    const data = await response.json();

    if (data.data.success) {
      toast.done(l);
      toast.success('Updated successfully');
    } else if (!data.data.success && data.data.error) {
      toast.error('Something went wrong.');
    } else {
      toast.error('Unknown error occurred');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUsersArticles = async (
  userId: string,
  pageOffset: number = 0
) => {
  const { data } = await axios.get<ArticleResponse>(
    `${baseURL}/users/articles?userId=${userId}&pageOffset=${pageOffset}`
  );

  return data;
};
export const getUserArticleTotalPageNumber = async (userId: string) => {
  const { data } = await axios.get<PaginationResponse>(
    `${baseURL}/user/articles/pages?userId=${userId}`
  );

  return data.response.items?.[0].total_pages;
};

export const increaseArticleViewCount = async (articleId: string) => {
  const { data } = await axios.get(
    `${baseURL}/articles/views-count?articleId=${articleId}`
  );
  return data.success;
};

export const getArticleSeenCount = async (articleId: string) => {
  const { data } = await axios.get(
    `${baseURL}/article/seen-count?articleId=${articleId}`
  );
  return data.response.items?.[0].seen_count;
};

export const updateCommentOnLoad = async (articleId: string) => {
  const { data } = await axios.get(
    `${baseURL}/comments/counts?articleId=${articleId}`
  );
  return data.success;
};
