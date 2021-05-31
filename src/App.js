import React, {useState} from 'react';
//==========================================================================================나중에 따로 js 파일로 빼기
//처음으로 만들어볼 Hooks는 useInput
export const useInput = (initialValue, validator) => {//useInput은 initialValue를 받는다. validator로 유효성을 검사.(특정한 문자를 사용 못 하도록!)
  const [value, setValue] = useState(initialValue);
  const onChange = event => {//function / onChange는 event를 가진다.
    const {
      target: {value}
    } = event;// const value = event.target.value;이것과 같음
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);//만약 10 글자 초과로 넘어가면 값이 바뀌지 않는다.
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return {value, onChange};
  //return을 그냥 value가 아닌 {value}로 했으므로 사용할때 name.value 이런식으로 씀.
}
//==========================================================================================

const App = () => {
  const maxLen = value => value.length <=10;//길이가 10 이라인지 판별.
  //!value.includes("@")라 쓰면 @를 포함하지 않아야 업데이트 됨. @를 누르면 동작하지 않음.
  const name = useInput("kim", maxLen);
  console.log({...name});
  return (
    <div>
    <h1>Hello</h1>
    <input placeholder = "Name" {...name} />
    </div>
  );
}
//{...name}을 쓰면 name 안에 있는 모든 것들을 풀어 준다. value = {name.value} onChange = {name.onChange}라고 써도 되지만 이것은 너무 길다.

export default App;
