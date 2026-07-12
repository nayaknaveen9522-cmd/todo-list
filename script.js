const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const clearBtn=document.getElementById("clearBtn");

let tasks=[];

window.onload=()=>{
    const saved=localStorage.getItem("tasks");

    if(saved){
        tasks=JSON.parse(saved);
        displayTasks();
    }
};

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function displayTasks(){

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        const span=document.createElement("span");
        span.innerText=task.text;

        span.onclick=()=>{

            tasks[index].completed=!tasks[index].completed;

            saveTasks();

            displayTasks();
        };

        const actions=document.createElement("div");
        actions.className="actions";

        const edit=document.createElement("button");
        edit.innerText="Edit";
        edit.className="edit";

        edit.onclick=()=>{

            const newTask=prompt("Edit Task",task.text);

            if(newTask!=null && newTask.trim()!=""){
                tasks[index].text=newTask;
                saveTasks();
                displayTasks();
            }
        };

        const del=document.createElement("button");
        del.innerText="Delete";
        del.className="delete";

        del.onclick=()=>{

            tasks.splice(index,1);

            saveTasks();

            displayTasks();
        };

        actions.appendChild(edit);
        actions.appendChild(del);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

}

addBtn.onclick=()=>{

    const text=taskInput.value.trim();

    if(text===""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    taskInput.value="";

    saveTasks();

    displayTasks();

};

taskInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){
        addBtn.click();
    }

});

clearBtn.onclick=()=>{

    if(confirm("Delete all tasks?")){

        tasks=[];

        saveTasks();

        displayTasks();

    }

};