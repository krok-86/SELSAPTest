import { FC, useEffect, useState } from "react";
import AppStyled from "./App.styled";
import ContentItemStyled from "./ContentItem.styled";

const paramsArr = [
  {
    "id": 1,
    "name": "Назначение"
  },
  {
    "id": 2,
    "name": "Длина"
  },
  {
    "id": 3,
    "name": "Количество"
  },
];

const modelsArr = {
  "paramValues": [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    },
    {
      "paramId": 3,
      "value": 8
    }
  ]
};

type ValueType = string | number;

interface IExtendArr<T> {
  id: number;
  name: string;
  value?: T;
}

const App: FC = () => {
  const [result, setResult] = useState([] as IExtendArr<ValueType>[]);

  useEffect(() => {
    const getModule = () => {
      const resultArr = paramsArr.map((param) => {
        const model = modelsArr.paramValues.find((element) => element.paramId === param.id);
        const extenedArr = { ...param, value: model?.value };
        return extenedArr;
      });
      setResult(resultArr);
    };
    getModule();
  }, []);

  const updateResultArr = (event: Event, message: ValueType, index: number) => {
    const updated = result.map((item) => {
      if (index === item.id) {
        item.value = message as ValueType;
      }
      return item;
    });
    setResult(updated);
  };

  const handleSubmit = () => {
    console.log(result);
  };

  return (
    <AppStyled>
      {result.map((param) => (
        <ContentItem key={param.id} param={param} updateResultArr={updateResultArr} />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </AppStyled>
  );
};

type ParamType = {
  param: IExtendArr<ValueType>;
  updateResultArr: (event: Event, message: ValueType, index: number ) => void;
};

const ContentItem: FC<ParamType> = ({ param, updateResultArr }) => {
  const [message, setMessage] = useState<ValueType>(param.value || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value as ValueType);
  };

  useEffect(() => {
    updateResultArr(new Event('submit'), message, param.id);
  }, [message]);

  return (
    <ContentItemStyled>
      <div className='content'>
        <div>{param.name}</div>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
        />
      </div>
    </ContentItemStyled>
  );
};

export default App;