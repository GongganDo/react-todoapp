import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');
    const onChange = useCallback(e => setValue(e.target.value), []);
    const onSubmit = useCallback(e => {
        onInsert(value);
        setValue(''); // value 값 초기화

        // submit event는 browser에서 refresh되므로, 이를 방지하기 위한 함수 호출
        e.preventDefault();
    });
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
            <button>
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;
