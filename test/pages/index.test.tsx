import { expect } from '@jest/globals';

import Home, { getStaticProps } from '@/pages/index';

import { render, screen, within } from '../testUtils';
const { getByText, getByLabelText } = screen;

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockImplementation(() => ({ route: '/' })),
}));

describe('Home page', () => {
  it('Static props hydrate should renders home page', async () => {
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
      expect(screen.getByText(props.translations[key])).toBeDefined();
    });

    const footerElement = screen.getByLabelText('footer label');

    // expect each link to be in the document
    props.links.forEach(({ href, text }) => {
      expect(within(footerElement).getByText(text).getAttribute('href')).toBe(
        href
      );
    });
    expect(screen.queryByLabelText('hero image')).toBeNull();
  });

  // happy path
  it('Should render links and translations', () => {
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
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);

    // expect each translation text to be in the document
    Object.entries(props.translations).forEach(([, value]) => {
      expect(getByText(value)).toBeDefined();
    });

    const footerElement = getByLabelText('footer label');

    // expect each link to be in the document
    props.links.forEach(({ href, text }) => {
      expect(within(footerElement).getByText(text).getAttribute('href')).toBe(
        href
      );
    });
    expect(screen.queryByLabelText('hero image')).toBeNull();
  });

  it('Should empty current events should not show current event label', () => {
    const props = {
      links: [],
      translations: {
        'home-current-events': 'Current events',
      },
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(
      screen.queryByText(props.translations['home-current-events'])
    ).toBeNull();
  });

  it('No current events should not show current event label', () => {
    const props = {
      links: [],
      translations: {
        'home-current-events': 'Current events',
      },
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(
      screen.queryByText(props.translations['home-current-events'])
    ).toBeNull();
  });

  it('No featured posts should not show featured post', () => {
    const props = {
      links: [],
      translations: {},
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('featured post 1')).toBeNull();
    expect(screen.queryByLabelText('featured post 2')).toBeNull();
  });

  it('Settings "show-hero-image" should show hero image', () => {
    const props = {
      links: [],
      translations: {},
      settings: {
        'show-hero-image': 'true',
      },
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('hero image')).toBeDefined();
  });

  it('Settings "show-hero-image" should hide hero image', () => {
    const props = {
      links: [],
      translations: {},
      settings: {
        'show-hero-image': 'false',
      },
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('hero image')).toBeNull();
  });
});
