import { describe, expect, test } from 'vitest';

import Page, { getStaticProps } from '@/pages/our-life';

import { render, screen } from '../testUtils';

describe('Our life page', () => {
  test('Should render our-life content', async () => {
    const { props } = await getStaticProps({ locale: 'en' });

    render(<Page {...props} />);

    props.ourLives.forEach(async ({ description, title }) => {
      expect(screen.queryAllByText(title)).toBeDefined();
      expect(screen.queryAllByText(description)).toBeDefined();
    });
  });
});
