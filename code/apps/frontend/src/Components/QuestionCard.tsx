import React, { useState, useEffect } from "react";
import { Card, Tag, Button, Input, message, Modal } from "antd";
import { UsergroupAddOutlined, GlobalOutlined, CalendarOutlined } from '@ant-design/icons';
import { createAnswer, listAnswersByQuestionId } from '../api/questions';
import { getUserIdFromToken } from '../utils/auth';
import { setDefaultResultOrder } from "dns";

const { TextArea } = Input;

interface QuestionCardProps {
  questionId: string;
  title: string;
  children?: React.ReactNode;
  topic?: string;
  isAnonymous?: boolean;
  targetAudience?: string;
  createdAt?: string;
  showResponseField?: boolean;
  setReloadQuestions: React.Dispatch<React.SetStateAction<Date>>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionId,
  title,
  children,
  topic = "General",
  isAnonymous = false,
  targetAudience = "Public",
  createdAt = "Just now",
  showResponseField = true,
  setReloadQuestions
}) => {
  const [responseText, setResponseText] = useState("");
  const [responseCount, setResponseCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnswersCount = async () => {
      try {
        const answers = await listAnswersByQuestionId(questionId);

        const answersArray = Array.isArray(answers) ? answers : answers.answers || answers.data || [];
        setResponseCount(answersArray.length);
      } catch (error) {
        console.error('Error fetching answers count:', error);
      }
    };

    if (questionId) {
      fetchAnswersCount();
    }
  }, [questionId]);

  return (
    <>
      <div className="w-full">
        <Card
          bordered={true}
          className="w-full shadow-lg rounded-lg h-auto overflow-hidden !bg-white/70 hover:!-translate-y-1 hover:!shadow-xl transition-all duration-300 hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex gap-2 !mb-3">
            <Tag color="#2F80ED">{topic}</Tag>
            {isAnonymous && (
              <Tag className="bg-text text-white border-text">
                Anonymous
              </Tag>
            )}
          </div>
          <h3 className="m-0 mb-4 text-text" style={{ fontSize: 'var(--font-size-h4)', fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-bold)' }}>{title}</h3>
          <div className="mb-8 line-clamp-3 overflow-hidden text-ellipsis text-text" style={{ fontFamily: 'var(--font-body)', opacity: 0.8 }}>
            {children}
          </div>
          <div className="flex gap-6 items-center text-text text-sm mb-8 !mt-4" style={{ fontFamily: 'var(--font-body)', opacity: 0.7 }}>
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
        </Card>
      </div>

      <Modal
        title={<h2 className="text-2xl font-bold">{title}</h2>}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setResponseText("");
        }}
        footer={null}
        width={800}
      >
        <div className="flex gap-2 mb-4">
          <Tag color="#2F80ED">{topic}</Tag>
          {isAnonymous && (
            <Tag className="bg-text text-white border-text">
              Anonymous
            </Tag>
          )}
        </div>
        <div className="mb-6 text-text" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)' }}>
          {children}
        </div>

        <div className="flex gap-6 items-center text-text text-sm mb-6" style={{ fontFamily: 'var(--font-body)', opacity: 0.7 }}>
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
          {showResponseField ? (
            <div className="mb-4">
              <h3 className="text-text mb-3" style={{ fontSize: 'var(--font-size-h4)', fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)' }}>Respond to question:</h3>
              <TextArea
                rows={3}
                placeholder="Write your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="!mb-3"
              />
              <Button
                type="primary"
                onClick={async () => {
                    if (responseText.trim()) {
                      try {
                        const userId = getUserIdFromToken();
                        if (!userId) {
                          message.error('You must be logged in to respond');
                          return;
                        }
                        await createAnswer({
                          questionId: questionId as any,
                          answer: responseText,
                          userId: userId as any,
                          id: '' as any,
                          createdAt: new Date(),
                          updatedAt: new Date()
                        });
                        setReloadQuestions(new Date());
                        const answers = await listAnswersByQuestionId(questionId);
                        const answersArray = Array.isArray(answers) ? answers : answers.answers || answers.data || [];
                        setResponseCount(answersArray.length);
                        setResponseText("");
                        setIsModalOpen(false);
                        message.success('Response submitted successfully!');
                      } catch (error) {
                        console.error('Error submitting response:', error);
                        message.error('Failed to submit response');
                      }
                    }
                  }}
                >
                  Submit Response
                </Button>
            </div>
          ) : (
            <div className="p-4 bg-background rounded-lg border border-secondary">
              <h3 className="text-text mb-4 !ml-2" style={{ fontSize: 'var(--font-size-h3)', fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)' }}>Analysis</h3>
              <div className="mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                <strong>Sentiment:</strong> <Tag color="#56CCF2">Positive (78%)</Tag>
              </div>
              <div>
                <strong className="!ml-2">Summary:</strong>
                <p className="!mt-2 text-gray-600 !ml-2">
                  The responses show strong positive sentiment with a focus on innovation and team collaboration.
                  Participants are generally satisfied and engaged with the topic.
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default QuestionCard;
