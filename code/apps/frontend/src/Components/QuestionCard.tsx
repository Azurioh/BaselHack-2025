import React, { useState, useEffect } from "react";
import { Card, Tag, Button, Input, message, Modal } from "antd";
import { UsergroupAddOutlined, GlobalOutlined, CalendarOutlined } from '@ant-design/icons';
import { createAnswer, listAnswersByQuestionId } from '../api/questions';
import { getUserIdFromToken } from '../utils/auth';

const { TextArea } = Input;

interface QuestionCardProps {
  questionId: string;
  title: string;
  children?: React.ReactNode;
  topic?: string;
  isAnonymous?: boolean;
  targetAudience?: string;
  createdAt?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionId,
  title,
  children,
  topic = "General",
  isAnonymous = false,
  targetAudience = "Public",
  createdAt = "Just now"
}) => {
  const [responseText, setResponseText] = useState("");
  const [responseCount, setResponseCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const fetchAnswersCount = async () => {
      try {
        console.log('Fetching answers for questionId:', questionId);
        const answers = await listAnswersByQuestionId(questionId);

        console.log('Answers received:', answers);
        const answersArray = Array.isArray(answers) ? answers : answers.answers || answers.data || [];
        console.log('Answers array:', answersArray, 'Length:', answersArray.length);
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
      <div className="w-full h-[250px]">
        <Card
          bordered={true}
          className="w-full shadow-lg rounded-lg h-full overflow-hidden !bg-white/70 hover:!-translate-y-1 hover:!shadow-xl transition-all duration-300 hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex gap-2 !mb-3">
            <Tag color="blue">{topic}</Tag>
            {isAnonymous && (
              <Tag className="bg-gray-600 text-white border-gray-600">
                Anonymous
              </Tag>
            )}
          </div>
          <h3 className="m-0 mb-4 text-xl font-bold text-black">{title}</h3>
          <div className="mb-8 line-clamp-3 overflow-hidden text-ellipsis">
            {children}
          </div>
          <div className="flex gap-6 items-center text-gray-600 text-sm mb-8 !mt-4">
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
          setHasSubmitted(false);
        }}
        footer={null}
        width={800}
      >
        <div className="flex gap-2 mb-4">
          <Tag color="blue">{topic}</Tag>
          {isAnonymous && (
            <Tag className="bg-gray-600 text-white border-gray-600">
              Anonymous
            </Tag>
          )}
        </div>
        <div className="mb-6">
          {children}
        </div>

        <div className="flex gap-6 items-center text-gray-600 text-sm mb-6">
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
          {!hasSubmitted ? (
            <div className="mb-4">
              <h3 className="text-mg font-semibold mb-3">Respond to question:</h3>
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
                      const answers = await listAnswersByQuestionId(questionId);
                      const answersArray = Array.isArray(answers) ? answers : answers.answers || answers.data || [];
                      setResponseCount(answersArray.length);
                      setResponseText("");
                      setHasSubmitted(true);
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
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h3 className="text-lg font-semibold mb-4">Analysis</h3>
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
      </Modal>
    </>
  );
};

export default QuestionCard;