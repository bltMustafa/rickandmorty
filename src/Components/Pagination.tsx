import React from 'react';
import { Pagination as AntPagination } from 'antd';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalItems, pageSize, onPageChange}) => {
return (
  <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
    <AntPagination current={currentPage}
                   total={totalItems}
                   pageSize={pageSize}
                   onChange={onPageChange}
                   showSizeChanger={false}
    />
  </div>
  );
};

export default Pagination;