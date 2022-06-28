import { graphql } from 'msw';

export const getOurLives = graphql.query('GetOurLives', (req, res, ctx) => {
  return res(
    ctx.data({
      our_lives: [
        {
          icon: 'Pizza',
          header: null,
          translations: [
            {
              description:
                'It’s up to everyone to look after the spiritual development of our next generation. We keep our high school students’ lives meaningful by providing an atmosphere rich with God’s Word, healthy companionship, and fun activities.',
              title: 'Young people’s gatherings',
            },
          ],
        },
        {
          icon: 'Children',
          header: null,
          translations: [
            {
              description:
                "Toddlers and children are very precious to us. That's why we seek to help the little ones among us develop into young men and women who love our Lord Jesus Christ, know the Bible, and seek God's kingdom first.",
              title: "Children's service",
            },
          ],
        },
        {
          icon: 'Public',
          header: null,
          translations: [
            {
              description:
                "Prayerful spiritual relationships of two or three believers fuel our Christian life and enable us to be Christ's witnesses. We value these companionship highly and take every opportunity to encourage, strengthen, and sustain them.",
              title: 'Spiritual companionship',
            },
          ],
        },
        {
          icon: 'Book',
          header: null,
          translations: [
            {
              description:
                "As believers in Christ who love and serve Him, we enjoy the Lord's supper each Lord's Day. Following our worship of the Father, we share with one another what we have enjoyed in the Scriptures in an open session of mutual teaching and encouragement.",
              title: "The Lord's supper and teaching",
            },
          ],
        },
        {
          icon: 'Home',
          header: null,
          translations: [
            {
              description:
                "Gather with believers in your neighbourhood for dinner, singing, Bible study, prayer, and daily fellowship. Dad, mom, the kids—everybody's involved!",
              title: 'Small group life',
            },
          ],
        },
        {
          icon: 'Uni',
          header: null,
          translations: [
            {
              description:
                "Want to be a strong young man or woman who's useful to the Master? Join one of our many family-hosted small groups and begin laying a foundation for your Christian life that will help you for your entire life.",
              title: 'University groups',
            },
          ],
        },
        {
          icon: null,
          header: true,
          translations: [
            {
              description:
                "We maintain a vibrant, enjoyable and active Christian life. Life is so satisfying and fulfilling! Whether you're a growing family or a student, single or retired, you have a place to live, grow, and serve as an indispensable member of Christ's Body. The primary focus in our lives is to seek to enjoy Christ and let Him be pre-eminent in every facet of our lives according to the will of God.",
              title: 'Our Life',
            },
          ],
        },
      ],
    })
  );
});
