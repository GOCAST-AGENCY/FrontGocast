import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Space,
  Image,
  Upload,
  Modal,
  Form,
  Input,
  message,
  Row,
  Col,
  Typography,
  Empty
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  FilePdfOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import apiConfig from '../config/api';

const { Title } = Typography;
const { TextArea } = Input;

const TalentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTalent();
  }, [id]);

  const fetchTalent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/talents/${id}`);
      setTalent(response.data);
    } catch (error) {
      message.error('Erreur lors du chargement du profil');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPhoto = async (file, expression) => {
    const formData = new FormData();
    formData.append('photo', file);
    if (expression) formData.append('expression', expression);

    try {
      await axios.post(`/api/talents/${id}/photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('Photo uploadée avec succès');
      fetchTalent();
    } catch (error) {
      message.error('Erreur lors de l\'upload de la photo');
    }
  };

  const handleUploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      await axios.post(`/api/talents/${id}/video`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('Vidéo uploadée avec succès');
      fetchTalent();
    } catch (error) {
      message.error('Erreur lors de l\'upload de la vidéo');
    }
  };

  const handleUploadCV = async (file) => {
    const formData = new FormData();
    formData.append('cv_pdf', file);

    try {
      await axios.post(`/api/talents/${id}/cv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('CV PDF uploadé avec succès');
      fetchTalent();
    } catch (error) {
      message.error('Erreur lors de l\'upload du CV');
    }
  };

  const handleDownloadCV = () => {
    if (talent.cv_pdf_gridfs_id) {
      // Télécharger depuis GridFS
      const link = document.createElement('a');
      link.href = `${apiConfig.apiURL}/files/talent/${talent.id}/cv`;
      link.download = `CV_${talent.nom}_${talent.prenom}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (talent.cv_pdf) {
      // Fallback pour les anciens fichiers locaux
      const link = document.createElement('a');
      link.href = `${apiConfig.uploadsURL}/${talent.cv_pdf}`;
      link.download = `CV_${talent.nom}_${talent.prenom}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await axios.delete(`/api/talents/photos/${photoId}`);
      message.success('Photo supprimée');
      fetchTalent();
    } catch (error) {
      message.error('Erreur lors de la suppression');
    }
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(`/api/talents/${id}`, {
        ...values,
        date_naissance: values.date_naissance ? values.date_naissance.format('YYYY-MM-DD') : talent.date_naissance
      });
      message.success('Profil mis à jour');
      setIsEditModalVisible(false);
      fetchTalent();
    } catch (error) {
      message.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!talent) {
    return <Empty description="Talent non trouvé" />;
  }

  const expressions = ['Joie', 'Tristesse', 'Colère', 'Surprise', 'Neutre'];

  return (
    <div>
      <Space style={{ marginBottom: '24px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/dashboard')}>
          Retour
        </Button>
        <Button type="primary" icon={<EditOutlined />} onClick={() => {
          form.setFieldsValue({
            ...talent,
            date_naissance: talent.date_naissance ? dayjs(talent.date_naissance) : null
          });
          setIsEditModalVisible(true);
        }}>
          Modifier
        </Button>
      </Space>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title="Informations Personnelles">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Nom">{talent.nom}</Descriptions.Item>
              <Descriptions.Item label="Prénom">{talent.prenom}</Descriptions.Item>
              <Descriptions.Item label="Email">{talent.email || '-'}</Descriptions.Item>
              <Descriptions.Item label="Téléphone">{talent.telephone || '-'}</Descriptions.Item>
              <Descriptions.Item label="Date de naissance">
                {talent.date_naissance ? dayjs(talent.date_naissance).format('DD/MM/YYYY') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Genre">{talent.genre || '-'}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Informations Artistiques" style={{ marginTop: '24px' }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Spécialité">
                <Tag color="blue">{talent.specialite}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Type d'acting">
                {talent.type_acting || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Tranche d'âge">
                <Tag>{talent.tranche_age}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Statut">
                <Tag color={talent.statut === 'Actif' ? 'green' : 'orange'}>
                  {talent.statut}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card 
            title="CV Artistique"
            extra={
              (talent.cv_pdf_gridfs_id || talent.cv_pdf) && (
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadCV}
                >
                  Télécharger le CV PDF
                </Button>
              )
            }
          >
            {(talent.cv_pdf_gridfs_id || talent.cv_pdf) ? (
              <div>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FilePdfOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
                    <span>CV PDF disponible</span>
                  </div>
                  <Upload
                    showUploadList={false}
                    accept=".pdf"
                    beforeUpload={(file) => {
                      // Vérifier que c'est un PDF
                      if (file.type !== 'application/pdf') {
                        message.error('Seuls les fichiers PDF sont acceptés');
                        return false;
                      }
                      handleUploadCV(file);
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Remplacer le CV PDF
                    </Button>
                  </Upload>
                </Space>
              </div>
            ) : (
              <div>
                <Upload
                  showUploadList={false}
                  accept=".pdf"
                  beforeUpload={(file) => {
                    // Vérifier que c'est un PDF
                    if (file.type !== 'application/pdf') {
                      message.error('Seuls les fichiers PDF sont acceptés');
                      return false;
                    }
                    handleUploadCV(file);
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />} size="large">
                    Uploader un CV PDF
                  </Button>
                </Upload>
              </div>
            )}
            {(talent.cv_texte && (
              <div style={{ marginTop: '24px' }}>
                <Title level={5}>CV Texte</Title>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                  {talent.cv_texte}
                </p>
              </div>
            ))}
          </Card>

          <Card title="Photos" style={{ marginTop: '24px' }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {expressions.map(expr => (
                <div key={expr}>
                  <Title level={5}>{expr}</Title>
                  <Row gutter={[16, 16]}>
                    {talent.photos?.filter(p => p.expression === expr).map(photo => (
                      <Col key={photo.id} span={6}>
                        <div style={{ position: 'relative' }}>
                          <Image
                            src={photo.gridfs_id ? `${apiConfig.apiURL}/files/photo/${photo.id}` : `${apiConfig.uploadsURL}/${photo.chemin}`}
                            alt={expr}
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                          />
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            style={{ position: 'absolute', top: 0, right: 0 }}
                            onClick={() => handleDeletePhoto(photo.id)}
                          />
                        </div>
                      </Col>
                    ))}
                    <Col span={6}>
                      <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleUploadPhoto(file, expr);
                          return false;
                        }}
                      >
                        <Button icon={<UploadOutlined />} block>
                          Ajouter
                        </Button>
                      </Upload>
                    </Col>
                  </Row>
                </div>
              ))}
            </Space>
          </Card>

          <Card title="Vidéo de Présentation" style={{ marginTop: '24px' }}>
            {(talent.video_presentation_gridfs_id || talent.video_presentation) ? (
              <div>
                <video
                  controls
                  style={{ width: '100%', maxHeight: '400px' }}
                  src={talent.video_presentation_gridfs_id ? `${apiConfig.apiURL}/files/talent/${talent.id}/video` : `${apiConfig.uploadsURL}/${talent.video_presentation}`}
                />
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  style={{ marginTop: '16px' }}
                  onClick={async () => {
                    try {
                      await axios.put(`/api/talents/${id}`, { video_presentation: null });
                      message.success('Vidéo supprimée');
                      fetchTalent();
                    } catch (error) {
                      message.error('Erreur');
                    }
                  }}
                >
                  Supprimer la vidéo
                </Button>
              </div>
            ) : (
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  handleUploadVideo(file);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />} size="large">
                  Uploader une vidéo
                </Button>
              </Upload>
            )}
          </Card>

          {(talent.note_interne || talent.commentaire) && (
            <Card title="Notes Internes" style={{ marginTop: '24px' }}>
              {talent.note_interne && (
                <p><strong>Note:</strong> {talent.note_interne}</p>
              )}
              {talent.commentaire && (
                <p><strong>Commentaire:</strong> {talent.commentaire}</p>
              )}
            </Card>
          )}
        </Col>
      </Row>

      <Modal
        title="Modifier le Profil"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="prenom" label="Prénom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="telephone" label="Téléphone">
            <Input />
          </Form.Item>
          <Form.Item name="cv_texte" label="CV Artistique">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="note_interne" label="Note interne">
            <Input />
          </Form.Item>
          <Form.Item name="commentaire" label="Commentaire">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Enregistrer</Button>
              <Button onClick={() => setIsEditModalVisible(false)}>Annuler</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TalentProfile;

