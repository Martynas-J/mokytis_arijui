import { links } from "@/variables/variables";
import Link from "next/link";

const Header = () => {
  const allLinks = [{ name: "Matematika", href: "/mathematical" }, ...links];

  return (
    <nav className="bg-blue-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link
            href="/"
            className="hover:text-gray-300 transition duration-300"
          >
            Pradžia
          </Link>
        </div>
        <div className="flex space-x-4">
          {allLinks.map((link, i) => (
            <div key={i} className="relative">
              <Link
                href={link.href}
                className="hidden sm:inline-block hover:text-gray-300 transition duration-300"
              >
                {link.name}
              </Link>
              <Link
                href={link.href}
                className="sm:hidden text-3xl hover:text-gray-300 transition duration-300"
              >
                {link.sortName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
