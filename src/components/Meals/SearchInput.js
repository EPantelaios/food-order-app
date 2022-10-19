import { useState, useEffect, useCallback } from 'react';

function SearchInput(props) {
  const [query, setQuery] = useState('');
  const items = props.items;

  const filteredItems = useCallback(() => {
    if (!query) return items;

    const queryLowerCase = query.toLowerCase();
    return items.filter((item) => {
      return item.name.toLowerCase().includes(queryLowerCase);
    });
  }, [items, query]);

  const onChangeSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    props.onChange(filteredItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems]);

  return (
    <>
      <div className={props.titleClassName}>{props.title}</div>
      <input
        className={props.inputClassName}
        type="search"
        placeholder="Typing..."
        value={query}
        onChange={onChangeSearch}
      />
    </>
  );
}

export default SearchInput;
