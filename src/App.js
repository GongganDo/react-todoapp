import React, { useCallback, useReducer, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
    return Array(2500)
        .fill()
        .map((a, i) => ({ id: i, text: `할 일 ${i + 1}`, checked: false }));
}

function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT':
            return todos.concat(action.todo);
        case 'REMOVE':
            return todos.filter(todo => todo.id !== action.id);
        case 'TOGGLE':
            return todos.map(todo => (todo.id === action.id ? { ...todo, checked: !todo.checked } : todo));
        default:
            return todos;
    }
}

const App = () => {
    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

    // 고유값으로 사용될 id
    // ref를 사용하여 변수 담기
    const nextId = useRef(4);
    const onInsert = useCallback(text => {
        const todo = { id: nextId.current, text, checked: false };
        dispatch({ type: 'INSERT', todo });
        nextId.current++;
    }, []);
    const onRemove = useCallback(id => dispatch({ type: 'REMOVE', id }), []);
    const onToggle = useCallback(id => dispatch({ type: 'TOGGLE', id }), []);
    return (
        <div>
            <TodoTemplate>
                <TodoInsert onInsert={onInsert} />
                <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
            </TodoTemplate>
        </div>
    );
};

export default App;
