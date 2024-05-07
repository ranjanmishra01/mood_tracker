// document.getElementById('mood-entry-form').addEventListener('submit', function(event) {
document.getElementById('mood-entry-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const moodDate = document.getElementById('mood-date').value;
    const mood = document.getElementById('mood-select').value;
    const notes = document.getElementById('mood-notes').value;
  
    const formData = {
        date: moodDate,
        mood: mood,
        notes: notes
    };
    console.log(formData);
  
    // Send form data to backend server
//     fetch('/api/formEntry', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to save mood entry');
//         }
//         console.log('Mood entry saved successfully');
//         window.location.href = 'moodhistory.html';
//     })
//     .catch(error => {
//         console.error('Error saving mood entry:', error);
//     });
// });
try {
  const response = await fetch('http://localhost:5000/api/formEntry', {
    // mode: 'no-cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error('Failed to save mood entry');
  }

  console.log('Mood entry saved successfully');
  window.location.href = 'moodhistory.html'; // Redirect upon success
} catch (error) {
  console.error('Error saving mood entry:', error);
  // Handle error display to the user, if needed
}
});



//for local storage below

// const moodEntryForm = document.getElementById("mood-entry-form");
// moodEntryForm.addEventListener('submit', handleMoodEntrySubmit);
// function handleMoodEntrySubmit(event) {
//     event.preventDefault();
  
//     // Capture user input from the form
//     const mood = captureMoodSelection();
//     const notes = captureNotes();
//     const date = captureDate();
  
//     saveMoodEntry(mood, notes, date);
  
//   }

//     function captureMoodSelection() {
//         const moodDropdown = document.getElementById('mood-select'); // Assuming your dropdown has an id of "mood-select"
//         return moodDropdown.value;
//       }
      
  
//   function captureNotes() {
//     const notesTextarea = document.getElementById('mood-notes');
//     return notesTextarea.value;
//   }
  
//   function captureDate() {
//     const selectedDateInput = document.getElementById('mood-date');
//     return selectedDateInput.value;
//   }

  
//   function saveMoodEntry(mood, notes, date) {
//     const moodEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
//     moodEntries.push({ mood, notes, date });
//     localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
//   }
  