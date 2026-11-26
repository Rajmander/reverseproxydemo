import UserModel from "./auth.model.js";
export const signup = async (userData) => {
  try {
    return await UserModel.create(userData);
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    return await UserModel.find();
  } catch (error) {
    return error;
  }
};
