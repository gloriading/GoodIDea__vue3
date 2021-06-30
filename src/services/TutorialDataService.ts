import { http } from "@/http-common";
import Tutorial from "@/types/Tutorial";

export const fetchAllTutorials = async (): Promise<Tutorial[]> => {
  const { data } = await http.get<Tutorial[]>("/tutorials");
  return data;
};

export const fetchTutorial = async (id: string | number): Promise<Tutorial> => {
  const { data } = await http.get<Tutorial>(`/tutorials/${id}`);
  return data;
};

export const create = async (payload: Tutorial): Promise<Tutorial> => {
  const { data } = await http.post<Tutorial>("/tutorials", payload);
  return data;
};

export const deleteAll = async (): Promise<Tutorial[]> => {
  const { data } = await http.delete<Tutorial[]>("/tutorials");
  return data;
};

export const findByTitle = async (title: string): Promise<Tutorial[]> => {
  const { data } = await http.get<Tutorial[]>(`/tutorials?title=${title}`);
  return data;
};

export const updateTutorial = async (
  id: string | number,
  payload: Tutorial
): Promise<Tutorial> => {
  const { data } = await http.put<Tutorial>(`/tutorials/${id}`, payload);
  return data;
};

export const deleteTutorial = async (
  id: string | number
): Promise<Tutorial> => {
  const { data } = await http.delete<Tutorial>(`/tutorials/${id}`);
  return data;
};
