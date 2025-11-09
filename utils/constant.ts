export const PUBLIC_PATH = {
  LOGIN: "/login",
  FORGOTPASSWORD: "/forgot-password",
  SIGNUP:"/sign-up"
};

export const PRIVATE_PATH = {
  HOME: "/dashboard",
};

export const ROUTES_PATH = {
  ...PUBLIC_PATH,
  ...PRIVATE_PATH,
};