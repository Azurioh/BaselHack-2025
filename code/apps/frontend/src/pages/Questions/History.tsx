import '../../index.css';
import QuestionCard from '../../Components/QuestionCard';
import { getAllQuestions } from '../../api/questions';
import { useEffect, useState } from 'react';
import type { Question } from '@baselhack/shared/types/questions.types';
import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [anonymousFilter, setAnonymousFilter] = useState<string>('all');
  const [reloadQuestions, setReloadQuestions] = useState<Date>(new Date());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const globalData = await getAllQuestions();
        const questionsArray = globalData?.data?.answeredQuestions || [];
        setQuestions(questionsArray);
        setFilteredQuestions(questionsArray);
      } catch (err) {
        setError('Failed to load questions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [reloadQuestions]);

  useEffect(() => {
    let filtered = [...questions];

    if (searchText) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(searchText.toLowerCase()) ||
        q.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(q => q.category === categoryFilter);
    }

    if (anonymousFilter === 'anonymous') {
      filtered = filtered.filter(q => q.anonymous === true);
    } else if (anonymousFilter === 'public') {
      filtered = filtered.filter(q => q.anonymous === false);
    }

    setFilteredQuestions(filtered);
  }, [searchText, categoryFilter, anonymousFilter, questions]);

  const categories = Array.from(new Set(questions.map(q => q.category).filter(Boolean)));

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex justify-center items-center">
        <div className="text-lg" style={{ fontFamily: 'var(--font-body)' }}>Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen flex justify-center items-center">
        <div className="text-lg text-red-500" style={{ fontFamily: 'var(--font-body)' }}>{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen p-8 flex flex-col items-center">
      <div className="flex justify-center !mt-5">
      </div>
      <div className="my-12 w-full flex justify-center">

        <div className="bg-white/90 !p-6 rounded-xl shadow-md max-w-6xl w-full">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <Input
              placeholder="Search questions..."
              prefix={<SearchOutlined />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              className="flex-1"
            />
            <Space size="middle" wrap>
              <Select
                style={{ minWidth: 150 }}
                placeholder="Category"
                value={categoryFilter}
                onChange={setCategoryFilter}
                size="large"
              >
                <Option value="all">All Categories</Option>
                {categories.map(cat => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Select>
              <Select
                style={{ minWidth: 150 }}
                placeholder="Type"
                value={anonymousFilter}
                onChange={setAnonymousFilter}
                size="large"
              >
                <Option value="all">All Types</Option>
                <Option value="anonymous">Anonymous</Option>
                <Option value="public">Public</Option>
              </Select>
            </Space>
          </div>
        </div>
      </div>

      {filteredQuestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-1 !gap-8 w-full !max-w-7xl !mt-6 mb-12">
          {filteredQuestions.map((question: any, index) => (
              <QuestionCard
                key={index}
                questionId={question._id}
                title={question.title}
                topic={question.category}
                isAnonymous={question.anonymous}
                targetAudience={question.roleAccess?.join(', ') || 'Public'}
                createdAt={new Date(question.createdAt).toLocaleDateString()}
                showResponseField={false}
                setReloadQuestions={setReloadQuestions}
              >
                {question.description}
              </QuestionCard>
          ))}
        </div>
      )}

      {filteredQuestions.length === 0 && (
        <div className="text-gray-500 text-center !mt-20">
          No questions found matching your filters.
        </div>
      )}
      <div className="flex justify-center !mt-5">
      </div>
    </div>
  );
}
