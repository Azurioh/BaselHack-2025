import { Form, Input, Button, Card, message } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'

type LoginFormValues = {
  email: string
  password: string
}

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values: LoginFormValues) => {
    console.log('Login attempt:', values)
    // TODO: Implement authentication logic
    message.success('Login successful!')
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card className="shadow-lg rounded-lg border-0">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
            <p className="text-gray-600">
              Welcome! Sign in to your account
            </p>
          </div>

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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
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
        </Card>
      </div>
    </div>
  )
}
