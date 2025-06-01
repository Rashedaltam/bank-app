/// manage all services endpoints with the BE
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

const DepositToAccount = async (amount: number) => {
  const response = await instance.put(
    "/mini-project/api/transactions/deposit",
    {
      amount: amount, //backend required data
    }
  );

  return response.data;
};

////// "Withdraw from your account"

const WithdrawFromoAccount = async (amount: number) => {
  const response = await instance.put(
    "/mini-project/api/transactions/withdraw",
    {
      amount: amount, ////backend required data
    }
  );
  return response.data;
};

//////// Transfer to another user from my account

const TransferToBeneficiary = async (amountinput: number, username: string) => {
  const response = await instance.put(
    "/mini-project/api/transactions/transfer/<username>",
    {
      amount: amountinput,
      username: username,
    }
  );
  return response.data;
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
  TransferToBeneficiary,
  UpdateProfile,
  WithdrawFromoAccount,
};
