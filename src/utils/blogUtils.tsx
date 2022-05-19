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

/**
 * 表示するタイトルを取得する
 */
const getVisibleTitle = (post: Post): JSX.Element => {
  return (
    <>
      {post.frontMatter.title}
      {post.frontMatter.status === "open" ? <OpenTag>[open]</OpenTag> : ""}
      {post.frontMatter.status === "close" ? <CloseTag>[close]</CloseTag> : ""}
    </>
  );
};

export { getVisibleTitle };

const BlogUtils = {
  getVisibleTitle,
};

export default BlogUtils;
