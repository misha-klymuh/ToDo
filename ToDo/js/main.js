
const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const taskList = document.querySelector("#listGroup");




form.addEventListener("submit", function(event){
    event.preventDefault();  

    // знаходимо елементи на сторінці
    const taskText = input.value.trim();

    // формуємо розмітку для нової задачі
    const taskHTML = `<li class="list-group-item d-flex justify-content-between">
    <span contentEditable="true" class="task-title">${taskText}</span>

        <div>
        <button type="button" data-action="ready" class="btn btn-success align-self-end">Confirm</button>
    
        <button type="button" data-action="delete-task" class="btn btn-danger align-self-end">Delete</button>        
        </div>
        </li>`;
    
    // додаємо нову задачу на сторінку
    taskList.insertAdjacentHTML(`afterBegin` , taskHTML)  
     
    
    // очищаем поле ввода
    input.value = "";
    input.focus();

    // приховуємо або показуємо "список з....."

    showNotification("new");

    toggleEmptyListItem();
})


// слухаємо клік всередині списку з задачами
taskList.addEventListener("click", function(event){   

    if(event.target.getAttribute("data-action") == "delete-task"){
        event.target.closest(".list-group-item").remove();         
        showNotification("delete");
        toggleEmptyListItem();
    } 
    else if(event.target.getAttribute("data-action") ==   "ready"){

       const parentElement = event.target.closest(".list-group-item");

       parentElement.querySelector(".task-title").classList.add("task-title--done");

       parentElement.querySelector(".task-title").setAttribute("contentEditable","false");

       taskList.insertAdjacentElement("beforeEnd", parentElement);

        event.target.remove();

        showNotification("success");
    }
});


function toggleEmptyListItem(){
if (taskList.children.length > 1){
document.querySelector("#empty-list-item").style.display = "none";
} else{
    document.querySelector("#empty-list-item").style.display= "flex";
}}



function showNotification(type){
    
    let newElement = document.createElement("div");;

    switch (type) {
        case "new":
           
            newElement.className = "alert alert-warning alertOpacity";
            newElement.textContent = "Задача додана!"
            break;
        case "delete":
           
            newElement.className = "alert alert-danger";
            newElement.textContent = "Задача видалена!"
            break;

        case "success" :
            newElement.classList = "alert alert-success";
            newElement.textContent = "Задача выполнена!";
            break;
    }

    document.querySelector("#notifyHolder").insertAdjacentElement("afterBegin", newElement);

    setTimeout(function(){
        newElement.style.opacity = "1";
    }, 300);

    setTimeout(function(){
        newElement.style.opacity="0";
    },2300);

    setTimeout(function(){
        newElement.remove;
    },2600);
};