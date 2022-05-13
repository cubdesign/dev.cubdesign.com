import { GetStaticPaths, GetStaticProps, NextPageWithLayout } from "next";
import { ReactElement } from "react";
import DefaultLayout from "@/components/layouts/defaultLayout";
import styled from "@emotion/styled";
import Date from "@/components/date";

import {
  Slug,
  Post,
  FrontMatter,
  getPost,
  getPostSlugs,
  markdownToHtml,
  isPublic,
} from "@/libs/Blog";

import Tags from "@/components/blog/tags";
import PostDate from "@/components/blog/postDate";

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

const PostTitleWrapper = styled("div")`
  text-align: center;
`;

const PostTitle = styled("h1")`
  margin: 0;
  padding: 2rem 0;
  line-height: 1.3;
  font-size: 2rem;
  display: inline-block;
  text-align: left;
`;

const TagsWrapper = styled("div")`
  text-align: center;
  margin-top: 1rem;
`;

const ArticleHeader = styled("div")`
  text-align: center;
`;

const ArticleBody = styled("div")`
  padding: 1rem 0;

  h2 {
    padding-bottom: 2px;
    border-bottom: solid 1px #e7e4e4;
  }

  a {
    color: #0062ff;
  }

  a:visited,
  a:hover,
  a:active {
    border-bottom: solid 1px #0062ff;
    padding-bottom: 1px;
  }

  p {
    line-height: 2rem;
  }

  p > code {
    color: #c205f1;
    display: inline-block;
    white-space: nowrap;
    padding: 0 0.3rem;
    font-family: "Operator Mono", "Fira Code", Consolas, Monaco, "Andale Mono",
      "Ubuntu Mono", monospace;

    &::before {
      content: "\`";
    }

    &::after {
      content: "\`";
    }
  }
`;

const PostPage: NextPageWithLayout<Props> = ({ frontMatter, content }) => {
  return (
    <article>
      <ArticleHeader>
        <Icon>{frontMatter.icon}</Icon>

        <PostTitleWrapper>
          <PostTitle>{frontMatter.title}</PostTitle>
        </PostTitleWrapper>

        <PostDate
          createDate={frontMatter.createDate}
          updateDate={frontMatter.updateDate}
        />

        {frontMatter.tags ? (
          <TagsWrapper>
            <Tags tags={frontMatter.tags} />
          </TagsWrapper>
        ) : (
          ""
        )}
      </ArticleHeader>
      <ArticleBody dangerouslySetInnerHTML={{ __html: content }} />
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
  const slugs: Slug[] = getPostSlugs();
  let paths = [];

  for (let i: number = 0; i < slugs.length; i++) {
    const slug: Slug = slugs[i];
    //  FIXME: 効率が悪い。記事を表示するたび毎回呼ばれるので、記事を修正したら毎回全記事読み込むことになる
    const post = await getPost(slug);
    if (isPublic(post)) {
      paths.push({
        params: {
          slug: slug,
        },
      });
    }
  }

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
