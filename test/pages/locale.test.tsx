import { describe, expect, test, vi } from 'vitest';

import Home, { getStaticProps } from '@/pages/index';

import { act, render, screen } from '../testUtils';

let _locale = 'en';

vi.mock('next/router', () => ({
  useRouter: () => {
    return {
      asPath: '/',
      route: '/',
      locales: ['en', 'zh-CN'],
      locale: _locale,
      push: (path: string, as: string, options: { locale: string }) => {
        _locale = options.locale;
      },
    };
  },
}));

describe('Locale page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Locale should change after clicking locale button', async () => {
    const { props } = await getStaticProps({ locale: 'en' });

    const { user } = render(<Home {...props} />);

    const element = screen.getByLabelText('change-language');

    expect(element).toHaveTextContent('中');
    // change to zh-CN
    await act(async () => {
      await user.click(element);
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByLabelText('change-language')).toHaveTextContent('en');
    expect(_locale).toBe('zh-CN');

    // change back to en
    await user.click(element);
    expect(screen.getByLabelText('change-language')).toHaveTextContent('en');
    expect(_locale).toBe('en');
    expect(element).toHaveTextContent('en');
  });

  test('the component should load zh language when using locale zh', async () => {
    const { props } = await getStaticProps({ locale: 'zh-CN' });

    render(<Home {...props} />);

    // expect each translation text to be in the document
    [
      'home-welcome',
      'home-introduction-title',
      'home-quote',
      'home-quote-reference',
    ].forEach((key) => {
      expect(screen.getByText(props.translations[key])).toBeInTheDocument();
    });

    //remove tags from verse
    const verseText = props.translations['home-verse'].replace(/<[^>]+>/g, '');
    expect(screen.getByTestId('home-verse')).toHaveTextContent(verseText);
  });
});
