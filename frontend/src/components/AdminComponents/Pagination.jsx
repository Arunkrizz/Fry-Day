import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent({setPage,page}) {
  return (
    <Pagination>
      <Pagination.First onClick={()=>{if(page!==1)setPage(1)}} />
      <Pagination.Prev onClick={()=>{if(page!==1)setPage(page-1)}}/>
      <Pagination.Item active>{page}</Pagination.Item>
      {/* <Pagination.Ellipsis /> */}

      {/* <Pagination.Item onClick={()=>setPage(page+5)}>{page+5}</Pagination.Item> */}
      {/* <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item> */}
      {/* <Pagination.Item disabled>{14}</Pagination.Item> */}

      {/* <Pagination.Ellipsis /> */}
      {/* <Pagination.Item onClick={()=>setPage(page+10)}>{page+10}</Pagination.Item> */}
      <Pagination.Next onClick={()=>{setPage(page+1)}} />
      {/* <Pagination.Last /> */}
    </Pagination>
  );
}

export default PaginationComponent;