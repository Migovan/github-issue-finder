import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const IssuesDataContext = createContext({
  dataIssues: null,
  paginate: 5,
  setDataIssues: () => {},
  setPaginate: () => {},
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
