import React, { createContext, useContext, useState } from "react";

const initialValues = {
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
};

interface DataState {
  requisitionDetails: {
    gender: string;
    noOfOpenings: number;
    requisitionTitle: string;
    urgency: string;
  };
  jobDetails: {
    jobDetails: string;
    jobLocation: string;
    jobTitle: string;
  };
  interviewSettings: {
    interviewDuration: string;
    interviewLanguage: string;
    interviewMode: string;
  };
}

interface DataContextProps {
  state: DataState;
  setState: React.Dispatch<React.SetStateAction<DataState>>;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  handleNextButtonClick: () => void;
  handlePrevButtonClick: () => void;
}

const DataContext = createContext<DataContextProps | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<DataState>(initialValues);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleNextButtonClick = () => {
    setActiveTab((activeTab) => activeTab + 1);
    console.log(activeTab)
  };
  const handlePrevButtonClick = () => {
    setActiveTab((activeTab) => activeTab - 1);
    console.log(activeTab)
  };

  const contextValue: DataContextProps = {
    state,
    setState,
    activeTab,
    setActiveTab,
    handleNextButtonClick,
    handlePrevButtonClick,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;
