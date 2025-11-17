type InputProps = {
  type: "text" | "password";
  placeholder: string;
};

export const Input = ({ type, placeholder }: InputProps) => {
  return (
    <input
      type={type}
      className="w-full px-4 py-3 border border-gray-200 rounded-[10px] text-sm text-gray-900 bg-white transition-all duration-200 focus:outline-none focus:border-[#5A2A82] focus:ring-4 focus:ring-[#5A2A82]/10 placeholder:text-gray-400"
      placeholder={placeholder}
    />
  );
};
