import React from 'react';
import { useParams, Link } from 'ice';

export default function DetailId() {
  const params = useParams();

  return (
    <div>
      <div>Detail Id: {params.id}</div>
      <Link to="/detail">Back to Detail</Link>
    </div>
  );
}
