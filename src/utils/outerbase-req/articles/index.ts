import { ArticleItem } from '@/interface';
import axios from 'axios';

const baseURL = `https://minimum-aqua.cmd.outerbase.io`;

export const getAllArticles = async (pageOffset: number = 0) => {
  try {
    const { data } = await axios.get(`${baseURL}/articles/all?pageOffset=${pageOffset}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getArticleBySlug = async (slug: string) => {
  const { data } = await axios.get(`${baseURL}/data/slug?slug=${slug}`);
  const article = data.response?.items?.[0];

  return article;
};

export const updateArticle = async (articleData: ArticleItem, id: string) => {
  try {
    const response = await fetch(`${baseURL}/article/update?id=${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...articleData }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
