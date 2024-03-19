import HashtagList from "./components/hashtag/HashtagList";

import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "./stores/feedbackItemsStore";

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container />

      <HashtagList />
    </div>
  );
}

export default App;
