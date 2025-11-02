import { BarChartOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';

interface HistoryQuestionProps {
  questionId: string;
  title: string;
  topic: string;
  targetAudience: string;
  createdAt: string;
}

export function HistoryQuestion({ questionId, title, topic, targetAudience, createdAt }: HistoryQuestionProps) {
  return (
    <div className="flex flex-col gap-2 bg-gray-200/30 rounded-lg !p-4 border border-gray-300 w-full">
      <div className="flex w-full">
        <div className="flex w-[95%] flex-col">
          <div className="flex">
            <Tag color="#2F80ED">{topic}</Tag>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-md !font-bold !mt-2">{title}</h3>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm text-gray-500 !mb-0">Closes {new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button icon={<BarChartOutlined />} type="default">
            Analyze
          </Button>
        </div>
      </div>
    </div>
  );
}
