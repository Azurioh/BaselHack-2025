import '../../index.css';
import { SearchOutlined } from '@ant-design/icons';
import type { Question } from '@baselhack/shared/types/questions.types';
import { Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getAllQuestions } from '../../api/questions';
import QuestionCard from '../../Components/QuestionCard';

const { Option } = Select;

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [anonymousFilter, setAnonymousFilter] = useState<string>('all');
  const [_reloadQuestions, setReloadQuestions] = useState<Date>(new Date());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const globalData = await getAllQuestions();
        console.log('Fetched questions data:', globalData);
        const questionsArray = globalData?.data?.questionsToBeAnswered || [];
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
  }, []);

  useEffect(() => {
    let filtered = [...questions];

    if (searchText) {
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(searchText.toLowerCase()) ||
          q.description.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((q) => q.category === categoryFilter);
    }

    if (anonymousFilter === 'anonymous') {
      filtered = filtered.filter((q) => q.anonymous === true);
    } else if (anonymousFilter === 'public') {
      filtered = filtered.filter((q) => q.anonymous === false);
    }

    setFilteredQuestions(filtered);
  }, [searchText, categoryFilter, anonymousFilter, questions]);

  const categories = Array.from(new Set(questions.map((q) => q.category).filter(Boolean)));

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex justify-center items-center">
        <div className="text-lg" style={{ fontFamily: 'var(--font-body)' }}>
          Loading questions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen flex justify-center items-center">
        <div className="text-lg text-red-500" style={{ fontFamily: 'var(--font-body)' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen p-8 flex flex-col items-center">
      <div className="flex justify-center !mt-5"></div>
      <div className="my-12 w-full flex justify-center">
        <div className="bg-transparent !p-6 rounded-xl max-w-6xl w-full">
          <h1
            className="text-text mb-8 text-center"
            style={{
              fontSize: 'var(--font-size-h1)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-bold)',
            }}>
            Questions to be answered
          </h1>
          <div className="flex flex-col lg:flex-row gap-4 items-center hidden">
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
                size="large">
                <Option value="all">All Categories</Option>
                {categories.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
              <Select
                style={{ minWidth: 150 }}
                placeholder="Type"
                value={anonymousFilter}
                onChange={setAnonymousFilter}
                size="large">
                <Option value="all">All Types</Option>
                <Option value="anonymous">Anonymous</Option>
                <Option value="public">Public</Option>
              </Select>
            </Space>
          </div>
        </div>
      </div>

      {filteredQuestions.length > 0 && (
        <div className="flex flex-col justify-center items-center !gap-3 w-full h-[400px] !max-w-7xl mb-12 relative">
          {filteredQuestions.slice(0, 5).map((question: any, index) => (
            <QuestionCard
              key={question._id}
              questionId={question._id}
              title={question.title}
              onSkip={() => {
                const newQuestions = [...filteredQuestions];
                newQuestions.splice(index, 1);
                newQuestions.push(question);
                setFilteredQuestions(newQuestions);
              }}
              topic={question.category}
              isAnonymous={question.anonymous}
              targetAudience={question.roleAccess?.join(', ') || 'Public'}
              createdAt={new Date(question.createdAt).toLocaleDateString()}
              showResponseField={true}
              setReloadQuestions={setReloadQuestions}
              offset={index * 8}>
              {question.description.slice(0, 300)}...
            </QuestionCard>
          ))}
          <div className="absolute top-[-5px] right-[-5px] w-[30px] h-[30px] bg-accent rounded-full z-150 flex items-center justify-center text-white text-sm">
            {filteredQuestions.length}
          </div>
        </div>
      )}

      {filteredQuestions.length === 0 && (
        <div className="text-gray-500 text-center !mt-20">No questions found matching your filters.</div>
      )}
      <div className="flex justify-center !mt-5"></div>
    </div>
  );
}
