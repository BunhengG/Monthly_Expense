import Link from "next/link";

export default function Footer(){
    return (
        <footer className="md:p-4 p-3 flex justify-between">
           <h1 className="md:text-lg text-sm">© 2024 Monthly Expense. All rights reserved.</h1>
           <Link className="font-bold underline text-blue-600 md:text-lg text-sm" href={"https://t.me/hengKhunNathip"}>Bunheng</Link>
        </footer>
    )
}