import React, { useEffect, useRef, useState } from "react";
import { NUMBER_OF_OTP_DIGITS, OTP_INPUT_STYLE } from "../../utils/constants";
import { OtpFormTypes, otpSchmea } from "../../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const Otp = () => {
  const [otp, setOtp] = useState(new Array(NUMBER_OF_OTP_DIGITS).fill(""));
  const [resendOtp, setResendOtp] = useState(false);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormTypes>({
    defaultValues: { otp: "" },
    resolver: zodResolver(otpSchmea),
  });

  // const { mutate, isPending, isError, error } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: (data) => {
  //     if (data.success) {
  //       console.log("Otp sent successfully");
  //       navigate(VERIFY_OTP_ROUTE);
  //     }
  //   },
  //   onError: (err: AxiosError) => {
  //     console.error(
  //       "Error from server:",
  //       (err.response?.data as Error).message
  //     );
  //   },
  // });

  console.log(errors)

  const onSubmit: SubmitHandler<OtpFormTypes> = (data) => {
    console.log(data);
    // mutate(data);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    let newArr = [...otp];
    newArr[index] = e.target.value;
    setOtp(newArr);

    if (e.target.value && index < NUMBER_OF_OTP_DIGITS - 1) {
      inputRef.current[index + 1]?.focus();
    }
  }

  function handleBackspace(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (
      e.key === "Backspace" &&
      !(e.target as HTMLInputElement).value &&
      index > 0
    ) {
      inputRef.current[index - 1]?.focus();
    }
  }

  const handleResend = () => {
    setResendOtp(true);
    setTimeout(() => {
      setResendOtp(false);
    }, 5000);
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const element = () => {
    return Array.from({ length: NUMBER_OF_OTP_DIGITS }).map((_, index) => (
      <div className="w-16 h-16" key={index}>
        <input
          className={OTP_INPUT_STYLE}
          type="text"
          maxLength={1}
          id="otp"
          {...register("otp")}
          inputMode="numeric"
          ref={(reference) => (inputRef.current[index] = reference)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
        />
      </div>
    ));
  };

  return (
    <div>
      <form
        className="flex flex-col space-y-16"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            {element()}
          </div>

          <div className="flex flex-col space-y-5">
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-[#1964FF] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
              >
                Verify Account
              </button>
            </div>

            {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn't receive code?</p>{" "}
              <button
                type="button"
                disabled={resendOtp}
                onClick={handleResend}
                className="flex flex-row items-center text-blue-600"
              >
                Resend
              </button>
            </div> */}
          </div>
      </form>
    </div>
  );
};

export default Otp;
