import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Card,
  Tag,
  Modal,
  Form,
  DatePicker,
  Upload,
  message,
  Popconfirm,
  Row,
  Col
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const Dashboard = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTalent, setEditingTalent] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    search: '',
    specialite: '',
    genre: '',
    tranche_age: '',
    type_acting: '',
    statut: ''
  });

  useEffect(() => {
    fetchTalents();
  }, [filters]);

  const fetchTalents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
      
      const response = await axios.get(`/api/talents?${params.toString()}`);
      // S'assurer que response.data est un tableau
      const data = Array.isArray(response.data) ? response.data : [];
      setTalents(data);
    } catch (error) {
      console.error('Erreur lors du chargement des talents:', error);
      message.error('Erreur lors du chargement des talents');
      setTalents([]); // S'assurer que talents reste un tableau même en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingTalent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingTalent(record);
    form.setFieldsValue({
      ...record,
      date_naissance: record.date_naissance ? dayjs(record.date_naissance) : null
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/talents/${id}`);
      message.success('Talent supprimé avec succès');
      fetchTalents();
    } catch (error) {
      message.error('Erreur lors de la suppression');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        ...values,
        date_naissance: values.date_naissance ? values.date_naissance.format('YYYY-MM-DD') : null
      };

      if (editingTalent) {
        const talentId = editingTalent.id || editingTalent._id;
        await axios.put(`/api/talents/${talentId}`, data);
        message.success('Talent mis à jour avec succès');
      } else {
        await axios.post('/api/talents', data);
        message.success('Talent créé avec succès');
      }

      setIsModalVisible(false);
      form.resetFields();
      fetchTalents();
    } catch (error) {
      message.error('Erreur lors de l\'enregistrement');
    }
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a.nom.localeCompare(b.nom),
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
    },
    {
      title: 'Spécialité',
      dataIndex: 'specialite',
      key: 'specialite',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Tranche d\'âge',
      dataIndex: 'tranche_age',
      key: 'tranche_age',
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (text) => (
        <Tag color={text === 'Actif' ? 'green' : 'orange'}>{text}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        const talentId = record.id || record._id;
        return (
          <Space>
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/talent/${talentId}`)}
            >
              Voir
            </Button>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Modifier
            </Button>
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer ce talent ?"
              onConfirm={() => handleDelete(talentId)}
              okText="Oui"
              cancelText="Non"
            >
              <Button danger icon={<DeleteOutlined />}>
                Supprimer
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Card
        title="Gestion des Talents"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Ajouter un Talent
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Rechercher..."
                prefix={<SearchOutlined />}
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Spécialité"
                style={{ width: '100%' }}
                allowClear
                value={filters.specialite || undefined}
                onChange={(value) => setFilters({ ...filters, specialite: value || '' })}
              >
                <Option value="Acteur">Acteur</Option>
                <Option value="Mannequin">Mannequin</Option>
                <Option value="Voix off">Voix off</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Genre"
                style={{ width: '100%' }}
                allowClear
                value={filters.genre || undefined}
                onChange={(value) => setFilters({ ...filters, genre: value || '' })}
              >
                <Option value="Homme">Homme</Option>
                <Option value="Femme">Femme</Option>
                <Option value="Autre">Autre</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Tranche d'âge"
                style={{ width: '100%' }}
                allowClear
                value={filters.tranche_age || undefined}
                onChange={(value) => setFilters({ ...filters, tranche_age: value || '' })}
              >
                <Option value="Enfant">Enfant</Option>
                <Option value="Ado">Ado</Option>
                <Option value="Adulte">Adulte</Option>
                <Option value="Senior">Senior</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={3}>
              <Select
                placeholder="Statut"
                style={{ width: '100%' }}
                allowClear
                value={filters.statut || undefined}
                onChange={(value) => setFilters({ ...filters, statut: value || '' })}
              >
                <Option value="Actif">Actif</Option>
                <Option value="En pause">En pause</Option>
              </Select>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={Array.isArray(talents) ? talents : []}
            rowKey={(record) => record.id || record._id || Math.random()}
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Space>
      </Card>

      <Modal
        title={editingTalent ? 'Modifier le Talent' : 'Ajouter un Talent'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom"
                rules={[{ required: true, message: 'Champ requis' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prenom"
                label="Prénom"
                rules={[{ required: true, message: 'Champ requis' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
              >
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="telephone"
                label="Téléphone"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date_naissance"
                label="Date de naissance"
                rules={[{ required: true, message: 'Champ requis' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="genre"
                label="Genre"
              >
                <Select>
                  <Option value="Homme">Homme</Option>
                  <Option value="Femme">Femme</Option>
                  <Option value="Autre">Autre</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="specialite"
                label="Spécialité"
                rules={[{ required: true, message: 'Champ requis' }]}
              >
                <Select>
                  <Option value="Acteur">Acteur</Option>
                  <Option value="Mannequin">Mannequin</Option>
                  <Option value="Voix off">Voix off</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type_acting"
                label="Type d'acting"
              >
                <Select placeholder="Sélectionner">
                  <Option value="Comédie">Comédie</Option>
                  <Option value="Drame">Drame</Option>
                  <Option value="Burlesque">Burlesque</Option>
                  <Option value="Action">Action</Option>
                  <Option value="Romance">Romance</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="statut"
                label="Statut"
              >
                <Select defaultValue="Actif">
                  <Option value="Actif">Actif</Option>
                  <Option value="En pause">En pause</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="cv_texte"
            label="CV Artistique"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="note_interne"
            label="Note interne"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="commentaire"
            label="Commentaire"
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingTalent ? 'Mettre à jour' : 'Créer'}
              </Button>
              <Button onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}>
                Annuler
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;

