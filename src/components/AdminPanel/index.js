import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', response: '', tags: '' });

  // Fetch questions from backend
  const fetchQuestions = async () => {
    const response = await fetch('http://localhost:5001/api/admin/questions'); // Updated the endpoint
    const data = await response.json();
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle form submission
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5001/api/admin/questions', {  // Updated the endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newQuestion, tags: newQuestion.tags.split(',') }),
    });
    if (response.ok) {
      fetchQuestions();
      setNewQuestion({ question: '', response: '', tags: '' });
    }
  };

  const handleDeleteQuestion = async (id) => {
    await fetch(`http://localhost:5001/api/admin/questions/${id}`, { method: 'DELETE' }); // Updated the endpoint
    fetchQuestions();
  };

  return (
    <div>
      <h1>Chatbot Admin Panel</h1>

      <form onSubmit={handleAddQuestion}>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Response"
          value={newQuestion.response}
          onChange={(e) => setNewQuestion({ ...newQuestion, response: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={newQuestion.tags}
          onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
        />
        <button type="submit">Add Question</button>
      </form>

      <h2>Existing Questions</h2>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            <strong>Q:</strong> {q.question} <br />
            <strong>A:</strong> {q.response} <br />
            <strong>Tags:</strong> {q.tags.join(', ')}
            <button onClick={() => handleDeleteQuestion(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
