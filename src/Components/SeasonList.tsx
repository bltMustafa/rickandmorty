import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEpisodesBySeason } from '../utils/api';
import { Spin, Alert, Card, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import rickandmorty2 from '../assets/rickandmorty2.jpg'; // Resim yolu kontrol edin

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

const SeasonList: React.FC = () => {
  const [seasons, setSeasons] = useState<{ [key: string]: Episode[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchEpisodesBySeason = async (season: string) => {
    try {
      const data = await getEpisodesBySeason(season);
      return data;
    } catch (err) {
      console.error(`Error fetching episodes for season ${season}`, err);
      return [];
    }
  };


  const fetchAllSeasons = async () => {
    const seasonNumbers = ['S01', 'S02', 'S03', 'S04', 'S05'];
    const seasonsData: { [key: string]: Episode[] } = {};

    try {
      for (const season of seasonNumbers) {
        const episodes = await fetchEpisodesBySeason(season);
        if (episodes.length > 0) {
          seasonsData[season] = episodes;
        }
      }
      setSeasons(seasonsData);
    } catch (err) {
      console.error('Error fetching seasons', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSeasons();
  }, []);

  if (loading) {
    return (
      <Spin tip="Loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
    );
  }

  if (error) {
    return (
      <Alert message="Error fetching episodes. Please try again later." type="error" style={{ margin: '20px' }} />
    );
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Seasons</h1>
      <Row gutter={[24, 24]}>
        {Object.keys(seasons).map(season => (
          <Col key={season} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={`Season ${season}`}
              bordered={false}
              hoverable
              actions={[<Link to={`/season/${season}`}><ArrowRightOutlined key="view" /> View Episodes</Link>]}
              cover={<img alt={`Season ${season}`} src={rickandmorty2} />}
            >
              <Card.Meta description={`Season ${season} has ${seasons[season].length} episodes`} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SeasonList;
