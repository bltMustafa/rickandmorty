import React, { useEffect, useState } from 'react';
import { Modal, Card, Row, Col, Spin, Alert, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import Pagination from "./Pagination";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterListModalProps {
  visible: boolean;
  characterUrls: string[];
  onClose: () => void;
}

const CharacterListModal: React.FC<CharacterListModalProps> = ({ visible, characterUrls, onClose }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [favoriteCharacters, setFavoriteCharacters] = useState<number[]>([]);
  const pageSize = 7

  const fetchCharacters = async (urls: string[], page: number) => {
    try {
      setLoading(true);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const characterPromises = urls.slice(startIndex, endIndex).map((url) => axios.get(url));
      const characterResponses = await Promise.all(characterPromises);
      const charactersData = characterResponses.map((response) => response.data);
      setCharacters(charactersData);
      setTotalItems(urls.length);
    } catch (error) {
      console.error('Error fetching characters', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchCharacters(characterUrls, currentPage);
    }
  }, [visible, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFavorite = (id: number) => {
    setFavoriteCharacters((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error fetching characters. Please try again later." type="error" />;

  return (
    <Modal visible={visible} title="Characters" onCancel={onClose} footer={null}>
      <Row gutter={[16, 16]} justify="center">
        {characters.map((character) => (
          <Col key={character.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={character.name} src={character.image} />}
              actions={[
                <Button
                  type="text"
                  icon={favoriteCharacters.includes(character.id) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                  onClick={() => toggleFavorite(character.id)}
                />,
              ]}
            >
              <Card.Meta title={character.name} />
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
    </Modal>
  );
};

export default CharacterListModal;
