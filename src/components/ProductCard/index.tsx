import Image from "next/image";

type Props = {
  icon: string;
  url: string;
  title: string;
  summary: string;
};

export const ProductCard = ({ icon, url, title, summary }: Props) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="border rounded-lg p-6 flex flex-col gap-2 hover:shadow-lg transition-shadow duration-200 min-h-[150px]">
        <div className="flex items-center gap-4">
          <Image src={icon} alt={title} width={24} height={24} />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-sm">{summary}</p>
      </div>
    </a>
  );
};
