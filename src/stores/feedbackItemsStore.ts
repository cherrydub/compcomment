import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },
  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addItemToList: async function (text: string) {
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

    // setFeedbackItems((prevItems) => [...prevItems, newItem]);
    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

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
  },
  selectCompany: function (company: string) {
    // setSelectedCompany(company);
    set(() => ({
      selectedCompany: company,
    }));
  },
  fetchFeedbackItems: async function () {
    set(() => ({
      isLoading: true,
    }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      set(() => ({
        feedbackItems: data.feedbacks,
      }));
      // setFeedbackItems(data.feedbacks);
    } catch (error) {
      set(() => ({
        errorMessage: "Something went wrong",
      }));
      console.error("Error fetching data:", error);
    } finally {
      set(() => ({
        isLoading: false,
      }));
    }
  },
}));
