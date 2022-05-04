import DefaultLayout from "@/components/layouts/defaultLayout";
import { GetStaticProps, NextPageWithLayout } from "next";
import { ReactElement } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Slug, Post, getPost, getPostSlugs } from "@/libs/Blog";
import Date from "@/components/date";

type Props = {
  posts: Post[];
};

const PostDiv = styled("div")`
  border: solid 3px #250542;
  color: #ffffff;
  background-color: #3e0870;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled("h1")`
  margin: 0;
  padding: 2rem;
  line-height: 1.1;
  font-size: 2rem;
  text-align: center;
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
          <PostDiv key={slug.join("/")}>
            <Link href={`/post/${slug.join("/")}`}>
              <a>
                <Icon>{frontMatter.icon}</Icon>
                <h2>{frontMatter.title}</h2>
                <Date dateString={frontMatter.createDate} />
                {frontMatter.updateDate ? (
                  <>
                    {"　更新:"}
                    <Date
                      dateString={frontMatter.createDate}
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
  const posts: Post[] = [];
  for (let i: number = 0; i < slugs.length; i++) {
    const slug: Slug = slugs[i];
    const { frontMatter } = await getPost(slug);
    posts.push({
      slug,
      frontMatter,
    });
  }

  return {
    props: {
      posts,
    },
  };
};

export default Home;
