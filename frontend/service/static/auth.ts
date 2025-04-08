import http from "@/service/http/api";


export interface SigninBody{
    email : string ;
    password : string ;
    
}
export interface SignupBody extends SigninBody{
    username :string ;
}

export const Signup = async (body : SignupBody) => {
  const response = await http.post(
    `/api/signup`,
    body
  );
  return response?.data;
};

export const Signin = async (body : SigninBody) => {
  const response = await http.post(
    `/api/signup`,
    body
  );
  return response?.data;
};
