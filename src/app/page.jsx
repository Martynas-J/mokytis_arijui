import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="space-y-4">
        <Link
          href="/mathematical"
          className="block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Matematika
        </Link>
      </div>
    </div>
  );
}
