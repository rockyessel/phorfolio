import { PaginationResponse, ProjectItem, ProjectResponse } from '@/interface';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_OUTERBASE_URL!;

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
  const l = toast.loading('Adding project...');
  const { data } = await axios.post(`${baseURL}/projects/create`, {
    ...project,
  });
  if (data.success) {
    toast.done(l);
    toast.success('Project added successfully');
  } else if (!data.success && data.error) {
    toast.error('Something went wrong adding a project.');
  } else {
    toast.error('Unknown error occurred. Refresh the page');
  }
};
export const getAllProjectSlugs = async () => {
  const { data } = await axios.get(`${baseURL}/projects/slug`);
  return data;
};
export const getProjectBySlug = async (slug: string) => {
  const { data } = await axios.get<{ response: { items: ProjectItem[] } }>(
    `${baseURL}/projects/data/slug?slug=${slug}`
  );
  return data?.response?.items?.[0];
};

export const updateProject = async (
  project: ProjectItem,
  projectId: string
) => {
  const l = toast.loading('Updating project info...');
  const { data } = await axios.put(
    `${baseURL}/projects/update?id=${projectId}`,
    { ...project }
  );
  if (data.success) {
    toast.done(l);
    toast.success('Project updated successfully');
  } else if (!data.success && data.error) {
    toast.error('Something went wrong updating a project.');
  } else {
    toast.error('Unknown error occurred. Refresh the page');
  }
};

export const getUsersProjects = async (
  userId: string,
  pageOffset: number = 0
) => {
  const { data } = await axios.get<ProjectResponse>(
    `${baseURL}/users/projects?userId=${userId}&pageOffset=${pageOffset}`
  );

  return data;
};
export const getUserProjectTotalPageNumber = async (userId: string) => {
  const { data } = await axios.get<PaginationResponse>(
    `${baseURL}/users/projects/pages?userId=${userId}`
  );

  return data.response.items?.[0].total_pages;
};

export const likeProject = async (projectId: string) => {
  try {
    
    const l = toast.loading('😁');
    const { data } = await axios.put(`${baseURL}/projects/like`, {
      projectId: projectId,
    });

    if (data.success) {
      toast.done(l);
      toast.success('Liked 👍');
    } else if (!data.success && data.error) {
      toast.error('Something went wrong. Try again.');
    } else {
      toast.error('Unknown error occurred. Refresh the page');
    }
  } catch (error) {
    toast.dismiss();
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError.message);
      toast.error(axiosError.message);
    }
  }
};

export const updateCommentOnLoad = async (projectId: string) => {
  const { data } = await axios.get(
    `${baseURL}/projects/comments/total-count?projectId=${projectId}`
  );
  return data.success;
};

export const increaseProjectViewCount = async (projectId: string) => {
  const { data } = await axios.get(
    `${baseURL}/projects/view-count?projectId=${projectId}`
  );
  return data.success;
};
