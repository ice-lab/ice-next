import { Link, useParams } from 'ice';

export default function Blog() {
  const { slug } = useParams();

  return (
    <>
      <h3>Slug: {slug}</h3>
      <Link to="/">home</Link>
    </>
  );
}