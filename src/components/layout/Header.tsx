import Pattern from "../Pattern";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import FeedbackForm from "../feedback/FeedbackForm";
import { useFeedbackItemsContext } from "../../lib/hooks";
// import { useFeedbackItemsContext } from "../../contexts/FeedbackItemsContextProvider";

export default function Header() {
  const { handleAddToList } = useFeedbackItemsContext();
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={handleAddToList} />
    </header>
  );
}
