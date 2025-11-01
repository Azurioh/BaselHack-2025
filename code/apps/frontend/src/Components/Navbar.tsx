import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

const navbarTextStyle = (path: string) => `text-black font-medium text-lg hover:text-gray-800 px-6 py-3 rounded-lg transition-all duration-200 scale-100 hover:scale-110 ${location.pathname === path ? 'underline underline-offset-8' : ''} font-semibold`

export const Navbar = () => {
  const navigate = useNavigate();
  const { userInformation, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Déconnexion',
      onClick: handleLogout,
    },
  ];

  const navbarItems: { name: string; path: string }[] = [
    { name: 'Questions', path: '/' },
    { name: 'History', path: '/history' },
    { name: 'Dashboard', path: '/admin' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between">
      <button
        onClick={() => navigate('/')}
        className="text-xl font-bold text-text !pl-8 hover:text-primary transition-colors"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        BaselHack
      </button>

      <div className="flex gap-8 absolute left-1/2 transform -translate-x-1/2">
        {navbarItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={navbarTextStyle(item.path)}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 !pr-8">
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <button className="flex items-center gap-2 text-text hover:bg-background px-3 py-2 rounded-lg transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
            <UserOutlined className="text-lg" />
            <span>{userInformation?.name}</span>
          </button>
        </Dropdown>
      </div>
    </nav>
  );
};
