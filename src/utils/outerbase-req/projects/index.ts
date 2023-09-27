import { ProjectItem } from '@/interface';
import axios from 'axios';

const baseURL = 'https://minimum-aqua.cmd.outerbase.io';

export const getProjectTotalPageNumber = async () => {
  const { data } = await axios.get(`${baseURL}/project/page/total`);
  return data.response.items?.[0].total_pages;
};

export const getAllProjects = async (pageOffset: number = 0) => {
  const { data } = await axios.get(
    `${baseURL}/projects/all?pageOffset=${pageOffset}`
  );
  return data;
};

export const createProject = async (project: ProjectItem) => {
  const { data } = await axios.post(`${baseURL}/projects/create`, {
    ...project,
  });
  return data;
};
export const getAllProjectSlugs = async () => {
  const { data } = await axios.get(`${baseURL}/projects/slug`);
  return data;
};
export const getProjectBySlug = async (slug: string) => {
  const { data } = await axios.get(
    `${baseURL}/projects/data/slug?slug=${slug}`
  );
  return data?.response?.items?.[0];
};

export const updateProject = async (project: ProjectItem, projectId: string) => {
  const { data } = await axios.put(
    `${baseURL}/projects/update?id=${projectId}`,
    { ...project }
  );
  return data;
};