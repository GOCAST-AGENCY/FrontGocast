import { Card, Form, Input, Button, message, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    const result = await login(values.username, values.password);
    if (result.success) {
      message.success('Connexion réussie !');
      navigate('/dashboard');
    } else {
      message.error(result.error || 'Erreur de connexion');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
        <Card
          style={{ width: '100%', maxWidth: '400px' }}
          title={
            <div style={{ textAlign: 'center' }}>
              <Logo />
              <div style={{ marginTop: '16px', fontSize: '18px' }}>Connexion Administrateur</div>
            </div>
          }
        >
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nom d'utilisateur"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Veuillez entrer votre mot de passe' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mot de passe"
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" htmlType="submit">
                  Se connecter
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;

