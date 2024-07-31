import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEpisodesBySeason } from '../utils/api'; // Güncellenmiş işlev
import { Card, Row, Col, Spin, Alert, Typography } from 'antd';
import rickandmorty from '../assets/rickandmorty.jpg';

const { Meta } = Card;
const { Text } = Typography;

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchEpisodes = async () => {
    try {
      // Sezon numarasına göre bölümleri getEpisodesBySeason işlevinden çekiyoruz
      const data = await getEpisodesBySeason(seasonNumber);
      setEpisodes(data);
    } catch (err) {
      console.error('Error fetching episodes', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [seasonNumber]);

  if (loading) return <Spin tip="Loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
  if (error) return <Alert message="Error fetching episodes. Please try again later." type="error" style={{ margin: '20px' }} />;

  return (
    <Row gutter={[16, 16]} justify="center">
      {episodes.map((episode) => (
        <Col key={episode.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            cover={<img alt={episode.name} src={episode.image || rickandmorty} />} // Use episode.image if available, else fallback to rickandmorty
          >
            <Meta title={episode.name} description={`Air Date: ${episode.air_date}`} />
            <Text type="secondary">{episode.episode}</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SeasonDetail;
