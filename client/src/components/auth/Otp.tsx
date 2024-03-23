import React, { useEffect, useRef, useState } from "react";
import { NUMBER_OF_OTP_DIGITS, OTP_INPUT_STYLE } from "../../utils/constants";

const Otp = () => {
  const [otp, setOtp] = useState(new Array(NUMBER_OF_OTP_DIGITS).fill(""));
  const [resendOtp,setResendOtp] = useState(false)
  const inputRef = useRef<(HTMLInputElement| null)[]>([]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
      let newArray = [...otp];
    newArray[index] = e.target.value;
    setOtp(newArray);

    if(index < NUMBER_OF_OTP_DIGITS - 1 && !otp[index+1] && newArray[index]){
      inputRef.current[index + 1]?.focus()
    }
  };

  console.log(resendOtp)

  const handleResend = () => {
    setResendOtp(true)
    setTimeout(() => {
      setResendOtp(false)
    },5000)
  }

  useEffect(() => {
    inputRef.current[0]?.focus()
  },[])

  const element = () => {
    return Array.from({ length: NUMBER_OF_OTP_DIGITS }).map((_, index) => (
      <div className="w-16 h-16" key={index}>
        <input
          className={OTP_INPUT_STYLE}
          type="text"
          value={otp[index]}
          inputMode="numeric"
          ref={(reference) => inputRef.current[index] = reference}
          onChange={(e) => handleChange(e, index)}
          maxLength={1}
          pattern="[0-9]"
        />
      </div>
    ));
  };

  return (
    <div>
      <form >
        <div className="flex flex-col space-y-16">
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            {element()}
          </div>

          <div className="flex flex-col space-y-5">
            <div>
              <button type="submit" className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                Verify Account
              </button>
            </div>

            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn't receive code?</p>{" "}
              <button
               type="button"
               disabled={resendOtp}
              onClick={handleResend}
                className="flex flex-row items-center text-blue-600"
              >
                Resend
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Otp;
