import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEpisodesBySeason, getEpisodeById } from '../utils/api';
import { Card, Row, Col, Spin, Alert, Typography, Layout } from 'antd';
import rickandmorty from '../assets/rickandmorty.jpg';
import Pagination from "./Pagination";
import CharacterListModal from './CharacterList';

const { Meta } = Card;
const { Text } = Typography;
const { Content } = Layout;

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
  image?: string;
}

interface Params {
  seasonNumber: string;
}

const SeasonDetail: React.FC = () => {
  const { seasonNumber } = useParams<Params>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const pageSize = 4;

  const fetchEpisodes = async (page: number) => {
    try {
      const data = await getEpisodesBySeason(seasonNumber);
      setEpisodes(data.slice((page - 1) * pageSize, page * pageSize));
      setTotalItems(data.length);
    } catch (err) {
      console.error('Error fetching episodes', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodeDetails = async (id: number) => {
    try {
      const episode = await getEpisodeById(id);
      setSelectedEpisode(episode);
      setModalVisible(true);
    } catch (err) {
      console.error('Error fetching episode details', err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [seasonNumber, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <Spin tip="Loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
  if (error) return <Alert message="Error fetching episodes. Please try again later." type="error" style={{ margin: '20px' }} />;

  return (
    <Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: "white" }}>Episodes</h1>
      <Row gutter={[16, 16]} justify="center">
        {episodes.map((episode) => (
          <Col key={episode.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={episode.name} src={episode.image || rickandmorty} />}
              onClick={() => fetchEpisodeDetails(episode.id)}
              style={{ borderRadius: '8px', overflow: 'hidden' }}
            >
              <Meta title={episode.name} description={`Air Date: ${episode.air_date}`} />
              <Text type="secondary">{episode.episode}</Text>
              <Text style={{ display: 'block', marginTop: '10px' }}>Characters: {episode.characters.length}</Text>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
      {selectedEpisode && (
        <CharacterListModal
          visible={modalVisible}
          characterUrls={selectedEpisode.characters}
          onClose={() => setModalVisible(false)}
        />
      )}
    </Content>
  );
};

export default SeasonDetail;
