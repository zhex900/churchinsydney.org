import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

const Providers = ({ children }: { children: ReactElement }) => {
  return children;
};

const customRender = (ui: ReactElement, options = {}) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: Providers, ...options }),
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
