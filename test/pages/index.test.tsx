import { describe, expect, test } from 'vitest';

import Home, { getStaticProps } from '@/pages/index';

import { act, render, screen, within } from '../testUtils';

const { getByText, getByLabelText } = screen;

const settings = {
  phone: '123456789',
  address: '1234 Main St, City, State, 12345',
};
describe('Home page', () => {
  test('Click contact us, should copy to clipboard', async () => {
    vi.useFakeTimers();
    window.prompt = vi.fn();
    const mockCommand = vi.fn();
    document.execCommand = mockCommand;

    const { props } = await getStaticProps({ locale: 'en' });

    render(<Home {...props} />);

    const links = screen.queryByLabelText('contact us links');
    expect(links).toBeInTheDocument();
    if (links) {
      for await (const key of ['email', 'phone', 'address']) {
        expect(screen.queryByLabelText(`${key} tooltip`)).toHaveTextContent(
          `Click to copy ${props.settings[key]}`
        );

        act(() => {
          within(links).getByLabelText(key).click();
        });
        expect(mockCommand).toHaveBeenCalledWith('copy');
        expect(screen.queryByLabelText(`${key} tooltip`)).toHaveTextContent(
          `Copied to clipboard ${props.settings[key]}`
        );

        // wait for reset
        await act(() => {
          vi.runAllTimers();
        });
      }
    }
  });

  test('Static props hydrate should renders home page', async () => {
    const { props } = await getStaticProps({ locale: 'en' });

    render(<Home {...props} />);

    // expect each translation text to be in the document
    [
      'home-verse',
      'home-welcome',
      'home-introduction-title',
      'home-quote',
      'home-quote-reference',
    ].forEach((key) => {
      expect(screen.getByText(props.translations[key])).toBeInTheDocument();
    });

    const footerElement = screen.getByLabelText('footer label');

    // expect each link to be in the document
    props.links.forEach(({ href, text }) => {
      expect(within(footerElement).getByText(text).getAttribute('href')).toBe(
        href
      );
    });
    expect(screen.queryByLabelText('hero image')).not.toBeInTheDocument();
  });

  // happy path
  test('Should render links and translations', () => {
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
          tooltip: 'Git repository',
        },
      ],
      translations: {
        'home-verse': "I'm a web developer",
        'home-welcome': 'Welcome to my blog',
        'home-introduction-title': 'Introduction',
        'home-quote': '"I am a quote"',
        'home-quote-reference': '- John Doe',
      },
      settings,
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);

    // expect each translation text to be in the document
    Object.entries(props.translations).forEach(([, value]) => {
      expect(getByText(value)).toBeInTheDocument();
    });

    const footerElement = getByLabelText('footer label');

    // expect each link to be in the document
    props.links.forEach(({ href, text }) => {
      expect(within(footerElement).getByText(text).getAttribute('href')).toBe(
        href
      );
    });
    expect(screen.queryByLabelText('hero image')).not.toBeInTheDocument();
  });

  test('Should empty current events should not show current event label', () => {
    const props = {
      links: [],
      translations: {
        'home-current-events': 'Current events',
      },
      settings,
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(
      screen.queryByText(props.translations['home-current-events'])
    ).not.toBeInTheDocument();
  });

  test('No current events should not show current event label', () => {
    const props = {
      links: [],
      translations: {
        'home-current-events': 'Current events',
      },
      settings,
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(
      screen.queryByText(props.translations['home-current-events'])
    ).not.toBeInTheDocument();
  });

  test('No featured posts should not show featured post', () => {
    const props = {
      links: [],
      translations: {},
      settings,
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('featured post 1')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('featured post 2')).not.toBeInTheDocument();
  });

  it('Settings "show-hero-image" should show hero image', () => {
    const props = {
      links: [],
      translations: {},
      settings: {
        'show-hero-image': 'true',
        ...settings,
      },
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('hero image')).toBeInTheDocument();
  });

  test('Settings "show-hero-image" should hide hero image', () => {
    const props = {
      links: [],
      translations: {},
      settings: {
        'show-hero-image': 'false',
        ...settings,
      },
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('hero image')).not.toBeInTheDocument();
  });
});
