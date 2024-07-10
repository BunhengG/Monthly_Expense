import Link from "next/link";

export default function Header(){
    return (
        <header className="md:p-6 p-3 border-b flex items-center justify-between bg-blue-500 rounded-bl-lg rounded-br-lg">
           <Link className="text-lg font-bold text-white xl:text-2xl lg:text-2xl md:text-2xl" href={"/"}>Monthly Expense</Link>
           <Link className="bg-slate-100 grid place-items-center rounded-full p-2 text-sm font-bold md:py-2 md:px-4" href={"/pages/create"}>Add New</Link>
        </header>
    )
}