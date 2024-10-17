import { RouterProvider } from '@tanstack/react-router';

import router from '../router/router';

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
