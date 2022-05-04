import DefaultLayout from "@/components/layouts/defaultLayout";
import { GetStaticProps, NextPageWithLayout } from "next";
import { ReactElement } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Slug, Post, getPost, getPostSlugs } from "@/libs/Blog";
import DateComponents from "@/components/date";
import { css } from "@emotion/react";
import { getLightenColor, getIconColor } from "@/libs/IconColorUtils";
import _sortBy from "lodash/sortBy";

type Props = {
  posts: Post[];
};

const backgroundDynamicStyle = ({ color }: { color: string }) =>
  css`
    border: solid 3px ${getLightenColor(color)};
    background-color: ${color};
  `;

const PostDiv = styled("div")`
  color: #ffffff;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  text-align: center;
  ${backgroundDynamicStyle};

  h2 {
    display: inline-block;
    text-align: left;
    line-height: 1.3;
  }
`;

const Title = styled("h1")`
  margin: 0;
  padding: 2rem;
  line-height: 1.1;
  font-size: 2rem;
  text-align: left;
`;

const Icon = styled("div")`
  padding-top: 2rem;
  font-size: 10rem;
  text-align: center;
`;

const Home: NextPageWithLayout<Props> = ({ posts }) => {
  return (
    <>
      <Title>Welcome to dev.cubdesign.com</Title>
      {posts.map(({ slug, frontMatter }) => {
        return (
          <PostDiv key={slug.join("/")} color={getIconColor(frontMatter.icon)}>
            <Link href={`/post/${slug.join("/")}`}>
              <a>
                <Icon>{frontMatter.icon}</Icon>
                <h2>{frontMatter.title}</h2>
                <DateComponents dateString={frontMatter.createDate} />
                {frontMatter.updateDate ? (
                  <>
                    {"　更新:"}
                    <DateComponents
                      dateString={frontMatter.updateDate}
                      style={{
                        marginLeft: "8px",
                      }}
                    />
                  </>
                ) : (
                  ""
                )}
              </a>
            </Link>
          </PostDiv>
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
    const { frontMatter } = await getPost(slug);

    posts.push({
      slug,
      frontMatter,
    });
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
