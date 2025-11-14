import { Layout, Button, Space } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Space>
          <div 
            style={{ cursor: 'pointer', marginRight: '24px' }}
            onClick={() => navigate('/dashboard')}
          >
            <Logo />
          </div>
          <Button
            type={location.pathname === '/dashboard' ? 'primary' : 'text'}
            icon={<DashboardOutlined />}
            onClick={() => navigate('/dashboard')}
          >
            Tableau de bord
          </Button>
        </Space>
        <Button
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Déconnexion
        </Button>
      </Header>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center', background: '#fff' }}>
        GoCast Agency - Gestion de Talents
      </Footer>
    </Layout>
  );
};

export default AppLayout;

