"use client";
import React, { ChangeEvent, useRef, useState } from "react";

const OTP = () => {
    const inputRef = useRef<Array<HTMLInputElement| null>>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const row = e.target.value;
    const checkDigite = row.replace(/\D/g, "");
    const checkNum = checkDigite ? checkDigite[checkDigite.length - 1] : "";
    console.log(checkDigite);
    otp[index] = checkNum;
    const arr = [...otp];
    setOtp(arr);

    if(index < otp.length && checkNum){

    }
  };
  return (
    <div className="mx-auto w-full h-screen container p-4">
      <form action="">
        {otp.map((inp, ind) => (
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0 9]*"
            maxLength={1}
            value={inp}
            onChange={(e) => {
              handleChange(e, ind);
            }}
            key={inp + ind}
            ref={(el)=> {inputRef.current[ind] = el }}
            className="w-16 p-5 text-blue-950 border "
          />
        ))}
      </form>
    </div>
  );
};

export default OTP;
