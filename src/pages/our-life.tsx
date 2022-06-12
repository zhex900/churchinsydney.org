import clsx from 'clsx';
import * as React from 'react';
import { BsHouseDoor, BsMoonStars, BsPeople } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { GiVineLeaf } from 'react-icons/gi';
import { MdOutlineEmojiPeople } from 'react-icons/md';

import { getTranslationsByKeyStartsWith } from '@/lib/graphcms';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import OurLifeCard from '@/components/cards/OurLifeCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { TranslationContext } from '@/context/TranslationContext';

import { Translations } from '@/types/types';
const ourLife = [
  {
    title: 'Small-group life',
    description:
      "Gather with believers in your neighbourhood for dinner, singing, Bible study, prayer, and daily fellowship. Dad, mom, the kids—everybody's involved!",
    icon: BsHouseDoor,
  },
  {
    title: "Children's service",
    description:
      "Toddlers and children are very precious to us. That's why we seek to help the little ones among us develop into young men and women who love our Lord Jesus Christ, know the Bible, and seek God's kingdom first.",
    icon: BsMoonStars,
  },

  {
    title: "The Lord's supper and teaching",
    description:
      "As believers in Christ who love and serve Him, we enjoy the Lord's supper each Lord's Day. Following our worship of the Father, we share with one another what we have enjoyed in the Scriptures in an open session of mutual teaching and encouragement.",
    icon: BsPeople,
  },
  {
    title: 'Spiritual companionship',
    description:
      "Prayerful spiritual relationships of two or three believers fuel our Christian life and enable us to be Christ's witnesses. We value these companionships highly and take every opportunity to encourage,strengthen, and sustain them.",
    icon: MdOutlineEmojiPeople,
  },
  {
    title: "Young people's gatherings",
    description:
      "It's up to everyone to look after the spiritual development of our next generation. We keep our high school students' lives meaningful by providing an atmosphere rich with God's Word, healthy companionships, and fun activities.",
    icon: GiVineLeaf,
  },
  {
    title: 'University groups',
    description:
      "Want to be a strong young man or woman who's useful to the Master? Join one of our many family-hosted small groups and begin laying a foundation for your Christian life that will help you for your entire life.",
    icon: FaGraduationCap,
  },
];

export default function OurLifePage({
  translations,
}: {
  translations: Translations;
}) {
  const isLoaded = useLoaded();

  return (
    <TranslationContext.Provider value={translations}>
      <Layout>
        <Seo templateTitle='Our Life' description='' />

        <main>
          <section className={clsx(isLoaded && 'fade-in-start')}>
            <div className='layout min-h-main py-20'>
              <h1 className='text-3xl md:text-5xl' data-fade='0'>
                <Accent>Our Life</Accent>
              </h1>
              <p
                className='mt-2 text-gray-600 dark:text-gray-300'
                data-fade='1'
              >
                We maintain a vibrant, enjoyable and active Christian life. A
                life so satisfying and fulfilling! Whether you're a growing
                family or a student, single or retired, you have a place to
                live, grow, and serve as an indispensable member of Christ's
                Body.{' '}
                <Accent>
                  The primary focus in our lives is to seek to enjoy Christ and
                  let Him be pre-eminent{' '}
                </Accent>{' '}
                in every facet of our lives according to the will of God.
              </p>

              <ul
                className='mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
                data-fade='5'
              >
                {ourLife.map((snippet, i) => (
                  <OurLifeCard
                    key={snippet.title}
                    snippet={snippet}
                    index={i}
                  />
                ))}
              </ul>
            </div>
          </section>
        </main>
      </Layout>
    </TranslationContext.Provider>
  );
}

export async function getStaticProps({
  locale,
  defaultLocale,
}: {
  locale: string;
  defaultLocale: string;
}) {
  return {
    props: {
      translations: await getTranslationsByKeyStartsWith(
        ['common'],
        [locale, defaultLocale]
      ),
    },
  };
}
