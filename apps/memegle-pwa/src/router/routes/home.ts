import { createFileRoute } from '@tanstack/react-router';

import { Home } from '../../app/Home';

export const Route = createFileRoute('/home')({
  component: Home,
});
