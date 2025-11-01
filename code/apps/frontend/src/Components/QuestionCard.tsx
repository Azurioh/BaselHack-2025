import React, { useState } from "react";
import { Card, Tag, Button, Input } from "antd";
import { UsergroupAddOutlined, GlobalOutlined, CalendarOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface QuestionCardProps {
  title: string;
  children?: React.ReactNode;
  topic?: string;
  isAnonymous?: boolean;
  targetAudience?: string;
  createdAt?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  children,
  topic = "General",
  isAnonymous = false,
  targetAudience = "Public",
  createdAt = "Just now"
}) => {
  const initialResponseCount = 0;
  const [showResponseField, setShowResponseField] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseCount, setResponseCount] = useState(initialResponseCount);
  const [showAnalysis, setShowAnalysis] = useState(false);
  return (
    <div className="w-full flex justify-center p-4">
      <Card
        bordered={true}
        className="w-full max-w-3xl shadow-md rounded-lg"
      >
        <div className="flex gap-2 mb-3">
          <Tag color="blue">{topic}</Tag>
          {isAnonymous && (
            <Tag className="bg-gray-600 text-white border-gray-600">
              Anonymous
            </Tag>
          )}
        </div>
        <h3 className="m-0 mb-4 text-xl font-bold text-black">{title}</h3>
        <p className="mb-4">{children}</p>
        <div className="flex gap-6 items-center text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <span><UsergroupAddOutlined /> </span>
            <span>{responseCount} {responseCount === 1 ? 'answer' : 'answers'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span><GlobalOutlined /></span>
            <span>{targetAudience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span><CalendarOutlined /> </span>
            <span>{createdAt}</span>
          </div>
        </div>

        <div>
          <div className={`flex gap-3 ${showResponseField || showAnalysis ? 'mb-3' : ''}`}>
            <Button
              type="primary"
              onClick={() => {
                setShowResponseField(!showResponseField);
                setShowAnalysis(false);
              }}
            >
              Respond to question
            </Button>
            <Button
              onClick={() => {
                setShowAnalysis(!showAnalysis);
                setShowResponseField(false);
              }}
            >
              View Analysis
            </Button>
          </div>

          {showResponseField && (
            <div>
              <TextArea
                rows={4}
                placeholder="Write your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="mb-3"
              />
              <Button
                type="primary"
                onClick={() => {
                  if (responseText.trim()) {
                    setResponseCount(responseCount + 1);
                    setResponseText("");
                    setShowResponseField(false);
                  }
                }}
              >
                Submit Response
              </Button>
            </div>
          )}

          {showAnalysis && (
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="mb-3">
                <strong>Sentiment:</strong> <Tag color="green">Positive (78%)</Tag>
              </div>
              <div>
                <strong>Summary:</strong>
                <p className="mt-2 text-gray-600">
                  The responses show strong positive sentiment with a focus on innovation and team collaboration. 
                  Participants are generally satisfied and engaged with the topic.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuestionCard;