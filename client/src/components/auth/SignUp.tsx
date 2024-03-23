import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUp = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<LoginFormTypes>({
  //   defaultValues: { email: "", password: "" },
  //   resolver: zodResolver(loginSchema),
  // });

  // console.log(errors);
  

  // const onSubmit: SubmitHandler<LoginFormTypes> = (data) => {
  //   console.log(data);
  // };

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-4"
        // onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >

     <div className="flex gap-2">
     <div className="flex-1">
          <label
            htmlFor="firstname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name<span className="text-red-500">*</span>
          </label>
          <div className="mt-1 ">
            <input
              id="firstname"
              // {...register("email")}
              placeholder="John"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
            />
          </div>
         {/* {errors.email && <p className="my-2 text-sm text-red-500">{errors.email.message}</p> } */}
        </div>

        <div className="flex-1">
          <label
            htmlFor="lastname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last Name<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="lastname"
              // {...register("email")}
              placeholder="Smith"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
            />
          </div>
         {/* {errors.email && <p className="my-2 text-sm text-red-500">{errors.email.message}</p> } */}
        </div>
     </div>

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
              // {...register("email")}
              autoComplete="email"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
            />
          </div>
         {/* {errors.email && <p className="my-2 text-sm text-red-500">{errors.email.message}</p> } */}
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
            </div>
          </div>
          <div className="mt-1">
            <input
              id="password"
              placeholder="test123"
              // {...register("password")}
              type="password"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
            />
          </div>
          {/* {errors.password && <p className="my-2 text-sm text-red-500">{errors.password.message}</p> } */}
        </div>


        <div >
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  rows={3}
                  placeholder="Describe yourself"
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
                  defaultValue={''}
                />
              </div>
            </div>

        <div>
          <button
            type="submit"
            // disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-[#1964FF] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
          >
            {/* {isSubmitting ? "Processing..." : "Log in"} */}
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
