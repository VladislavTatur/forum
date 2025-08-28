import { useState, useMemo } from 'react';

import { paginate } from '@shared/utils/pagination.ts';

export const usePagination = <T>(items: T[], limit: number) => {
  const [page, setPage] = useState(1);
  const paginated = useMemo(() => paginate(items, page, limit), [items, page, limit]);
  const count = Math.ceil(items.length / limit);

  return { page, setPage, paginated, count };
};
