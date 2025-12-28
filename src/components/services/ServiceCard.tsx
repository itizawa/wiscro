type Props = {
  title: string;
  summary: string;
  description: string;
  features?: string[];
};

export const ServiceCard = ({
  title,
  summary,
  description,
  features,
}: Props) => {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold text-[#2F4A7B]">{title}</h3>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{summary}</p>

      <div className="space-y-3">
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>

      {features && features.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-[#2F4A7B] mb-2">
            主なサービス内容：
          </h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start"
              >
                <span className="text-[#ffb86a] mr-2 flex-shrink-0">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
