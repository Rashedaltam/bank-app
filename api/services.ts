/// manage all services endpoints with the BE
import { useQuery } from "@tanstack/react-query";
import { instance } from ".";

////////// "Get your Profile" API

const GetProfile = async () => {
  const responce = await instance.get("/mini-project/api/auth/me");
  return responce.data;
};

///// "Get Your Transactions"
const GetTransactions = async () => {
  const responce = await instance.get("/mini-project/api/transactions/my");
  return responce.data;
};

////// "Get all Users"
const GetAllUsers = async () => {
  const responce = await instance.get("/mini-project/api/auth/users");
  return responce.data;
};

/////// "Update your profile"

const UpdateProfile = async () => {
  const responce = await instance.put("/mini-project/api/auth/profile");
  return responce.data;
};

////// "Deposit to your account"

const DepositToAccount = async (amount:number) => {
  const responce = await instance.put("/mini-project/api/transactions/deposit");
  return responce.data;
};

////// "Withdraw from your account"

const WithdrawFromoAccount = async (amount:number) => {
  const responce = await instance.put(
    "/mini-project/api/transactions/withdraw"
  );
  return responce.data;
};

//////// Transfer to another user from my account

const TransferfromMYAcc = async (amount:number, username:string) => {
  const responce = await instance.put(
    "/mini-project/api/transactions/transfer/<username>"
  );
  return responce.data;
};

////// Get User Info by user ID
const GetUserInfo = async (userId: number) => {
  const responce = await instance.get(`/mini-project/api/auth/user/"${userId}`);
  return responce.data;
};



export {
  DepositToAccount,
  GetAllUsers,
  GetProfile,
  GetTransactions,
  GetUserInfo,
  TransferfromMYAcc,
  UpdateProfile,
  WithdrawFromoAccount,
};
