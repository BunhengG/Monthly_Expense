import Link from "next/link";

export default function Footer(){
    return (
        <footer className="p-6 border-t flex justify-between">
           <h1 className="text-lg font-medium">© 2024 Monthly Expense Free. All rights reserved.</h1>
           <Link className="grid place-items-center font-bold underline" href={"/create"}>Mai Bunheng</Link>
        </footer>
    )
}