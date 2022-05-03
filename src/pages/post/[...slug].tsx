import { GetStaticPaths, GetStaticProps, NextPageWithLayout } from "next";
import { ReactElement } from "react";
import DefaultLayout from "@/components/layouts/defaultLayout";
import styled from "@emotion/styled";
import Date from "@/components/date";

import {
  Slug,
  FrontMatter,
  getPost,
  getPostSlugs,
  markdownToHtml,
} from "@/libs/Blog";

type Props = {
  frontMatter: FrontMatter;
  content: any;
};

type Params = {
  slug: Slug;
};

const Icon = styled("div")`
  padding-top: 2rem;
  font-size: 10rem;
  text-align: center;
`;

const Tag = styled("span")`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: solid 1px #dfdfdf;
  border-radius: 50px;
`;
const Title = styled("h1")`
  margin: 0;
  padding: 2rem;
  line-height: 1.1;
  font-size: 2rem;
  text-align: center;
`;

const Body = styled("div")`
  a {
    color: #0062ff;
  }

  a:visited,
  a:hover,
  a:active {
    border-bottom: solid 1px #0062ff;
    padding-bottom: 1px;
  }
`;

const PostPage: NextPageWithLayout<Props> = ({ frontMatter, content }) => {
  return (
    <article>
      <Icon>{frontMatter.icon}</Icon>
      <Title>{frontMatter.title}</Title>
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

      {frontMatter.tags?.map((tag: string, index: number) => {
        return <Tag key={index}>{tag}</Tag>;
      })}

      <Body dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

PostPage.getLayout = (page: ReactElement) => {
  const { frontMatter }: Props = page.props;
  return (
    <DefaultLayout
      title={frontMatter.metaTitle}
      description={frontMatter.metaTitle}
    >
      {page}
    </DefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs().map((slug: Slug) => {
    return {
      params: {
        slug: slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params?.slug) throw new Error("Missing slug params");
  const { frontMatter, content } = await getPost(params.slug);
  const html = await markdownToHtml(content);
  return {
    props: {
      frontMatter,
      content: html.toString(),
    },
  };
};

export default PostPage;
