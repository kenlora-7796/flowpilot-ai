const requestEl=document.querySelector('#request');
const button=document.querySelector('#generate');
const statusEl=document.querySelector('#status');
const tasksEl=document.querySelector('#tasks');
const emptyEl=document.querySelector('#empty');
const modeEl=document.querySelector('#mode');
button.addEventListener('click',async()=>{
 const request=requestEl.value.trim();
 if(!request){statusEl.textContent='Please enter a business request first.';requestEl.focus();return;}
 button.disabled=true;statusEl.textContent='Building your workflow…';
 try{
  const response=await fetch('/api/workflow',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({request})});
  const data=await response.json();
  if(!response.ok) throw new Error(data.error||'Unable to generate workflow');
  tasksEl.replaceChildren();
  for(const task of data.tasks){
   const li=document.createElement('li');
   const description=document.createElement('span');description.textContent=task.descriptionEnglish;
   const priority=document.createElement('span');priority.className=`priority ${task.priority.toLowerCase()}`;priority.textContent=task.priority;
   li.append(description,priority);tasksEl.append(li);
  }
  emptyEl.hidden=true;modeEl.hidden=false;
  modeEl.textContent=data.mode==='demo'?'DEMO MODE — sample tasks':'GEMINI AI';
  statusEl.textContent=data.notice;
 }catch(error){statusEl.textContent=error.message;}
 finally{button.disabled=false;}
});
