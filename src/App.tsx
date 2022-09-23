type StateType = "neutral" | "incorrect" | "correct";
type LetterBoxProps = {
  key?: string | number;
  char: string;
  state: StateType;
};
const LetterBox = ({ char }: LetterBoxProps) => {
  return (
    <div className="h-16 w-16 bg-slate-800 rounded-2xl mr-2 flex items-center justify-center text-4xl text-white font-bold pb-1">
      {char}
    </div>
  );
};

const App = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center">
      {[0, 1, 2, 3, 4, 5].map((i: number) => (
        <div key={i} className="flex mb-2">
          {[0, 1, 2, 3, 4].map((j: number) => (
            <LetterBox key={j} char={"A"} state={"neutral"} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
