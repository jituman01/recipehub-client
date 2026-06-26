'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination, Table } from '@heroui/react';

export default function PaginationControls({ totalPages, currentPage, totalData }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page);
    router.push(`/recipes?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Table.Footer>
      <Pagination size="md">
        <Pagination.Summary className='text-black dark:text-white'>
          Page {currentPage} of {totalPages} ({totalData} total results)
        </Pagination.Summary>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous 
              isDisabled={currentPage === 1} 
              onPress={() => handlePageChange(currentPage - 1)}
            >
              <Pagination.PreviousIcon /> Prev
            </Pagination.Previous>
          </Pagination.Item>
          
          {pages.map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link 
                isActive={p === currentPage} 
                onPress={() => handlePageChange(p)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          <Pagination.Item>
            <Pagination.Next 
              isDisabled={currentPage === totalPages} 
              onPress={() => handlePageChange(currentPage + 1)}
            >
              Next <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </Table.Footer>
  );
}