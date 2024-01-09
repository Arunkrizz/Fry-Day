import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent({setPage,page}) {
  return (
    <Pagination>
      <Pagination.First onClick={()=>{if(page!==1)setPage(1)}} />
      <Pagination.Prev onClick={()=>{if(page!==1)setPage(page-1)}}/>
      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Next onClick={()=>{setPage(page+1)}} />
    </Pagination>
  );
}

export default PaginationComponent;