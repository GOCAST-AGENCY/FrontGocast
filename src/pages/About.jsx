import { Card, Typography, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Card>
        <Title level={1}>À propos de GoCast Agency</Title>
        
        <Title level={2}>Notre Mission</Title>
        <Paragraph>
          GoCast Agency est une plateforme de gestion de talents conçue pour faciliter
          le processus de casting dans le domaine du cinéma, de la mode et de la voix off.
          Notre objectif est de centraliser et d'organiser efficacement les profils de
          candidats pour permettre une sélection optimale lors des castings.
        </Paragraph>

        <Title level={2}>Fonctionnalités</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card size="small" title="Gestion Complète">
              <Paragraph>
                Ajout, modification et suppression de profils de talents avec toutes
                les informations nécessaires : données personnelles, CV artistique,
                photos et vidéos.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card size="small" title="Recherche Avancée">
              <Paragraph>
                Recherche et filtrage par spécialité, genre, tranche d'âge, type d'acting
                et statut pour trouver rapidement le talent idéal.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card size="small" title="Médias Riche">
              <Paragraph>
                Gestion des photos par expression (joie, tristesse, colère, surprise)
                et des vidéos de présentation pour une évaluation complète.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card size="small" title="Sécurité">
              <Paragraph>
                Système d'authentification sécurisé pour protéger les données sensibles
                des talents et garantir la confidentialité.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Title level={2}>Spécialités</Title>
        <Paragraph>
          GoCast Agency gère trois types de talents principaux :
        </Paragraph>
        <ul>
          <li><strong>Acteurs</strong> - Pour le cinéma, la télévision et le théâtre</li>
          <li><strong>Mannequins</strong> - Pour la mode, la publicité et le mannequinat</li>
          <li><strong>Voix off</strong> - Pour le doublage, la narration et la publicité audio</li>
        </ul>

        <Title level={2}>Contact</Title>
        <Paragraph>
          Pour toute question ou information complémentaire, veuillez contacter
          l'administrateur du système.
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;

