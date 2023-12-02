import fs from 'fs';
import { v4 as uuid } from 'uuid';

const DB_FILE_PATH = './core/db';

console.log('[CRUD]');

interface Todo {
    id: string;
    date: string;
    content: string;
    done: boolean;
}

function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false,
    };

    const todos = [...read(), todo];

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
    return todo;
}

function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    const db = JSON.parse(dbString || '{}');
    if (!db.todos) {
        // Fail fast validation
        return [];
    }
    return db.todos;
}

function updateContentById(id: string, content: string): Todo {
    return update(id, {
        content,
    });
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
    let updatedTodo;
    const todos = read();
    todos.forEach(currentTodo => {
        const isToUpdate = currentTodo.id === id;
        if (isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo);
        }
    });
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));

    if (!updatedTodo) {
        throw new Error('Please, provide another ID! :(');
    }

    return updatedTodo;
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, '');
}

// [SIMULATION]
CLEAR_DB();
create('Primeira TODO');
const segundaTodo = create('Segunda TODO');
console.log(read());
const updatedContent = "Algo novo :)";
console.log(`[UPDATE] ${segundaTodo.id}
content: $${updatedContent}
done: true`)
updateContentById(segundaTodo.id, updatedContent);
update(segundaTodo.id, {
    done: true
});
console.log("After update:")
console.log(read());

