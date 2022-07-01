import { Post } from "@/libs/Blog";
import {
  getEmojiBackgroundColor,
  getLightenColor,
} from "@/libs/IconColorUtils";
import { getVisibleTitle } from "@/utils/blogUtils";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import PostDate from "./postDate";
import { mq } from "@/utils/mq";

export type PostSummaryProps = {
  post: Post;
  color: string;
};

const backgroundDynamicStyle = ({ color }: { color: string }) =>
  css`
    border: solid 3px ${getLightenColor(color)};
    background-color: ${getEmojiBackgroundColor(color)};
  `;

const PostDiv = styled("div")`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
  ${backgroundDynamicStyle};

  transition-property: background-color, border-color, text-decoration-color,
    fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

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
const PostSummary: React.FC<PostSummaryProps> = ({ post, color }) => {
  return (
    <Link href={`/post/${post.slug.join("/")}`} key={post.slug.join("/")}>
      <a>
        <PostDiv color={color}>
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
};

export default PostSummary;
