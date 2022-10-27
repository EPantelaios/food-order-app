import { useState, forwardRef } from 'react';

function SearchInput(props, ref) {
  const [query, setQuery] = useState('');

  const onChangeSearch = (e) => {
    setQuery(e.target.value);
    props.onChange();
  };

  return (
    <>
      <div className={props.titleClassName}>{props.title}</div>
      <input
        className={props.inputClassName}
        type="search"
        placeholder="Typing..."
        value={query}
        onChange={onChangeSearch}
        ref={ref}
      />
    </>
  );
}

export default forwardRef(SearchInput);
