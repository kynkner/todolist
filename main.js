// Tạo dữ liệu cho ứng dụng TodoList
const todos = [
    { id: 1, title: "Đi chơi", status: false },
    { id: 2, title: "Làm bài tập", status: true },
    { id: 3, title: "Đá bóng", status: true },
];

// Hiển thị ds todo ra ngoài giao diện
const todoContainer = document.querySelector("ul");
const renderTodos = (todos) => {
    if (todos.length == 0) {
        todoContainer.innerHTML = "<li>Không có công việc nào trong danh sách</li>";
        return;
    }

    let html = "";
    todos.forEach(todo => {
        html += `
            <li>
                <input 
                    onchange="toggleStatus(${todo.id})"
                    type="checkbox" 
                    ${todo.status ? "checked" : ""}
                />
                <span class=${todo.status ? "active" : ""}>${todo.title}</span>
                <button onclick="editTodo(${todo.id})">Edit</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </li>
        `;
        // if (todo.status) {
        //     html += `
        //         <li>
        //             <input type="checkbox" checked/>
        //             <span class="active">${todo.title}</span>
        //             <button>Edit</button>
        //             <button>Delete</button>
        //         </li>
        // `;
        // } else {
        //     html += `
        //         <li>
        //             <input type="checkbox" />
        //             <span>${todo.title}</span>
        //             <button>Edit</button>
        //             <button>Delete</button>
        //         </li>
        // `;
        // }
    });
    todoContainer.innerHTML = html;
};

// Thêm công việc
const inputTodo = document.getElementById("input-todo");
const btnAdd = document.getElementById("btn-add");

const createId = () => {
    // return Math.floor(Math.random() * 1000000);
    if (todos.length === 0) {
        return 1;
    }
    return Math.max(...todos.map(todo => todo.id)) + 1;
}

btnAdd.addEventListener("click", () => {
    const title = inputTodo.value.trim();
    if (title.length == 0) {
        alert("Tên công việc không được để trống");
        return;
    }

    const newTodo = {
        id: createId(),
        title: title,
        status: false
    };
    todos.push(newTodo);
    renderTodos(todos);
    inputTodo.value = "";
});

// Xóa công việc
const deleteTodo = id => {
    const isDelete = confirm("Bạn có chắc chắn muốn xóa công việc này không?");
    if(!isDelete) return;

    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    renderTodos(todos);
};

// Cập nhật tiêu đề công việc
const editTodo = id => {
    const todo = todos.find(todo => todo.id === id);
    let newTitle = prompt("Cập nhật tiêu đề công việc", todo.title);

    if(newTitle === null) return;
    if (newTitle.trim().length == 0) {
        alert("Tên công việc không được để trống");
        return;
    }

    todo.title = newTitle;
    renderTodos(todos);
};

// Thay đổi trạng thái công việc
const toggleStatus = id => {
    const todo = todos.find(todo => todo.id === id);
    todo.status = !todo.status;
    renderTodos(todos);
};

// Hiển thị ds todo ra ngoài giao diện khi vào trang
renderTodos(todos);