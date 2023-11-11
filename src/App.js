import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState('IN_PROGRESS');
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    setSelectedRating(null); // Reset selectedRating when navigating to a new page
  }, [currentQuestion]); // Reset only when the currentQuestion changes

  const questions = [
    "How satisfied are you with our products?",
    "How fair are the prices compared to similar retailers?",
    "How satisfied are you with the value for money of your purchase?",
    "On a scale of 1-10, how would you recommend us to your friends and family?",
    "What could we do to improve our service?"
  ];

  const handleRatingClick = (rating) => {
    setAnswers({ ...answers, [currentQuestion + 1]: rating });
    setSelectedRating(rating);
    nextQuestion();
    setTimeout(() => {
      setSelectedRating(null); // Reset selectedRating after a delay
    }, 2000); // Adjust the delay time (in milliseconds) as needed
  };

  const handleTextChange = (event) => {
    setAnswers({ ...answers, [currentQuestion + 1]: event.target.value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      showConfirmationDialog();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const skipQuestion = () => {
    nextQuestion();
  };

  const showConfirmationDialog = () => {
    const confirmation = window.confirm('Do you want to submit the survey?');

    if (confirmation) {
      submitSurvey();
    }
  };

  const submitSurvey = async () => {
    const surveyData = {
      answers: answers,
      status: 'COMPLETED',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/surveys', surveyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Survey submission response:', response.data);

      if (response.status === 201) {
        alert('Survey submitted successfully!');
        showThankYouScreen();
      } else {
        console.error('Unexpected response status:', response.status);
        alert('Error submitting survey. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting survey:', error.message);
      alert('Error submitting survey. Please try again.');
    }
  };

  const showThankYouScreen = () => {
    setCurrentQuestion(-1); // Set currentQuestion to -1 to hide the survey content
    setStatus('COMPLETED');
    setTimeout(() => {
      resetSurvey();
      showWelcomeScreen();
    }, 5000);
  };

  const resetSurvey = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setStatus('IN_PROGRESS');
  };

  const showWelcomeScreen = () => {
    setCurrentQuestion(0); // Set currentQuestion to 0 to show the welcome screen
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-blue-500 p-8 rounded-lg shadow-md max-w-md w-ful">
        {status === 'IN_PROGRESS' && (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Customer Survey</h2>
            <div className="flex justify-end items-center mb-4  text-white">
              <span>{`${currentQuestion + 1}/${questions.length}`}</span>
            </div>
          </>
        )}
        {status === 'IN_PROGRESS' ? (
          <>
            <h2 className="text-xl font-bold mb-4">{questions[currentQuestion]}</h2>
            {currentQuestion === 3 ? (
              <input
                type="number"
                min="1"
                max="10"
                className="border rounded w-full p-2 mb-4"
                onChange={handleTextChange}
              />
            ) : (
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    onMouseEnter={() => setSelectedRating(rating)}
                    onMouseLeave={() => setSelectedRating(null)}
                    className={`mr-2 ${
                      selectedRating === rating ? 'bg-red-500 text-white' : 'bg-white text-black'
                    } w-10 h-10 rounded-full flex-row items-center justify-center`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
            <button
              onClick={skipQuestion}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Skip
            </button>
          </>
        ) : status === 'COMPLETED' ? (
          <h2 className="text-xl font-bold text-white">Thank you for completing the survey!</h2>
        ) : (
          <h2 className="text-xl font-bold text-white">Welcome to our Shop Survey!</h2>
        )}
      </div>
    </div>
  );
}

export default App;
