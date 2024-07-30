import Link from 'next/link';
import BeatPage from '../test/[id]/page';
const DynamicLink = ({ id }) => {
  return (
    <Link href={`/product/${id}`}>
    </Link>
  );
};

export default DynamicLink;
