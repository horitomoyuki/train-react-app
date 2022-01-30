export const Header = () => {
  const componentName = () => 'Tom';

  return (
    <div className="test-wrapper">
      このコンポーネントの名前は{componentName()}です。
    </div>
  );
};