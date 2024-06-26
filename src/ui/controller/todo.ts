async function get(): Promise<any> {
    return fetch("/api/todos").then(async (response) => {
        const todosString = await response.text();
        return JSON.parse(todosString).todos;
    });
}

export const todoController = {
    get,
};
