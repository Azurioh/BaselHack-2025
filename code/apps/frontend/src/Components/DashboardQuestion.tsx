import { Button, Tag, Modal } from 'antd';
import { useState } from 'react';
import { generateConcense, listAnswersByQuestionId, getQuestionById } from '../api/questions';

interface DashboardQuestionProps {
  questionId: string;
  title: string;
  topic: string;
  isAnalyzed: boolean;
  responsesCount: number;
  totalResponses: number;
  closesAt: string;
}

export function DashboardQuestion({
  questionId,
  title,
  topic,
  isAnalyzed,
  responsesCount,
  totalResponses,
  closesAt,
}: DashboardQuestionProps) {
  const progress = (responsesCount / totalResponses) * 100;
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loadingAnswers, setLoadingAnswers] = useState(false);
  const [isConsenseModalOpen, setIsConsenseModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const handleDetailsClick = async () => {
    setIsDetailsModalOpen(true);
    setLoadingAnswers(true);
    try {
      const response = await listAnswersByQuestionId(questionId);
      const answersData = Array.isArray(response) ? response : response.data || response.answers || [];
      setAnswers(answersData);
    } catch (error) {
      console.error('Error fetching answers:', error);
    } finally {
      setLoadingAnswers(false);
    }
  };

  const handleViewClick = async () => {
    try {
      const questionData = await getQuestionById(questionId);
      setSelectedQuestion(questionData.data || questionData);
      setIsConsenseModalOpen(true);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

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
          {!isAnalyzed && <Button type="default" onClick={() => generateConcense(questionId)} >Analyze</Button>}
          <Button type="default" disabled={!isAnalyzed} onClick={handleViewClick}>View</Button>
          <Button type="default" onClick={handleDetailsClick}>Details</Button>
        </div>
      </div>

      <Modal
        title={<h2 className="text-text" style={{ fontSize: 'var(--font-size-h4)', fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-bold)' }}>Question Responses</h2>}
        open={isDetailsModalOpen}
        onCancel={() => setIsDetailsModalOpen(false)}
        footer={null}
        width={800}
      >
        <div className="mb-4">
          <h3 className="text-text mb-2" style={{ fontSize: 'var(--font-size-base)', fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)' }}>{title}</h3>
          <Tag color="#2F80ED">{topic}</Tag>
        </div>

        <div className="!mb-2 !mt-2 text-text text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          <strong>Total Responses:</strong> {responsesCount}
        </div>

        {loadingAnswers ? (
          <p className="text-center py-4 text-sm" style={{ fontFamily: 'var(--font-body)' }}>Loading answers...</p>
        ) : (
          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
            {answers.length > 0 ? (
              answers.map((answer: any, index: number) => (
                <div key={answer._id || index} className="!p-1 border border-gray-200 rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-text" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}>
                      Response #{index + 1}
                    </span>
                    <span className="text-xs text-text" style={{ fontFamily: 'var(--font-body)', opacity: 0.6 }}>
                      {answer.createdAt ? new Date(answer.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <p className="text-text text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    {answer.answer || answer.text || 'No answer text'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-text text-sm" style={{ fontFamily: 'var(--font-body)', opacity: 0.6 }}>
                No responses yet
              </p>
            )}
          </div>
        )}
      </Modal>

      <Modal
        open={isConsenseModalOpen && selectedQuestion?.concense !== undefined}
        onCancel={() => setIsConsenseModalOpen(false)}
        footer={null}
        width={1000}>
        <div className="flex flex-col w-[95%]">
          <div className="flex items-center justify-between !mb-8">
            <p className="text-2xl !font-semibold !mb-0 flex-8">{selectedQuestion?.concense?.manager_question}</p>
            <div className="flex-2 flex items-center justify-end">
              <Tag
                color={selectedQuestion?.concense?.approve_percentage >= 50 ? 'green' : 'red'}
                style={{ transform: 'scale(1.3)' }}>
                {selectedQuestion?.concense?.approve_percentage}%
              </Tag>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-xl !font-semibold !mb-0">💬 Summary of feedback</p>
              <p className="text-text !mb-0">{selectedQuestion?.concense?.summary_of_feedback}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl !font-semibold !mb-0">✅ Points of agreement</p>
              <div className="flex flex-wrap gap-3">
                {selectedQuestion?.concense?.points_of_agreement.map((point: string) => (
                  <Tag key={point} color="green">
                    {point}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl !font-semibold !mb-0">❌ Points of disagreement</p>
              <p className="text-text !mb-0">
                {selectedQuestion?.concense?.points_of_disagreement.map((point: string) => (
                  <Tag key={point} color="red">
                    {point}
                  </Tag>
                ))}
                {selectedQuestion?.concense?.points_of_disagreement.length === 0 && (
                  <p className="text-text !mb-0">No points of disagreement</p>
                )}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl !font-semibold !mb-0">🤝 Consensus summary</p>
              <p className="text-text !mb-0">{selectedQuestion?.concense?.consensus_summary}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl !font-semibold !mb-0">💡 Recommendations</p>
              <div className="text-text !mb-0 flex flex-col !gap-1 !mb-0">
                {selectedQuestion?.concense?.recommendations.map((recommendation: string) => (
                  <p key={recommendation}>{recommendation}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
