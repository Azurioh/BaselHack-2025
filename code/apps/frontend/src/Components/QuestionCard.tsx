import { CalendarOutlined, GlobalOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Card, Input, Modal, message, Tag } from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import { createAnswer, listAnswersByQuestionId } from '../api/questions';
import { getUserIdFromToken } from '../utils/auth';

const { TextArea } = Input;

interface QuestionCardProps {
  questionId: string;
  title: string;
  onSkip: () => void;
  children?: React.ReactNode;
  topic?: string;
  isAnonymous?: boolean;
  targetAudience?: string;
  createdAt?: string;
  showResponseField?: boolean;
  setReloadQuestions: React.Dispatch<React.SetStateAction<Date>>;
  offset?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionId,
  title,
  onSkip,
  children,
  topic = 'General',
  isAnonymous = false,
  targetAudience = 'Public',
  createdAt = 'Just now',
  showResponseField = true,
  setReloadQuestions,
  offset = 0,
}) => {
  const [responseText, setResponseText] = useState('');
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

  const isTopCard = offset === 0;

  return (
    <>
      <div
        className="w-full h-[250px] absolute transition-all duration-300 hover:!z-[100]"
        style={{
          top: `${offset}px`,
          zIndex: 100 - offset, // Higher z-index for cards on top (lower offset)
          transform: `translateY(${(offset / 10) * -1}px)`, // Slight rotation for depth
          pointerEvents: isTopCard ? 'auto' : 'none', // Only top card can be interacted with
        }}>
        <Card
          bordered={true}
          className={`w-full shadow-lg rounded-lg h-full overflow-hidden !bg-white transition-all duration-300 ${
            isTopCard ? 'hover:!-translate hover:!shadow-2xl' : 'opacity-90'
          }`}
          style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-around' }}>
          <div className="flex gap-2 !mb-3">
            <Tag color="#2F80ED">{topic}</Tag>
            {isAnonymous && <Tag className="bg-text text-white border-text">Anonymous</Tag>}
          </div>
          <h3
            className="m-0 mb-4 text-text"
            style={{
              fontSize: 'var(--font-size-h4)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-bold)',
            }}>
            {title}
          </h3>
          <div
            className="mb-8 line-clamp-3 overflow-hidden text-ellipsis text-text"
            style={{ fontFamily: 'var(--font-body)', opacity: 0.8 }}>
            {children}
          </div>
          <div
            className="flex gap-6 items-center text-text text-sm mb-8 !mt-4"
            style={{ fontFamily: 'var(--font-body)', opacity: 0.7 }}>
            <div className="flex items-center gap-1.5">
              <span>
                <UsergroupAddOutlined />{' '}
              </span>
              <span>
                {responseCount} {responseCount === 1 ? 'answer' : 'answers'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>
                <GlobalOutlined />
              </span>
              <span>{targetAudience}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>
                <CalendarOutlined />{' '}
              </span>
              <span>{createdAt}</span>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="flex gap-2">
              <Button type="default" onClick={onSkip}>
                Skip question
              </Button>
              <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Answer question
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        title={<h2 className="text-2xl font-bold">{title}</h2>}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setResponseText('');
        }}
        footer={null}
        width={800}>
        <div className="flex gap-2 mb-4">
          <Tag color="#2F80ED">{topic}</Tag>
          {isAnonymous && <Tag className="bg-text text-white border-text">Anonymous</Tag>}
        </div>
        <div className="mb-6 text-text" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)' }}>
          {children}
        </div>
        <div className="mb-6">{children}</div>

        <div
          className="flex gap-6 items-center text-text text-sm mb-6"
          style={{ fontFamily: 'var(--font-body)', opacity: 0.7 }}>
          <div className="flex items-center gap-1.5">
            <span>
              <UsergroupAddOutlined />{' '}
            </span>
            <span>
              {responseCount} {responseCount === 1 ? 'answer' : 'answers'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>
              <GlobalOutlined />
            </span>
            <span>{targetAudience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>
              <CalendarOutlined />{' '}
            </span>
            <span>{createdAt}</span>
          </div>
        </div>

        <div>
          {showResponseField ? (
            <div className="mb-4">
              <h3
                className="text-text mb-3"
                style={{
                  fontSize: 'var(--font-size-h4)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}>
                Respond to question:
              </h3>
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
                        updatedAt: new Date(),
                      });
                      setReloadQuestions(new Date());
                      const answers = await listAnswersByQuestionId(questionId);
                      const answersArray = Array.isArray(answers) ? answers : answers.answers || answers.data || [];
                      setResponseCount(answersArray.length);
                      setResponseText('');
                      setIsModalOpen(false);
                      message.success('Response submitted successfully!');
                    } catch (error) {
                      console.error('Error submitting response:', error);
                      message.error('Failed to submit response');
                    }
                  }
                }}>
                Submit Response
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-background rounded-lg border border-secondary">
              <h3
                className="text-text mb-4 !ml-2"
                style={{
                  fontSize: 'var(--font-size-h3)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}>
                Analysis
              </h3>
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
