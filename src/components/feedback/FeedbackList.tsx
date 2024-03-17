import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMesage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../contexts/FeedbackItemsContextProvider";

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

export default function FeedbackList() {
  const { isLoading, errorMessage, filteredFeedbackItems } =
    useFeedbackItemsContext();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMesage message={errorMessage} />}

      {filteredFeedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  );
}
