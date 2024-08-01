import { links } from "@/variables/variables";
import Link from "next/link";

export default function Mathematical() {
  return (
    <div className="flex  items-center justify-center p-4 gap-4 sm:px-0">
      {links.map((link, i) => (
        <Link
          className="block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          href={link.href}
          key={i}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
