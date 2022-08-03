import { describe, expect, test } from 'vitest';

import Home, { getStaticProps } from '@/pages/index';

import { act, render, screen, within } from '../testUtils';

const { getByText } = screen;

describe('Tooltip', () => {
  test('Footer link tooltip should show on hover', async () => {
    const props = {
      links: [
        {
          href: 'https:///google.com',
          text: 'Search engine',
          tooltip: 'Search the web',
        },
        {
          href: 'https://github.com',
          text: 'github',
          tooltip: '',
        },
      ],
      translations: {},
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    const { user } = render(<Home {...props} />);

    const tooltipElement = screen
      .queryByText('Search the web')
      ?.closest('[role="tooltip"]');
    expect(tooltipElement).toHaveClass('invisible');
    await act(async () => {
      await user.hover(getByText('Search engine'));
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(tooltipElement).not.toHaveClass('invisible');

    // github link should not have tooltip
    await act(async () => {
      await user.hover(getByText('github'));
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(getByText('github').parentNode).not.toHaveAttribute(
      'data-testid',
      'tooltip-target'
    );
  });

  test('Contact us tooltips should show on hover', async () => {
    const { props } = await getStaticProps({ locale: 'en' });
    const { user } = render(<Home {...props} />);

    const contactUsLinksElement = screen.getByLabelText('contact us links');

    ['phone', 'email', 'address'].forEach(async (contactId) => {
      const tooltipElement = within(contactUsLinksElement)
        .queryByLabelText(`${contactId} tooltip`)
        ?.closest('[role="tooltip"]');
      expect(tooltipElement).toHaveClass('invisible');
      expect(tooltipElement).toHaveTextContent(
        `${props.translations['common-click-to-copy']} ${props.settings[contactId]}`
      );
      const tooltipTargetElement = within(
        contactUsLinksElement
      ).queryByLabelText(contactId);

      expect(tooltipTargetElement).toBeInTheDocument();
      await act(async () => {
        await user.hover(tooltipTargetElement as HTMLElement);
      });
      await new Promise((r) => setTimeout(r, 500));
      expect(tooltipElement).not.toHaveClass('invisible');
    });
  });
});
