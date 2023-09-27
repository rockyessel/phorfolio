import axios from "axios";

export const getMainContentHero = async () => {
  try {
    const { data } = await axios.get(
      'https://minimum-aqua.cmd.outerbase.io/components/main-hero'
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllSideProjects = async () => {
  try {
    const { data } = await axios.get(
      'https://light-gold.cmd.outerbase.io/projects/side-project'
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllProfessionalProjects = async () => {
  try {
    const { data } = await axios.get(
      'https://light-gold.cmd.outerbase.io/projects/prefessional'
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
