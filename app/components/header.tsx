import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="md:p-6 p-4 border-b flex items-center justify-between bg-blue-500 rounded-bl-lg rounded-br-lg" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <Link className="text-lg font-bold text-white xl:text-2xl lg:text-2xl md:text-2xl" href={"/"} passHref>
        Monthly Expense
      </Link>
      <Link className="bg-slate-100 p-2 rounded-xl" href={"/pages/create"} passHref>
        <FaCirclePlus size={24} />
      </Link>
    </header>
  );
};

export default Header;
