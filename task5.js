let tasks=[]
let currentFilter='all'

const taskInput=document.getElementById('taskInput')
const dueDate=document.getElementById('dueDate')
const addButton=document.getElementById('addButton')
const taskList=document.getElementById('taskList')
const filterButtons=document.querySelectorAll('.filter')
const sortButton=document.getElementById('sortButton')

function addTask(){
const text=taskInput.value.trim()
if(!text)return
    
tasks.unshift({
id:Date.now(),
text:text,
done:false,
due:dueDate.value||null
})
    
taskInput.value=''
dueDate.value=''
render()
}

function toggleTask(id){
tasks=tasks.map(task=>
task.id===id?{...task,done:!task.done}:task
)
render()
}

function deleteTask(id){
tasks=tasks.filter(task=>task.id!==id)
render()
}

function setFilter(filter){
currentFilter=filter
filterButtons.forEach(btn=>{
btn.classList.toggle('active',btn.dataset.filter===filter)
})
render()
}

function sortTasks(){
const today=new Date().toISOString().split('T')[0]
tasks.sort((a,b)=>{
const aDate=a.due?new Date(a.due):null
const bDate=b.due?new Date(b.due):null
if(!aDate)return 1
if(!bDate)return-1
return aDate-bDate
})
render()
}

function render(){
const today=new Date().toISOString().split('T')[0]
    
let filtered=tasks
if(currentFilter==='pending')filtered=tasks.filter(t=>!t.done)
if(currentFilter==='done')filtered=tasks.filter(t=>t.done)
   
taskList.innerHTML=filtered.map(task=>{
const isOverdue=task.due&&task.due<today
const toggleBtn=task.done?'Undo':'Done'
        
return `
<li class="task ${task.done?'completed':''}">
<div class="task-content" onclick="toggleTask(${task.id})">
<div class="task-text">${task.text}</div>
${task.due?`
<div class="task-date ${isOverdue?'overdue':''}">
Due: ${task.due}
</div>
`:''}
</div>
<div class="buttons">
<button class="btn btn-complete" 
onclick="toggleTask(${task.id});event.stopPropagation()">
${toggleBtn}
</button>
<button class="btn btn-delete" 
onclick="deleteTask(${task.id});event.stopPropagation()">
Delete
</button>
</div>
</li>
        `
}).join('')
}

filterButtons.forEach(btn=>{
btn.addEventListener('click',()=>setFilter(btn.dataset.filter))
})

addButton.addEventListener('click',addTask)
taskInput.addEventListener('keypress',e=>{
if(e.key==='Enter')addTask()
})
sortButton.addEventListener('click',sortTasks)

render()
