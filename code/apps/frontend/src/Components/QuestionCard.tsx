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
        style={{ 
          width: '100%', 
          maxWidth: '800px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
          borderRadius: '8px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <Tag color="blue">{topic}</Tag>
          {isAnonymous && (
            <Tag style={{
              backgroundColor: 'darkgray',
              color: 'white',
            }}>
              Anonymous
            </Tag>
          )}
        </div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold', color: 'black' }}>{title}</h3>
        <p style={{ marginBottom: '16px' }}>{children}</p>
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          color: '#666',
          fontSize: '14px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span><UsergroupAddOutlined /> </span>
            <span>{responseCount} {responseCount === 1 ? 'answer' : 'answers'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span><GlobalOutlined /></span>
            <span>{targetAudience}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span><CalendarOutlined /> </span>
            <span>{createdAt}</span>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: showResponseField || showAnalysis ? '12px' : '0' }}>
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
                style={{ marginBottom: '12px' }}
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
            <div style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #d9d9d9'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <strong>Sentiment:</strong> <Tag color="green">Positive (78%)</Tag>
              </div>
              <div>
                <strong>Summary:</strong>
                <p style={{ marginTop: '8px', color: '#666' }}>
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