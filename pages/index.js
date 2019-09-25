import React, { useState, useEffect, useContext } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import Input from "../components/input";
import Button from "../components/button";
import IssuesList from "../components/issues-list";
import Filter from "../components/filter";
import Loader from "../components/loader";
import { GET_ISSUES } from "../lib/queries";
import IssuesDataContext from "../components/context/issues-data";

const options = [
  { name: "All", states: null },
  { name: "Closed", states: "CLOSED" },
  { name: "Open", states: "OPEN" }
];

const Page = () => {
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [send, setSend] = useState(false);
  const [errorOwner, setErrorOwner] = useState("");
  const [errorName, setErrorName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [states, setStates] = useState(null);
  const { dataIssues, setDataIssues, paginate, setPaginate } = useContext(
    IssuesDataContext
  );

  useEffect(() => {
    setOwner(localStorage.getItem("myOwnerInLocalStorage"));
    setName(localStorage.getItem("myNameInLocalStorage"));
  }, [owner]);

  const onChangeOwner = value => {
    localStorage.setItem("myOwnerInLocalStorage", value);
    setOwner(localStorage.getItem("myOwnerInLocalStorage"));
    setDataIssues(null);
    setPaginate(5);
    setSend(false);
    setErrorOwner(false);
    setDisabled(false);
  };

  const onChangeName = value => {
    localStorage.setItem("myNameInLocalStorage", value);
    setName(localStorage.getItem("myNameInLocalStorage"));
    setDataIssues(null);
    setPaginate(5);
    setSend(false);
    setErrorName(false);
    setDisabled(false);
  };

  const changePaginate = () => {
    setPaginate(paginate + 5);
  };

  return (
    <Container>
      <Form>
        <CustomInputOwner
          onChange={e => onChangeOwner(e.target.value)}
          value={owner || ""}
          label={"*Owner"}
          error={errorOwner}
          errorMessage="Проверьте имя пользователя/организации."
        />
        <CustomInputName
          onChange={e => onChangeName(e.target.value)}
          value={name || ""}
          label={"*Name repository"}
          error={errorName}
          errorMessage="Проверьте имя репозитория."
        />
        <Button onClick={() => setSend(true)} type="button" disabled={disabled}>
          Search
        </Button>
      </Form>
      {send || dataIssues ? (
        <>
          <BlockFilter>
            <Filter options={options} onChange={value => setStates(value)} />
          </BlockFilter>
          <Query
            query={GET_ISSUES}
            variables={{
              owner,
              name,
              paginate,
              states
            }}
          >
            {({ loading, error, data }) => {
              if (error) {
                error && setDisabled(true);
                if (
                  String(error).includes("User") ||
                  String(error).includes("Organization")
                ) {
                  setErrorOwner(true);
                } else if (String(error).includes("Repository")) {
                  setErrorName(true);
                }
                return null;
              }
              if (loading) {
                return <CustomLoader />;
              }
              setDataIssues(data);

              return (
                <>
                  <IssuesList data={data} owner={owner} name={name} />
                  <CustomButton onClick={changePaginate}>More</CustomButton>
                </>
              );
            }}
          </Query>
        </>
      ) : null}
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomInputOwner = styled(Input)`
  margin-bottom: 15px;
`;

const CustomInputName = styled(Input)`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;

const CustomButton = styled(Button)`
  width: 20%;
`;

const BlockFilter = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 30px;
`;

const CustomLoader = styled(Loader)`
  margin-top: 100px;
`;
