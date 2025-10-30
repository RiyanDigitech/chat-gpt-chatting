import { api } from "@/lib/apiClient";

export const AuthService = {
  signup: async (data: any) => {
    const res = await api.post("/auth/signup", data);
    return res.data;
  },

  login: async (data: any) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },
};
