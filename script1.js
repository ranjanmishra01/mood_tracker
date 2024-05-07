function populateMoodHistory() {
    const moodEntries = retrieveMoodEntries();
    const moodHistoryTable = document.getElementById('mood-history-entries');
    
    moodEntries.forEach(entry => {
        // Check if the entry already exists in the table
        const existingRow = findExistingRow(entry.date);
        if (existingRow) {

            const moodCell = existingRow.querySelector('.mood-cell');
            moodCell.textContent = entry.mood;
            
            const notesCell = existingRow.querySelector('.notes-cell');
            notesCell.textContent = entry.notes;
        } else {
            // Create new row
            const tableRow = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = entry.date; 
            // dateCell.textContent = "x";
            // dateCell.textContent = entry.date; 

            const moodCell = document.createElement('td');
            moodCell.textContent = entry.mood; 
            moodCell.classList.add('mood-cell'); 


            const notesCell = document.createElement('td');
            notesCell.textContent = entry.notes; 
            notesCell.classList.add('notes-cell'); 

            // Append cells to the table row
            tableRow.appendChild(dateCell);
            tableRow.appendChild(moodCell);
            tableRow.appendChild(notesCell);

            // Insert the table row at the top of the table body
            if (moodHistoryTable.firstChild) {
                moodHistoryTable.insertBefore(tableRow, moodHistoryTable.firstChild);
            } else {
                moodHistoryTable.appendChild(tableRow);
            }
        }
    });
}
  
  
  
  

  function retrieveMoodEntries() {
    const moodEntriesJSON = localStorage.getItem('moodEntries');
  
    return moodEntriesJSON ? JSON.parse(moodEntriesJSON) : [];
  }
  
  
  window.onload = function() {
    populateMoodHistory();
  };
  


  function getLastSubmittedDate() {
    const lastEntryJSON = localStorage.getItem('lastMoodEntryDate');
    return lastEntryJSON ? new Date(lastEntryJSON) : null;
  }
  

  function handleMoodEntrySubmit(event) {
    event.preventDefault();
  
    const submittedDate = new Date(); 
    const lastSubmittedDate = getLastSubmittedDate();
  
    if (lastSubmittedDate && lastSubmittedDate.getDate() === submittedDate.getDate() &&
        lastSubmittedDate.getMonth() === submittedDate.getMonth() &&
        lastSubmittedDate.getFullYear() === submittedDate.getFullYear()) {
      alert('You have already submitted a mood entry for today.');
      return; 
    }
  
  
    // Update last submitted date in storage
    localStorage.setItem('lastMoodEntryDate', JSON.stringify(submittedDate));
  }



  
function findExistingRow(date) {
    const existingRows = document.querySelectorAll('#mood-history-entries tr');
    
    for (let row of existingRows) {
        const cells = row.querySelectorAll('td');
        const entryDate = cells[0].textContent; 
        
        if (entryDate === date) {
            return row; 
        }
    }
    
    return null; 
}