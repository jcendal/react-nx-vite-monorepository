import { createRouter } from '@tanstack/react-router';

import { routeTree } from './route-tree.gen';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
