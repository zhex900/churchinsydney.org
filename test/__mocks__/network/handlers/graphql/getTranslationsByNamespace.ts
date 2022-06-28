import { graphql } from 'msw';

export const getTranslationsByNamespace = graphql.query(
  'GetTranslationsByNamespace',
  (_, res, ctx) => {
    return res(
      ctx.data({
        translations: [
          {
            key: 'copied-to-clipboard',
            namespace: 'common',
            translations: [
              {
                text: 'Copied to clipboard',
              },
            ],
          },
          {
            key: 'welcome',
            namespace: 'home',
            translations: [
              {
                text: 'Welcome!',
              },
            ],
          },
          {
            key: 'close',
            namespace: 'common',
            translations: [
              {
                text: 'Close',
              },
            ],
          },
          {
            key: 'update-not-now',
            namespace: 'common',
            translations: [
              {
                text: 'Not now',
              },
            ],
          },
          {
            key: 'update',
            namespace: 'common',
            translations: [
              {
                text: 'Update',
              },
            ],
          },
          {
            key: 'update-available-description',
            namespace: 'common',
            translations: [
              {
                text: 'A new version is available. Please refresh the page to update.',
              },
            ],
          },
          {
            key: 'update-available',
            namespace: 'common',
            translations: [
              {
                text: 'Update available',
              },
            ],
          },
          {
            key: 'skip-tag',
            namespace: 'common',
            translations: [
              {
                text: 'Skip tag',
              },
            ],
          },
          {
            key: 'table-of-contents',
            namespace: 'post',
            translations: [
              {
                text: 'Table of Contents',
              },
            ],
          },
          {
            key: 'sorry-nothing-here',
            namespace: 'common',
            translations: [
              {
                text: 'Sorry, nothing here',
              },
            ],
          },
          {
            key: 'choose-topic',
            namespace: 'post',
            translations: [
              {
                text: 'Choose topic',
              },
            ],
          },
          {
            key: 'by-last-update',
            namespace: 'common',
            translations: [
              {
                text: 'By the last update',
              },
            ],
          },
          {
            key: 'by-start-date',
            namespace: 'common',
            translations: [
              {
                text: 'By start date',
              },
            ],
          },
          {
            key: 'by-rank',
            namespace: 'common',
            translations: [
              {
                text: 'By rank',
              },
            ],
          },
          {
            key: 'submit',
            namespace: 'common',
            translations: [
              {
                text: 'Submit',
              },
            ],
          },
          {
            key: 'verse',
            namespace: 'home',
            translations: [
              {
                text: 'God desires',
              },
            ],
          },
          {
            key: 'exit',
            namespace: 'common',
            translations: [
              {
                text: 'Exit',
              },
            ],
          },
          {
            key: 'click-here',
            namespace: 'common',
            translations: [
              {
                text: 'Click here',
              },
            ],
          },
          {
            key: 'preview-mode',
            namespace: 'common',
            translations: [
              {
                text: 'Preview mode',
              },
            ],
          },
          {
            key: 'locale-zh-cn',
            namespace: 'common',
            translations: [
              {
                text: '中',
              },
            ],
          },
          {
            key: 'locale-en',
            namespace: 'common',
            translations: [
              {
                text: '英',
              },
            ],
          },
          {
            key: 'click-to-copy',
            namespace: 'common',
            translations: [
              {
                text: 'Click to copy',
              },
            ],
          },
          {
            key: 'events',
            namespace: 'common',
            translations: [
              {
                text: 'Events',
              },
            ],
          },
          {
            key: 'announcements',
            namespace: 'common',
            translations: [
              {
                text: 'Announcements',
              },
            ],
          },
          {
            key: 'our-life',
            namespace: 'common',
            translations: [
              {
                text: 'Our Life',
              },
            ],
          },
          {
            key: 'our-belief',
            namespace: 'common',
            translations: [
              {
                text: 'Our Belief',
              },
            ],
          },
          {
            key: 'all-rights-reserved',
            namespace: 'common',
            translations: [
              {
                text: 'All Rights Reserved',
              },
            ],
          },
          {
            key: 'church-in-sydney',
            namespace: 'common',
            translations: [
              {
                text: 'Church in Sydney',
              },
            ],
          },
          {
            key: 'contact-us',
            namespace: 'common',
            translations: [
              {
                text: 'Contact Us',
              },
            ],
          },
          {
            key: 'you-might-also-like',
            namespace: 'post',
            translations: [
              {
                text: 'You might also like',
              },
            ],
          },
          {
            key: 'last-updated',
            namespace: 'post',
            translations: [
              {
                text: 'Last updated',
              },
            ],
          },
          {
            key: 'ago',
            namespace: 'post',
            translations: [
              {
                text: 'ago',
              },
            ],
          },
          {
            key: 'member-login-incorrect-password-please-try-again',
            namespace: 'post',
            translations: [
              {
                text: 'Incorrect password. Please try again.',
              },
            ],
          },
          {
            key: 'member-login-helper-text',
            namespace: 'post',
            translations: [
              {
                text: "Please enter the member's password",
              },
            ],
          },
          {
            key: 'members-login',
            namespace: 'post',
            translations: [
              {
                text: "Member's Login",
              },
            ],
          },
          {
            key: 'quote-reference',
            namespace: 'home',
            translations: [
              {
                text: 'The Practical and Organic Building Up of the Church',
              },
            ],
          },
          {
            key: 'introduction-title',
            namespace: 'home',
            translations: [
              {
                text: 'Wonderful Church Life!',
              },
            ],
          },
          {
            key: 'current-events',
            namespace: 'home',
            translations: [
              {
                text: 'Current Events',
              },
            ],
          },
          {
            key: 'see-more-events',
            namespace: 'home',
            translations: [
              {
                text: 'See more events',
              },
            ],
          },
          {
            key: 'quote',
            namespace: 'home',
            translations: [
              {
                text: 'God’s heart and will in His New Testament economy, God’s good pleasure, the counsel of His will, and His purpose are to have a Body for the enlargement and expression of Christ, the embodiment of the processed Triune God (Eph. 1:9-11, 22-23; 3:9-11).',
              },
            ],
          },
        ],
      })
    );
  }
);
