import dynamic from "next/dynamic";

export default function Minus() {
  const DynamicMatematika = dynamic(() => import("../../components/scores"), {
    loading: () => <p className="text-center">Kraunama...</p>,
    ssr: false,
  });

  return <DynamicMatematika action="multiplication" title="Daugyba" />;
}
