import React, { useEffect, useState } from 'react';
import { getCharacters } from '../utils/api';
import { Card, Row, Col, Spin, Alert } from 'antd';

interface Character {
  id: number;
  name: string;
  image: string;
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchCharacters = async () => {
    try {
      const data = await getCharacters();
      setCharacters(data.results);
    } catch (error) {
      console.error('Error fetching characters', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) return <Spin tip="Loading..."></Spin>;
  if (error) return <Alert message="Error fetching characters. Please try again later." type="error" />;

  return (
    <Row gutter={[16, 16]} justify="center">
      {characters.map((character) => (
        <Col key={character.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            cover={<img alt={character.name} src={character.image} />}
          >
            <Card.Meta title={character.name} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CharacterList;
