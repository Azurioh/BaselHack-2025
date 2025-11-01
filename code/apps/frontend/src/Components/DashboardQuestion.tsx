import { Button, Tag } from 'antd';

interface DashboardQuestionProps {
  title: string;
  topic: string;
  isAnalyzed: boolean;
  responsesCount: number;
  totalResponses: number;
  closesAt: string;
}

export function DashboardQuestion({
  title,
  topic,
  isAnalyzed,
  responsesCount,
  totalResponses,
  closesAt,
}: DashboardQuestionProps) {
  const progress = (responsesCount / totalResponses) * 100;
  return (
    <div className="flex flex-col gap-2 bg-gray-200/30 rounded-lg !p-4 border border-gray-300">
      <div className="flex w-full">
        <div className="flex flex-1 flex-col">
          <div className="flex">
            <Tag color="#2F80ED">{topic}</Tag>
            {isAnalyzed && <Tag color="#2F80ED">Analyzed</Tag>}
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-md !font-bold !mt-2">{title}</h3>
          </div>
          <div className="flex">
            <p className="text-sm text-gray-500 !mb-0">
              {responsesCount} / {totalResponses} responses
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-end">
          <h3 className="text-3xl text-gray-800 !font-bold !mb-0">{(responsesCount / totalResponses) * 100}%</h3>
        </div>
      </div>
      <div className="flex w-full h-[10px] bg-gray-200 !rounded-full relative">
        <div
          className="absolute left-0 top-0 h-full bg-primary !rounded-full"
          style={{ width: `${progress.toFixed(2)}%` }}></div>
      </div>
      <div className="flex items-center !mt-2">
        <div className="flex-1">
          <p className="text-sm text-gray-500 !mb-0">Closes {new Date(closesAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <Button type="default">View</Button>
          <Button type="default">Details</Button>
        </div>
      </div>
    </div>
  );
}
