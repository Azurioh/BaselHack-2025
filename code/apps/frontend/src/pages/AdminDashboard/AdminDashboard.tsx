import '../../index.css';
import { getAllQuestions } from '../../api/questions';
import { useEffect, useState } from 'react';
import type { Question } from '@baselhack/shared/types/questions.types';
import { Input, Select, Space, Table, Tag, Button } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [anonymousFilter, setAnonymousFilter] = useState<string>('all');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getAllQuestions();
        console.log('API Response:', response);
        const allQuestions = [
          ...(response.data.questionsToBeAnswered || []),
          ...(response.data.answeredQuestions || [])
        ];
        console.log('All questions:', allQuestions);
        setQuestions(allQuestions);
        setFilteredQuestions(allQuestions);
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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'anonymous',
      key: 'anonymous',
      width: '10%',
      render: (anonymous: boolean) => (
        <Tag color={anonymous ? 'orange' : 'green'}>
          {anonymous ? 'Anonymous' : 'Public'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '12%',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '8%',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/questions/${record._id}`)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              console.log('Delete', record._id);
            }}
          />
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-lg">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen !p-8 flex flex-col items-center gap-8">
      <Button
        onClick={() => navigate('/questions/create')}
        className='!bg-primary !text-white !self-end'
      >
        Create question +
      </Button>
      <div className="my-12 w-full flex justify-center ">
        <div className="bg-white/90 !p-6 rounded-xl shadow-md max-w-7xl w-full">
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
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

          <Table
            dataSource={filteredQuestions.map((q: any) => ({ ...q, key: q._id }))}
            columns={columns}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} questions`,
            }}
            className="!mt-4"
            locale={{
              emptyText: 'No questions found matching your filters.',
            }}
          />
        </div>
      </div>
    </div>
  );
}
