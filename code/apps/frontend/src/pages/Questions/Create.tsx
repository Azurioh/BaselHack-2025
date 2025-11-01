import { Form, Input, Button, message, Select, Divider, Switch, DatePicker } from 'antd'
import { QuestionCircleOutlined, TagOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthCard from '../../Components/AuthCard'
import { createQuestion } from '../../api/questions'
import axios from 'axios'
import dayjs from 'dayjs'

type QuestionFormValues = {
  title: string
  description?: string
  category?: string
  anonymousAnswers?: boolean
  endDate?: string
  answers?: []
}

export default function CreateQuestion() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories/v1/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        const categoriesData = Array.isArray(response.data)
          ? response.data
          : response.data.data || []
        setCategories(categoriesData)
      } catch (error) {
        message.error('Failed to load categories')
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  const onFinish = async (values: QuestionFormValues) => {
    setLoading(true)
    try {
      const questionData: any = {
        title: values.title,
        description: values.description || '',
        category: values.category,
        anonymous: values.anonymousAnswers || false,
        answers: [],
      }

      if (values.endDate) {
        questionData.deadline = dayjs(values.endDate).toISOString()
      }

      await createQuestion(questionData)
      message.success('Question created successfully!')
      navigate('/questions')
    } catch (error: any) {
      message.error(error.message || 'Failed to create question')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <AuthCard title="Create a Question" subtitle="Ask your question to the community">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="font-weight-semibold color-text">Question Title</span>}
            name="title"
            rules={[
              { required: true, message: 'Please enter a title' },
              {
                min: 10,
                message: 'Title must be at least 10 characters',
              },
            ]}
          >
            <Input
              prefix={<QuestionCircleOutlined className="color-text font-weight-light" />}
              placeholder="What is your question?"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-weight-light color-text">Question Description</span>}
            name="description"
          >
            <Input.TextArea
              placeholder="Describe your question in detail..."
              rows={3}
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-weight-light color-text">Category</span>}
            name="category"
            rules={[
              { required: true, message: 'Please select a category' },
            ]}
          >
            <Select
              placeholder="Select a category"
              size="large"
              className="rounded-md"
              suffixIcon={<TagOutlined className="color-text" />}
            >
              {categories.map((category, index) => (
                <Select.Option key={category.id || `category-${index}`} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Divider className="my-6" />

          <h3 className="text-lg font-weight-light color-text mb-4">Settings</h3>

          <Form.Item
            label={<span className="font-weight-light color-text">Anonymous Answers</span>}
            name="anonymousAnswers"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label={<span className="font-weight-light color-text">End Date & Time</span>}
            name="endDate"
          >
            <DatePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              placeholder="Select end date and time"
              size="large"
              className="w-full rounded-md"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              disabled={loading}
              className="color-secondary hover:color-accent font-weight-light rounded-md"
            >
              Create Question
            </Button>
          </Form.Item>
        </Form>
      </AuthCard>
    </div>
  )
}
