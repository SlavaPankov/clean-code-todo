const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('#new-task + button');
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  // innerText, not innerHTML: user input must not be parsed as markup.
  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = '';
};

const toggleTaskEditing = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditing = listItem.classList.contains('editMode');

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;

  list.removeChild(listItem);
};

addTaskButton.addEventListener('click', addTask);

const toggleTaskStatus = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedTasksList : incompleteTasksList;
  targetList.appendChild(listItem);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = toggleTaskEditing;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskStatus;
};

for (const taskListItem of [...incompleteTasksList.children, ...completedTasksList.children]) {
  bindTaskEvents(taskListItem);
}
