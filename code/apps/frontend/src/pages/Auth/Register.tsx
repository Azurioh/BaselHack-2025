import { Form, Input, Button, message, Checkbox, Progress } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import AuthCard from '../../components/AuthCard'
import { useAuth } from '../../context/AuthContext'

type RegisterFormValues = {
  name: string
  email: string
  password: string
  passwordConfirm: string
  terms: boolean
}

const PASSWORD_REQUIREMENTS = {
  minLength: /^.{8,}$/,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
}

const validatePassword = (password: string) => {
  return {
    minLength: PASSWORD_REQUIREMENTS.minLength.test(password),
    hasUpperCase: PASSWORD_REQUIREMENTS.hasUpperCase.test(password),
    hasLowerCase: PASSWORD_REQUIREMENTS.hasLowerCase.test(password),
    hasNumber: PASSWORD_REQUIREMENTS.hasNumber.test(password),
    hasSpecialChar: PASSWORD_REQUIREMENTS.hasSpecialChar.test(password),
  }
}

const getPasswordStrength = (password: string) => {
  if (!password) return 0
  const requirements = validatePassword(password)
  const fulfilledRequirements = Object.values(requirements).filter(Boolean).length
  return (fulfilledRequirements / 5) * 100
}

export default function Register() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const { register } = useAuth()

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true)
    try {
      await register(values.email, values.password, values.name)
      message.success('Registration successful! You can now sign in.')
      navigate('/login')
    } catch (error: any) {
      message.error(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
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
            label={<span className="font-semibold text-gray-700">Full Name</span>}
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter your full name',
              },
              {
                min: 2,
                message: 'Name must be at least 2 characters',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-blue-500" />}
              placeholder="Your full name"
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
                validator: (_, value) => {
                  if (!value) return Promise.resolve()
                  const requirements = validatePassword(value)
                  const allMet = Object.values(requirements).every(Boolean)
                  if (allMet) return Promise.resolve()
                  return Promise.reject(new Error('Password does not meet requirements'))
                },
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-blue-500" />}
              placeholder="Password"
              size="large"
              className="rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          {password && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>Password strength:</span>
              </div>
              <Progress percent={getPasswordStrength(password)} strokeColor={getPasswordStrength(password) < 60 ? '#faad14' : getPasswordStrength(password) < 100 ? '#1890ff' : '#52c41a'} />
              <div style={{ marginTop: '12px', fontSize: '12px' }}>
                <div style={{ color: validatePassword(password).minLength ? '#52c41a' : '#d9d9d9' }}>
                  ✓ At least 8 characters
                </div>
                <div style={{ color: validatePassword(password).hasUpperCase ? '#52c41a' : '#d9d9d9' }}>
                  ✓ Contains uppercase letter
                </div>
                <div style={{ color: validatePassword(password).hasLowerCase ? '#52c41a' : '#d9d9d9' }}>
                  ✓ Contains lowercase letter
                </div>
                <div style={{ color: validatePassword(password).hasNumber ? '#52c41a' : '#d9d9d9' }}>
                  ✓ Contains number
                </div>
                <div style={{ color: validatePassword(password).hasSpecialChar ? '#52c41a' : '#d9d9d9' }}>
                  ✓ Contains special character (!@#$%^&* etc)
                </div>
              </div>
            </div>
          )}

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
              loading={loading}
              disabled={loading}
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
