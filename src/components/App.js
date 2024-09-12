import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Add a new question
  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  // Delete a question
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  // Update correct answer in the question list
  const updateCorrectAnswer = (id, correctIndex) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, correctIndex } : q
    );
    setQuestions(updatedQuestions);
    console.log("Updated state after correct answer change:", updatedQuestions);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onUpdateCorrectAnswer={updateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
