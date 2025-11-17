import { useSwrData } from "../../helpers/swr";

export const useProjectList = () => {
  const tokenId = "";
  const {
    data: projectData,
    mutate: projectStatusMutate,
    isLoading: loading,
  } = useSwrData(tokenId && `/projects/app/user-project-dashboard`);
  return { projectData, projectStatusMutate, loading };
};
