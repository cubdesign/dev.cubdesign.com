import styled from "@emotion/styled";

type TagsProps = {
  tags: string[];
};

const Container = styled("ul")`
  display: inline;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Tag = styled("li")`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: solid 1px #dfdfdf;
  border-radius: 50px;
  white-space: nowrap;
`;

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <Container>
      {tags.map((tag: string, index: number) => {
        return <Tag key={index}>{tag}</Tag>;
      })}
    </Container>
  );
};

export default Tags;
