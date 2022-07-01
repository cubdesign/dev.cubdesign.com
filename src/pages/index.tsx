import DefaultLayout from "@/components/layouts/defaultLayout";
import { GetStaticProps, NextPageWithLayout } from "next";
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Slug, Post, getPost, getPostSlugs, isPublic } from "@/libs/Blog";
import { css } from "@emotion/react";
import {
  getLightenColor,
  getEmojiColorsFromAPI,
  EmojiColor,
  EmojiColorDictionary,
} from "@/libs/IconColorUtils";
import _sortBy from "lodash/sortBy";
import PostDate from "@/components/blog/postDate";
import { getUI, getVisibleTitle } from "@/utils/blogUtils";
import { mq } from "@/utils/mq";

type Props = {
  posts: Post[];
};

const Title = styled("h1")`
  margin: 0;
  padding: 2rem;
  line-height: 1.1;
  font-size: 2rem;
  text-align: left;
`;

const backgroundDynamicStyle = ({ color }: { color: string }) =>
  css`
    border: solid 3px ${getLightenColor(color)};
    background-color: ${color};
  `;

const PostDiv = styled("div")`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
  ${backgroundDynamicStyle};

  ${mq("sm")} {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
`;

const PostDivHeader = styled("div")`
  padding: 1rem 2rem 0 2rem;
`;
const PostDivBody = styled("div")`
  padding: 0 2rem 1rem 2rem;

  ${mq("sm")} {
    padding-left: 0;
  }
`;

const PostTitleWrapper = styled("div")`
  text-align: center;
`;

const PostTitle = styled("h2")`
  display: inline-block;
  text-align: left;
  line-height: 1.3;
`;

const Icon = styled("div")`
  padding-top: 2rem;
  font-size: 10rem;
  text-align: center;
  ${mq("sm")} {
    padding-top: 0;
    font-size: 7rem;
  }
`;

const Home: NextPageWithLayout<Props> = ({ posts }) => {
  const [emojiColorDictionary, setEmojiColorDictionary] =
    useState<EmojiColorDictionary>({});

  useEffect(() => {
    if (posts.length === 0) return;
    const getColor = async () => {
      const emojis: string = posts.reduce((acc, post) => {
        return acc + post.frontMatter.icon;
      }, "");
      const ua: string = getUI();
      const emojiColor: EmojiColor[] = await getEmojiColorsFromAPI(emojis, ua);
      const emojiColorsDictionary: EmojiColorDictionary = emojiColor.reduce(
        (dict: EmojiColorDictionary, emojiColor: EmojiColor) => {
          dict[emojiColor.emoji] = emojiColor.color;
          return dict;
        },
        {}
      );
      setEmojiColorDictionary(emojiColorsDictionary);
    };
    getColor();
  }, [posts]);

  return (
    <>
      <Title>Welcome to dev.cubdesign.com</Title>
      {posts.map((post) => {
        return (
          <Link href={`/post/${post.slug.join("/")}`} key={post.slug.join("/")}>
            <a>
              <PostDiv color={emojiColorDictionary[post.frontMatter.icon]}>
                <PostDivHeader>
                  <Icon>{post.frontMatter.icon}</Icon>
                </PostDivHeader>
                <PostDivBody>
                  <PostTitleWrapper>
                    <PostTitle>{getVisibleTitle(post)}</PostTitle>
                  </PostTitleWrapper>

                  <PostDate
                    createDate={post.frontMatter.createDate}
                    updateDate={post.frontMatter.updateDate}
                  />
                </PostDivBody>
              </PostDiv>
            </a>
          </Link>
        );
      })}
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout title="dev.cubdesign.com" description="dev.cubdesign.com">
      {page}
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const slugs: Slug[] = getPostSlugs();
  let posts: Post[] = [];
  for (let i: number = 0; i < slugs.length; i++) {
    const slug: Slug = slugs[i];

    const post = await getPost(slug);

    if (isPublic(post)) {
      posts.push(post);
    }
  }

  // 記事を更新日順に並び替え
  posts = _sortBy(posts, (post: Post) => {
    const targetDate = post.frontMatter.updateDate
      ? post.frontMatter.updateDate
      : post.frontMatter.createDate;
    return new Date(targetDate).getTime();
  });

  // 記事を新しい順に並び替え
  posts = posts.reverse();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
