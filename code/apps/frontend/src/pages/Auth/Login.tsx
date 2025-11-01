import { Form, Input, Button, message, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../Components/AuthCard'
import { useAuth } from '../../context/AuthContext'

type LoginFormValues = {
  email: string
  password: string
  rememberMe?: boolean
}

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      await login(values.email, values.password, values.rememberMe || false)

      if (localStorage.getItem('accessToken')) {
        navigate('/')
      }
    } catch (error: any) {
      message.error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <AuthCard title="Login" subtitle="Welcome! Sign in to your account">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="font-semibold text-gray-700">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-blue-500" />}
              placeholder="your@email.com"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold text-gray-700">Password</span>}
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              {
                min: 6,
                message: 'Password must be at least 6 characters',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-blue-500" />}
              placeholder="Password"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="rememberMe"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>
              <span className="text-gray-700">Remember me for 30 days</span>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 font-semibold rounded-md"
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                Create one
              </Link>
            </p>
          </div>
        </Form>
      </AuthCard>
    </div>
  )
}
