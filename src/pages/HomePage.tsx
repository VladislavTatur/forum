import { Posts } from '@features/posts/components/Posts.tsx';

import { Card } from '../shared/components/Card.tsx';

export const HomePage = () => {
  return (
    <Card>
      <Posts />
    </Card>
  );
};
