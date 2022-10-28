import { useState, forwardRef } from 'react';

type Props = {
  titleClassName?: string;
  inputClassName?: string;
  title: string;
  onChange: () => void;
};

const SearchInput = (props: Props, ref: React.Ref<HTMLInputElement>) => {
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
};

export default forwardRef(SearchInput);
