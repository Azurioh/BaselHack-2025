import { Form, Input, Button, message, Checkbox } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import AuthCard from '../../components/AuthCard'

type RegisterFormValues = {
  username: string
  email: string
  password: string
  passwordConfirm: string
  terms: boolean
}

export default function Register() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values: RegisterFormValues) => {
    console.log('Register attempt:', values)
    message.success('Registration successful! You can now sign in.')
    navigate('/login')
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <AuthCard title="Create Account" subtitle="Join us in a few simple steps">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="font-semibold text-gray-700">Username</span>}
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter a username',
              },
              {
                min: 3,
                message: 'Username must be at least 3 characters',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-blue-500" />}
              placeholder="Username"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

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
              { required: true, message: 'Please enter a password' },
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
            label={<span className="font-semibold text-gray-700">Confirm Password</span>}
            name="passwordConfirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Passwords do not match')
                  )
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-blue-500" />}
              placeholder="Confirm password"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error('You must accept the terms and conditions')
                      ),
              },
            ]}
          >
            <Checkbox>
              <span className="text-gray-700">
                I agree to the{' '}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Terms of Service
                </a>
              </span>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="bg-blue-600 hover:bg-blue-700 font-semibold rounded-md"
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                Sign In
              </Link>
            </p>
          </div>
        </Form>
      </AuthCard>
    </div>
  )
}
