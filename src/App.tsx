import HashtagList from "./components/hashtag/HashtagList";

import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import FeedbackItemsContextProvider from "./contexts/FeedbackItemsContextProvider";

function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackItemsContextProvider>
        <Container
        // feedbackItems={filteredFeedbackItems}
        // isLoading={isLoading}
        // errorMessage={errorMessage}
        // handleAddToList={handleAddToList}
        />

        <HashtagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
