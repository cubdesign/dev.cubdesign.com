import { parseISO, format } from "date-fns";

interface TimeProps extends React.ComponentPropsWithoutRef<"time"> {
  dateString: string;
}

const Date = ({ dateString, ...props }: TimeProps) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} {...props}>
      {format(date, "yyyy/MM/dd")}
    </time>
  );
};

export default Date;
