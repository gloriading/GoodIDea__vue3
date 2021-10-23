import { http } from "@/http-common";
import Idea from "@/types/Idea";

export const fetchAllIdeas = async (): Promise<Idea[]> => {
  const { data } = await http.get<Idea[]>("/");
  return data;
};

export const fetchIdea = async (id: string | number): Promise<Idea> => {
  const { data } = await http.get<Idea>(`/${id}`);
  return data;
};

export const createIdea = async (payload: Idea): Promise<Idea> => {
  const { data } = await http.post<Idea>("/", payload);
  return data;
};

export const deleteAll = async (): Promise<Idea[]> => {
  const { data } = await http.delete<Idea[]>("/");
  return data;
};

export const findByTitle = async (title: string): Promise<Idea[]> => {
  const { data } = await http.get<Idea[]>(`/?title=${title}`);
  return data;
};

export const updateIdea = async (
  id: string | number,
  payload: Idea
): Promise<Idea> => {
  const { data } = await http.put<Idea>(`/${id}`, payload);
  return data;
};

export const deleteIdea = async (id: string | number): Promise<Idea> => {
  const { data } = await http.delete<Idea>(`/${id}`);
  return data;
};
