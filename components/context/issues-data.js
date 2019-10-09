import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const IssuesDataContext = createContext({
  dataIssues: null,
  first: 5,
  setDataIssues: () => {},
  setFirst: () => {},
});

export default IssuesDataContext;

export const IssuesDataProvider = ({ children }) => {
  const [dataIssues, setDataIssues] = useState(null);
  const [first, setFirst] = useState(5);

  return (
    <IssuesDataContext.Provider
      value={{
        dataIssues,
        first,
        setDataIssues: value => {
          setDataIssues(value);
        },
        setFirst: value => {
          setFirst(value);
        },
      }}
    >
      {children}
    </IssuesDataContext.Provider>
  );
};

IssuesDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
