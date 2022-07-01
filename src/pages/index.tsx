import DefaultLayout from "@/components/layouts/defaultLayout";
import { GetStaticProps, NextPageWithLayout } from "next";
import { ReactElement, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Slug, Post, getPost, getPostSlugs, isPublic } from "@/libs/Blog";
import {
  getEmojiColorsFromAPI,
  EmojiColor,
  EmojiColorDictionary,
  getEmojiBackgroundColor,
} from "@/libs/IconColorUtils";
import _sortBy from "lodash/sortBy";
import { getUI } from "@/utils/blogUtils";
import PostSummary from "@/components/blog/PostSummary";
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

  const getEmojiBackgroundColorFromDictionary = (emoji: string): string => {
    if (emojiColorDictionary[emoji]) {
      return getEmojiBackgroundColor(emojiColorDictionary[emoji]);
    } else {
      return "#ffffff";
    }
  };
  return (
    <>
      <Title>Welcome to dev.cubdesign.com</Title>
      {posts.map((post) => (
        <PostSummary
          post={post}
          color={getEmojiBackgroundColorFromDictionary(post.frontMatter.icon)}
          key={post.slug.join("/")}
        ></PostSummary>
      ))}
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
