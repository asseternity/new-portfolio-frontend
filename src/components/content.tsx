import Stack from './stack';

type FunctionProps = {
  callback: Function;
};

function Content({ callback }: FunctionProps) {
  return (
    <div className="content flex-1 min-h-0 p-5">
      <Stack callback={callback} />
    </div>
  );
}

export default Content;
