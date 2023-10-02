import Link from 'next/link';
import { Button, Spinner } from 'ui';

export const metadata = {
  title: 'Store | Kitchen Sink',
};

export default function Store() {
  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <Link href={'/dev'}>DEV page</Link>
      <Button>Test Button</Button>
      <Spinner />
    </div>
  );
}
