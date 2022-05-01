import { GetStaticPaths, GetStaticProps, NextPageWithLayout } from "next";
import { ReactElement } from "react";
import DefaultLayout from "@/components/layouts/defaultLayout";
import styled from "@emotion/styled";
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

const Title = styled("h1")`
  margin: 0;
  line-height: 1.1;
  font-size: 3rem;
  text-align: center;
`;

const PostPage: NextPageWithLayout<Props> = ({ frontMatter, content }) => {
  return (
    <div>
      <Title>{frontMatter.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
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
