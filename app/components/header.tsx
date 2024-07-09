import Link from "next/link";

export default function Header(){
    return (
        <header className="p-6 border-b flex items-center justify-between bg-blue-500 rounded-bl-lg rounded-br-lg">
           <Link className="text-2xl font-bold text-white" href={"/"}>Monthly Expense</Link>
           <Link className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold" href={"/pages/create"}>Add New</Link>
        </header>
    )
}