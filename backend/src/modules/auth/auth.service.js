import { signup, getUsers } from "./auth.repository.js";

export const signupService = async (data) => {
  try {
    return await signup(data);
  } catch (error) {
    return error;
  }
};

export const getUsersService = async () => {
  try {
    return await getUsers();
  } catch (error) {
    return error;
  }
};
