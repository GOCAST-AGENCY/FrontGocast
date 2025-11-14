import { Card, Row, Col, Button, Typography, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({ total: 0, actifs: 0, specialites: {} });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/talents');
      const talents = response.data;
      const actifs = talents.filter(t => t.statut === 'Actif').length;
      const specialites = {};
      talents.forEach(t => {
        specialites[t.specialite] = (specialites[t.specialite] || 0) + 1;
      });
      setStats({
        total: talents.length,
        actifs,
        specialites
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>Bienvenue sur GoCast Agency</Title>
        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
          Plateforme de gestion de talents pour le casting : acteurs, mannequins et voix off
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Talents"
              value={stats.total}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Talents Actifs"
              value={stats.actifs}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Spécialités"
              value={Object.keys(stats.specialites).length}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Title level={2}>Accès à la base de talents</Title>
        <Paragraph>
          Connectez-vous pour accéder au tableau de bord et gérer les profils de talents.
          Vous pourrez ajouter, modifier, rechercher et organiser les candidats selon leurs
          spécialités, types d'acting et autres critères.
        </Paragraph>
        <div style={{ marginTop: '24px' }}>
          {isAuthenticated ? (
            <Button type="primary" size="large" onClick={() => navigate('/dashboard')}>
              Accéder au Tableau de bord
            </Button>
          ) : (
            <Button type="primary" size="large" onClick={() => navigate('/login')}>
              Se connecter
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Home;

