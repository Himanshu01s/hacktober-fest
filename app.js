let tasks = [];

 window.onload = function() {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
    updateStats();
  }
};

 document.getElementById('todo-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('contributor-name').value;
  const content = document.getElementById('task-content').value;
  const dueDate = document.getElementById('due-date').value;
  const priority = document.getElementById('task-priority').value;

  const task = {
    name: name,
    content: content,
    completed: false,
    timestamp: new Date().toLocaleString(),
    dueDate: dueDate,
    priority: priority
  };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.getElementById('todo-form').reset();
  renderTasks();
  updateStats();
});

function renderTasks() {
  const tasksContainer = document.getElementById('tasks-container');
  tasksContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.setAttribute('draggable', 'true');
    taskElement.dataset.index = index; // Store the index

    const taskContent = document.createElement('p');
    taskContent.textContent = task.content;
    if (task.completed) {
      taskContent.classList.add('completed');
    }

const contributor = document.createElement('p');
contributor.textContent = `Contributed by Himanshu on ${task.timestamp}`;  
contributor.className = 'contributor';


    const dueDate = document.createElement('p');
    dueDate.textContent = `Due: ${new Date(task.dueDate).toLocaleDateString()}`;
    dueDate.className = 'due-date';

    const priority = document.createElement('p');
    priority.textContent = `Priority: ${task.priority}`;
    priority.className = 'priority';

    const priorityIndicator = document.createElement('span');
    priorityIndicator.style.color = getPriorityColor(task.priority);
    priorityIndicator.textContent = task.priority;
    
    const actions = document.createElement('div');
    actions.className = 'actions';

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.className = 'complete-btn';
    completeButton.addEventListener('click', () => toggleComplete(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => deleteTask(index));

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    
    taskElement.appendChild(taskContent);
    taskElement.appendChild(contributor);
    taskElement.appendChild(dueDate);
    taskElement.appendChild(priority);
    taskElement.appendChild(actions);
    tasksContainer.appendChild(taskElement);
  });
}

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  updateStats();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  updateStats();
}

// Function to update task statistics
function updateStats() {
  const totalTasks = document.getElementById('total-tasks');
  const completedTasks = document.getElementById('completed-tasks');
  const pendingTasks = document.getElementById('pending-tasks');

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter(task => task.completed).length;
  pendingTasks.textContent = tasks.filter(task => !task.completed).length;
}

// Function to get color based on priority level
function getPriorityColor(priority) {
  switch (priority) {
    case 'High':
      return 'red';
    case 'Medium':
      return 'orange';
    case 'Low':
      return 'green';
    default:
      return 'black';
  }
}

// Clear completed tasks
document.getElementById('clear-completed').addEventListener('click', function() {
  tasks = tasks.filter(task => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  updateStats();
});

document.getElementById('search-bar').addEventListener('keyup', function() {
  const query = this.value.toLowerCase();
  const tasksContainer = document.getElementById('tasks-container');
  const taskElements = tasksContainer.getElementsByClassName('task');

  Array.from(taskElements).forEach(task => {
    const taskContent = task.firstChild.textContent.toLowerCase();
    task.style.display = taskContent.includes(query) ? '' : 'none';
  });
});

 
document.getElementById('toggle-dark-mode').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  const audio = document.getElementById('background-music');
  audio.loop = true;
  audio.volume = 0.1;  
  audio.play();
});
