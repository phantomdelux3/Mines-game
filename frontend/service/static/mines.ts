import http from "@/service/http/api";

export const getMinesOutcome = async () => {
  const response = await http.get(
    `/api/mines`
  );
  return response?.data;
};
