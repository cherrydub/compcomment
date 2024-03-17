import { useEffect, useMemo, useState } from "react";

import HashtagList from "./components/hashtag/HashtagList";
import { TFeedbackItem } from "./lib/types";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );

  async function handleAddToList(text: string) {
    const hashtagIndex = text.indexOf("#");
    if (hashtagIndex === -1) {
      // Handle case when '#' is not found
      return;
    }

    const companyName = text.substring(hashtagIndex + 1).split(" ")[0];

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems((prevItems) => [...prevItems, newItem]);

    try {
      await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      // Handle fetch error
      console.error("Error adding feedback:", error);
    }
  }

  function handleSelectCompany(company: string) {
    setSelectedCompany(company);
  }

  useEffect(() => {
    async function fetchFeedbackItems() {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
