import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const statementOfFaith = [
  {
    text: 'God is uniquely one, yet triune — the Father, the Son, and the Spirit.',
    ref: '(1 Tim. 2:5a, Matt. 28:19)',
  },
  {
    text: 'Christ died on the cross for our sins, shedding His blood for our redemption.',
    ref: '(1 Pet. 2:24, Eph. 1:7a)',
  },
  {
    text: 'Christ resurrected from among the dead on the third day.',
    ref: '(1 Cor. 15:4)',
  },
  {
    text: 'Christ ascended to the right hand of God to be Lord of all.',
    ref: '(Acts 1:9, Acts 2:33, Acts 2:36)',
  },
  {
    text: 'The Bible is the complete divine revelation inspired word by word by God through the Holy Spirit.',
    ref: '(2 Pet. 1:21, 2 Tim. 3:16)',
  },
  {
    text: 'The Son of God, even God Himself, was incarnated to be a man by the name of Jesus Christ.',
    ref: '(John 1:1, John 1:14)',
  },
  {
    text: 'Whenever any person repents to God and believes in the Lord Jesus Christ, he is regenerated (born again) and becomes a living member of the one Body of Christ.',
    ref: '(Acts 20:21, John 3:3, Rom. 12:5)',
  },
  {
    text: 'Christ is coming again to receive His believers to Himself.',
    ref: '(1 Thes. 2:19)',
  },
];

export default function OurBeliefsPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo templateTitle='Our Beliefs' description='' />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <h2 data-fade='0'>Our Beliefs</h2>
            <h1 className='mt-1' data-fade='1'>
              <Accent>
                We hold the faith which is common to all the believers
              </Accent>
            </h1>
            <p className='mt-1 italic' data-fade='1'>
              <Accent> (Titus 1:4, Jude 3)</Accent>
            </p>
            <div className='mt-4' data-fade='2'>
              <article className=''>
                <ul className='list-disc'>
                  {statementOfFaith.map(({ text, ref }, i) => (
                    <li className='mt-5' key={ref}>
                      <p data-fade={i} className=''>
                        {text} <br />
                        <span className='italic'>{ref}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
