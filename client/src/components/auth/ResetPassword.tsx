import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordFormTypes, loginSchema, resetPasswordSchema } from "../../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/constants";
import AuthLoader from "../ui/loaders/AuthLoader";
import { resetPassword } from "../../providers/AuthProvider";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { resetToken = "" } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormTypes>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      console.log("Password Reset Successful");
      navigate(LOGIN_ROUTE, { replace: true });
    },
    onError: (err: AxiosError) => {
      console.error(
        "Error from server:",
        (err.response?.data as Error).message
      );
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormTypes> = (data) => {
    mutate({ data, resetToken });
  };

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <div className="text-sm"></div>
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <div className="text-sm"></div>
          </div>
          <div className="mt-1">
            <input
              id="confirmPassword"
              placeholder="test123"
              {...register("confirmPassword")}
              type="password"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
            />
          </div>
          {errors.confirmPassword && (
            <p className="my-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-[#1964FF] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
          >
            {isPending ? <AuthLoader /> : "Submit"}
          </button>

          <Link to={LOGIN_ROUTE}>
            {" "}
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold leading-6 text-[#1964FF] border-[1px] border-[#1964FF]  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
