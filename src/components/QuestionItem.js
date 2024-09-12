import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  // Local state for managing the selected answer index
  const [selectedIndex, setSelectedIndex] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  // Handle the PATCH request when the dropdown changes
  function handleChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    setSelectedIndex(newCorrectIndex); // Update local state immediately

    console.log("Selected correctIndex:", newCorrectIndex);
    console.log("Sending PATCH request for question ID:", id);

    // Send PATCH request to update the correct answer on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }), // Send updated correctIndex
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update correct answer");
        }
        return response.json();
      })
      .then((updatedQuestion) => {
        console.log("Updated question from server:", updatedQuestion);
        // Update state in parent component
        onUpdateCorrectAnswer(id, newCorrectIndex);
      })
      .catch((error) => console.error("Error updating correct answer:", error));
  }

  // Handle the delete action
  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => onDelete(id))
      .catch((error) => console.error("Error deleting question:", error));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        {/* Set the value to the local state `selectedIndex` */}
        <select value={selectedIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
