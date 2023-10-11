/*=========== НАХОДИМ ФОРМЫ HTML: ===========*/ 

//Находим форму, при отправке которой должно произойти добавление задачи:
const form = document.querySelector('#form');

// Находим input, чтобы забирать текстовое значение задачи:
const taskInput = document.querySelector('#taskInput');

// Находим ul, для того, чтобы обращаться к списку с задачами:
const tasksList = document.querySelector('#tasksList');

// Находим emptyList-блок, который содержит текст: "Список дел пуст"
const emptyList = document.querySelector('#emptyList');



/*=========== ДОБАВЛЕНИЕ ЗАДАЧИ: ===========*/ 
form.addEventListener('submit', addTask);

/*=========== УДАЛЕНИЕ ЗАДАЧИ: ===========*/ 
tasksList.addEventListener('click', deleteTask);

/*=========== ОТМЕТИТЬ ЗАДАЧУ ЗАВЕРШЁННОЙ: ===========*/ 
tasksList.addEventListener('click', doneTask);


/*=========== ФУНКЦИЯ: ДОБАВЛЕНИЯ ЗАДАЧ: ===========*/ 
function addTask(event) {
    // Отменяем стандартную перезагрузку страницы при отправке формы.
    event.preventDefault(); 

    //Достаём текст из новой задачи из поля ввода:
    const taskText = taskInput.value;

    // Формируем html-разметку для добавления новой задачи:
    const taskHTML = 
    `
    <li class="list-group-item d-flex justify-content-between task-item">
        <span class="task-title">${taskText}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>
    `;

    // Добавить задачу на страницу путём добавления новой задачи в список задач:
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // Очистить поле ввода задач после добавления задачи:
    taskInput.value = '';
    // Оставить фокус в поле ввода задач после добавления задачи:
    taskInput.focus();
    // Убираем блок: "Список дел пуст" после добавления задачи:
    if(tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }
}

/*=========== ФУНКЦИЯ: УДАЛЕНИЯ ЗАДАЧ: ===========*/ 
function deleteTask(event) {
    // Проверяем, если клик был не по кнопке "удалить задачу", выходим из функции:
    if(event.target.dataset.action !== 'delete') return;

    // Создаём переменную, в которой задача идёт на удаление:
    const parentNode = event.target.closest('li');

    // Удаляем задачу:
    parentNode.remove();

    // После удаления последней задачи, включаем блок: "список задач пуст":
    if(tasksList.children.length === 1) {
            emptyList.classList.remove('none');
    }
}


/*=========== ФУНКЦИЯ: ЗАДАЧА ЗАВЕРШЕНА: ===========*/ 
function doneTask(event) {
    // Проверяем, если клик был не по кнопке "выполнено", выходим из функции:
    if(event.target.dataset.action !== 'done') return;
        
    // Создаём переменную, в которой задача идёт на выполнение:
    const parentNode = event.target.closest('li');
    
    //Находим объект, в котором содержится название задачи:
    const taskTitle = parentNode.querySelector('span');
        
    // Добавить или убрать к найденному объекту класс для выполненных задач (в зависимости от клика):
    taskTitle.classList.toggle('task-title--done');
}


