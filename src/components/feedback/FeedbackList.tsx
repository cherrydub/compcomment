import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMesage from "../ErrorMessage";
import { TFeedbackItem } from "../../lib/types";

// const exampleFeedbackItems = [
//   {
//     upVoteCount: 593,
//     badgeLetter: "B",
//     companyName: "Bytegrad",
//     text: "test test test",
//     daysAgo: 4,
//   },
//   {
//     upVoteCount: 593,
//     badgeLetter: "B",
//     companyName: "Bytegrad",
//     text: "test test test",
//     daysAgo: 4,
//   },
//   {
//     upVoteCount: 593,
//     badgeLetter: "B",
//     companyName: "Bytegrad",
//     text: "test test test",
//     daysAgo: 4,
//   },
// ];

type FeedbackListProps = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
};

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errorMessage,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMesage message={errorMessage} />}

      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  );
}
