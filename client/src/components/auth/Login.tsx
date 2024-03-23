import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormTypes, loginSchema } from "../../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/constants";
import { AxiosError } from "axios";


const Login = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormTypes>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const {mutate,isPending,isError,error} = useMutation({
    mutationFn: login,
    onSuccess : (data) => {
      localStorage.setItem("token",data.data.token)
      navigate(HOME_ROUTE)    
    },
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);
    },
  })

  const onSubmit: SubmitHandler<LoginFormTypes> = (data) => {
    console.log(data);
    mutate(data)
  };

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="email"
              placeholder="name@yahoo.com"
              {...register("email")}
              autoComplete="email"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
            /> 
          </div>
          {errors.email && (
            <p className="my-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-[#1964FF] hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-1">
            <input
              id="password"
              placeholder="test123"
              {...register("password")}
              type="password"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
            />
          </div>
          {errors.password && (
            <p className="my-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-[#1964FF] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
          >
            {isPending ? "Processing..." : "Log in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
