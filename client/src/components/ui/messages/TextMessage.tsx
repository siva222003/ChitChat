import { Check } from "phosphor-react";

interface TextMessageProps {
  message: string;
  isOwnMsg: boolean;
}

const TextMessage = ({ message, isOwnMsg }: TextMessageProps) => {
  return (
    <>
      {/* <div className="bg-messageRight px-3 py-3 my-2 text-white w-fit rounded-lg ml-auto flex gap-1">
        <p className="text-sm">This is a delivered message</p>
        <p className="text-[10px] flex-1 self-end">11:07 pm</p>
        <Checks size={17} className="ml-auto self-end" />
      </div> */}

      <div
        className={`bg-messageRight px-3 py-3 my-2 text-white w-fit rounded-lg flex gap-1 ${
          isOwnMsg ? "ml-auto" : "mr-auto"
        } `}
      >
        <p className="text-sm">{message}</p>
        <p className="text-[10px] flex-1 self-end">11:07 pm</p>
        <Check size={16} className="ml-auto self-end" />
      </div>

      {/* <div className="bg-messageRight px-3 py-3 my-2 text-white w-fit rounded-lg ml-auto flex gap-1">
        <p className="text-sm">This is a read message</p>
        <p className="text-[10px] flex-1 self-end">11:07 pm</p>
        <Checks size={17} className="ml-auto self-end text-blue-800" />
      </div> */}

      {/* <div className="bg-messageRight px-3 py-3 my-2 text-white w-fit rounded-lg ml-auto flex gap-1">
        <p className="text-sm">This is a sent message</p>
        <p className="text-[10px] flex-1 self-end">11:07 pm</p>
        <Clock size={14} className="ml-auto self-end" />
      </div> */}
    </>
  );
};

export default TextMessage;
