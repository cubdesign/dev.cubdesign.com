import { Post } from "@/libs/Blog";

import styled from "@emotion/styled";

const OpenTag = styled("span")`
  display: inline-block;
  font-weight: normal;
  white-space: nowrap;
  margin-left: 1rem;
  opacity: 0.3;
`;

const CloseTag = styled("span")`
  display: inline-block;
  font-weight: normal;
  white-space: nowrap;
  margin-left: 1rem;
  opacity: 0.1;
  text-decoration: line-through;
`;

const DraftTag = styled("span")`
  display: inline-block;
  font-weight: normal;
  white-space: nowrap;
  margin-left: 1rem;
  opacity: 1;
  color: #d4ff00;
  background-color: #000000;
  border: solid 2px #d4ff00;
`;

/**
 * 表示するタイトルを取得する
 */
const getVisibleTitle = (post: Post): JSX.Element => {
  return (
    <>
      {post.frontMatter.title}
      {post.frontMatter.status === "open" ? <OpenTag>[open]</OpenTag> : ""}
      {post.frontMatter.status === "close" ? <CloseTag>[close]</CloseTag> : ""}
      {post.frontMatter.status === "draft" ? <DraftTag>[draft]</DraftTag> : ""}
    </>
  );
};

export { getVisibleTitle };

const BlogUtils = {
  getVisibleTitle,
};

export default BlogUtils;
