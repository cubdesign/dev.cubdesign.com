import DefaultLayout from "@/components/layouts/defaultLayout";
import { GetStaticProps, NextPageWithLayout } from "next";
import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { Slug, Post, getPost, getPostSlugs } from "@/libs/Blog";

type Props = {
  posts: Post[];
};

const PostDiv = styled("div")`
  border: solid 3px #000000;
  padding: 1rem;
`;

const Title = styled("h1")`
  margin: 0;
  padding: 2rem;
  line-height: 1.1;
  font-size: 2rem;
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
                <Image
                  src={`${frontMatter.socialImage}`}
                  alt={frontMatter.title}
                  width={640}
                  height={420}
                />
                <h2>{frontMatter.title}</h2>
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
