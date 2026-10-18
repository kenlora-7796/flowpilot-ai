const requestEl = document.querySelector('#request');
const button = document.querySelector('#generate');
const statusEl = document.querySelector('#status');
const tasksEl = document.querySelector('#tasks');
const emptyEl = document.querySelector('#empty');
const modeEl = document.querySelector('#mode');
const controlsEl = document.querySelector('#translation-controls');
const languageEl = document.querySelector('#language');
const translateEl = document.querySelector('#translate');
const translationStatusEl = document.querySelector('#translation-status');
let currentTasks = [];
let currentMode = 'demo';
let language = 'en';
let generation = 0;

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
    description.textContent = language === 'es' && task.descriptionSpanish
      ? task.descriptionSpanish : task.descriptionEnglish;
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
  statusEl.textContent = completed + ' of ' + currentTasks.length + ' tasks completed';
}
button.addEventListener('click', async () => {
  const request = requestEl.value.trim();
  if (!request) {statusEl.textContent = 'Please enter a business request first.';requestEl.focus();return;}
  button.disabled = true;
  translateEl.disabled = true;
  const thisGeneration = ++generation;
  statusEl.textContent = 'Building your workflow...';
  try {
    const response = await fetch('/api/workflow', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({request})});
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Unable to generate workflow');
    if (!Array.isArray(data.tasks) || data.tasks.length === 0) throw new Error('No tasks were returned.');
    currentTasks = data.tasks.map((task,index)=>({...task,id:task.id??index+1,completed:false,descriptionSpanish:null}));
    currentMode = data.mode;
    language = 'en';
    languageEl.value = 'en';
    translationStatusEl.textContent = '';
    renderTasks();
    emptyEl.hidden = true;
    modeEl.hidden = false;
    controlsEl.hidden = false;
    modeEl.textContent = currentMode === 'demo' ? 'DEMO MODE — sample tasks' : 'GEMINI AI';
    updateProgress();
  } catch(error) {if(thisGeneration===generation) statusEl.textContent = error.message;}
  finally {button.disabled=false;translateEl.disabled=false;}
});
translateEl.addEventListener('click', async () => {
  if (!currentTasks.length) return;
  const requested = languageEl.value;
  if (requested === 'en') {language='en';renderTasks();translationStatusEl.textContent='Original English restored.';return;}
  if (currentTasks.every(t=>t.descriptionSpanish)) {language='es';renderTasks();translationStatusEl.textContent=currentMode==='demo'?'DEMO MODE — sample Spanish templates':'Spanish translation restored.';return;}
  const thisGeneration = generation;
  translateEl.disabled=true;
  button.disabled=true;
  translationStatusEl.textContent='Translating...';
  try {
    const response=await fetch('/api/translate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:currentMode,tasks:currentTasks.map(t=>({descriptionEnglish:t.descriptionEnglish}))})});
    const data=await response.json();
    if(!response.ok) throw new Error(data.error||'Translation unavailable');
    if(!Array.isArray(data.translations)||data.translations.length!==currentTasks.length) throw new Error('Incomplete translation');
    if(thisGeneration!==generation) return;
    currentTasks.forEach((t,i)=>{t.descriptionSpanish=data.translations[i];});
    language='es';
    renderTasks();
    translationStatusEl.textContent=data.notice||'Translation ready.';
  } catch(error) {languageEl.value=language;translationStatusEl.textContent=error.message+' Original tasks preserved.';}
  finally {translateEl.disabled=false;button.disabled=false;}
});
