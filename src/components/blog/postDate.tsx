import styled from "@emotion/styled";
import Date from "@/components/date";

type PostDateProps = {
  createDate: string;
  updateDate?: string;
};

const Label = styled("span")`
  margin-left: 8px;
`;

const PostDate: React.FC<PostDateProps> = ({ createDate, updateDate }) => {
  return (
    <>
      <Date dateString={createDate} />
      {updateDate ? (
        <>
          <Label>更新:</Label>
          <Date dateString={updateDate} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PostDate;
