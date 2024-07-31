import React, { useEffect, useState } from 'react';
import { getEpisode } from '../utils/api';
import { Card, Row, Col, Spin, Alert, Typography } from 'antd';
import rickandmorty from '../assets/rickandmorty.jpg'; // Correct import

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

const EpisodeList: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchEpisodes = async () => {
    try {
      const data = await getEpisode();
      setEpisodes(data.results);
    } catch (err) {
      console.error('Error fetching episodes', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error fetching episodes. Please try again later." type="error" />;

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

export default EpisodeList;
