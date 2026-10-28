const form = document.querySelector('#age-form');
const birthDateInput = document.querySelector('#birth-date');
const message = document.querySelector('#message');
const result = document.querySelector('#result');
const resetButton = document.querySelector('#reset-button');

// Converts YYYY-MM-DD into a local Date without timezone surprises.
function parseDate(value) {
  const parts = value.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;

  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  const isRealDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return isRealDate ? date : null;
}

function calculateAge(birthDate, today) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    // Day 0 of a month is the final day of the previous month.
    const daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += daysInPreviousMonth;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days };
}

function showMessage(text) {
  message.textContent = text;
  result.hidden = true;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const birthDate = parseDate(birthDateInput.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!birthDateInput.value) {
    showMessage('Please select your date of birth.');
    return;
  }

  if (!birthDate) {
    showMessage('Please enter a valid date.');
    return;
  }

  if (birthDate > today) {
    showMessage('Your date of birth cannot be in the future.');
    return;
  }

  const age = calculateAge(birthDate, today);
  document.querySelector('#years').textContent = age.years;
  document.querySelector('#months').textContent = age.months;
  document.querySelector('#days').textContent = age.days;
  message.textContent = '';
  result.hidden = false;
});

resetButton.addEventListener('click', () => {
  form.reset();
  message.textContent = '';
  result.hidden = true;
  birthDateInput.focus();
});
