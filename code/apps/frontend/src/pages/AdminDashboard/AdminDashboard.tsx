import '../../index.css';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { DashboardCard } from '../../Components/DashboardCard';
import { DashboardQuestion } from '../../Components/DashboardQuestion';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 !p-8 !w-full justify-center items-center">
      <div className="flex justify-between items-center w-[90%] max-w-6xl">
        <div className="flex-7">
          <h1 className="text-5xl !font-black">Dashboard</h1>
          <p>Monitor questions, analyze responses, and track consensus across your organization</p>
        </div>
        <div className="flex-3 flex justify-end">
          <Button type="default" size="large" onClick={() => navigate('/questions/create')}>
            <PlusOutlined />
            Add Question
          </Button>
        </div>
      </div>
      <div className="flex gap-4 w-[90%] max-w-6xl flex-wrap justify-center">
        <div className="flex gap-4 w-full lg:flex-wrap lg:flex-row flex-col justify-center">
          <DashboardCard
            title="Active Questions"
            value={12}
            percentage="+3 this week"
            icon={<QuestionCircleOutlined style={{ fontSize: '30px', color: 'var(--color-primary)' }} />}
          />
          <DashboardCard
            title="Active Questions"
            value={12}
            percentage="+3 this week"
            icon={<QuestionCircleOutlined style={{ fontSize: '30px', color: 'var(--color-primary)' }} />}
          />
          <DashboardCard
            title="Active Questions"
            value={12}
            percentage="+3 this week"
            icon={<QuestionCircleOutlined style={{ fontSize: '30px', color: 'var(--color-primary)' }} />}
          />
          <DashboardCard
            title="Active Questions"
            value={12}
            percentage="+3 this week"
            icon={<QuestionCircleOutlined style={{ fontSize: '30px', color: 'var(--color-primary)' }} />}
          />
        </div>
      </div>
      <div className="flex gap-4 w-[90%] max-w-6xl flex-wrap justify-center">
        <div className="flex flex-1 min-h-[150px] border border-gray-200 rounded-lg">
          <div className="flex-2 flex flex-col !p-5">
            <div className="flex justify-between items-center !mb-10">
              <h3 className="text-xl !font-bold">Questions</h3>
              <div className="flex !gap-1">
                <Button type={filter === 'all' ? 'default' : 'text'} onClick={() => setFilter('all')}>
                  All
                </Button>
                <Button type={filter === 'active' ? 'default' : 'text'} onClick={() => setFilter('active')}>
                  Active
                </Button>
                <Button type={filter === 'inactive' ? 'default' : 'text'} onClick={() => setFilter('inactive')}>
                  Inactive
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <DashboardQuestion
                title="What should we prioritize in Q1 2025?"
                topic="Strategy"
                isAnalyzed={true}
                responsesCount={142}
                totalResponses={200}
                closesAt="2025-01-01"
              />
              <DashboardQuestion
                title="What should we prioritize in Q1 2025?"
                topic="Strategy"
                isAnalyzed={true}
                responsesCount={142}
                totalResponses={200}
                closesAt="2025-01-01"
              />
              <DashboardQuestion
                title="What should we prioritize in Q1 2025?"
                topic="Strategy"
                isAnalyzed={true}
                responsesCount={142}
                totalResponses={200}
                closesAt="2025-01-01"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
