/**
 * @Paths
 */

export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const VERIFY_OTP_ROUTE = "/verify-otp";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const RESET_PASSWORD_ROUTE = "/reset-password";

/**
 * @Utility
 */

export const NUMBER_OF_OTP_DIGITS = 4;

/**
 * @CONTEXT_VALUES
 */

export const loginValue = {
  statusCode: 200,
  data: {
    token: "",
  },
  message: "Login Successful",
  success: true,
};

/**
 * @Styles
 */

export const OTP_INPUT_STYLE =
  "w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700";


  /**
   * @Test
   */

  export const contacts = [
    {
      name: "John Doe",
      content : "Hey there!",
      src : "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Dog Hat",
      content : "It's so quiet outside",
      src : "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Sam Altman",
      content : "How are you?",
      src : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    },
    {
      name: "Ben Beck",
      content : "It's so quiet outside",
      src : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
