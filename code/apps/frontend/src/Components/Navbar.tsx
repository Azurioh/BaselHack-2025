import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

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
    { name: userInformation?.role === 'admin' ? 'Dashboard' : 'History', path: userInformation?.role === 'admin' ? '/admin' : '/history' },
  ];

  return (
    <nav style={{ backgroundColor: '#ffffff' }} className="border-b border-gray-200 px-6 h-16 flex items-center justify-between">
      <button
        onClick={() => navigate('/')}
        className="text-xl font-bold text-black !pl-8 hover:text-gray-800 transition-colors"
      >
        BaselHack
      </button>

      <div className="flex gap-8 absolute left-1/2 transform -translate-x-1/2">
        {navbarItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="text-black font-medium text-lg hover:text-gray-800 hover:bg-gray-200 p-6 rounded-lg transition-all duration-200 scale-100 hover:scale-110"
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
          <button className="flex items-center gap-2 text-black hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
            <UserOutlined className="text-lg" />
            <span className="font-medium">{userInformation?.name}</span>
          </button>
        </Dropdown>
      </div>
    </nav>
  );
};
