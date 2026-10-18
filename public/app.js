const requestEl = document.querySelector('#request');
const button = document.querySelector('#generate');
const statusEl = document.querySelector('#status');
const tasksEl = document.querySelector('#tasks');
const emptyEl = document.querySelector('#empty');
const modeEl = document.querySelector('#mode');

let currentTasks = [];

function renderTasks() {
  tasksEl.replaceChildren();

  currentTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'task-done' : '';

    const label = document.createElement('label');
    label.className = 'task-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', 'Complete task ' + (index + 1));

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderTasks();
      updateProgress();
    });

    const description = document.createElement('span');
    description.className = 'task-description';
    description.textContent = task.descriptionEnglish;

    const priority = document.createElement('span');
    priority.className = 'priority ' + task.priority.toLowerCase();
    priority.textContent = task.priority;

    label.append(checkbox, description);
    li.append(label, priority);
    tasksEl.append(li);
  });
}

function updateProgress() {
  const completed = currentTasks.filter(task => task.completed).length;
  statusEl.textContent =
    completed + ' of ' + currentTasks.length + ' tasks completed';
}

button.addEventListener('click', async () => {
  const request = requestEl.value.trim();

  if (!request) {
    statusEl.textContent = 'Please enter a business request first.';
    requestEl.focus();
    return;
  }

  button.disabled = true;
  statusEl.textContent = 'Building your workflow...';

  try {
    const response = await fetch('/api/workflow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unable to generate workflow');
    }

    if (!Array.isArray(data.tasks) || data.tasks.length === 0) {
      throw new Error('No tasks were returned.');
    }

    currentTasks = data.tasks.map((task, index) => ({
      ...task,
      id: task.id ?? index + 1,
      completed: false
    }));

    renderTasks();

    emptyEl.hidden = true;
    modeEl.hidden = false;
    modeEl.textContent = data.mode === 'demo'
      ? 'DEMO MODE — sample tasks'
      : 'GEMINI AI';

    updateProgress();
  } catch (error) {
    statusEl.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});
