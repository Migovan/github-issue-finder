import React, { createContext, useState } from "react";

const IssuesDataContext = createContext({
  dataIssues: null,
  paginate: 5,
  setDataIssues: () => {},
  setPaginate: () => {}
});

export default IssuesDataContext;

export const IssuesDataProvider = ({ children }) => {
  const [dataIssues, setDataIssues] = useState(null);
  const [paginate, setPaginate] = useState(5);

  return (
    <IssuesDataContext.Provider
      value={{
        dataIssues,
        paginate,
        setDataIssues: value => {
          setDataIssues(value);
        },
        setPaginate: value => {
          setPaginate(value);
        }
      }}
    >
      {children}
    </IssuesDataContext.Provider>
  );
};
