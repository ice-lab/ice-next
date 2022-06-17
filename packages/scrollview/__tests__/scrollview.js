import * as React from 'react';
import renderer from 'rax-test-renderer';
import ScrollView from '..';

function ScrollViewTest() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        x: 0,
        y: 0,
      });
    }
  }, [ref]);
  return (
    <ScrollView ref={ref}>
      {[1, 2, 3].map((num) => (<span>{num}</span>))}
    </ScrollView>
  );
}


function ScrollViewChildTest() {
  const props = {
    children: [<span>1</span>, null, <span>3</span>],
  };
  return <ScrollView {...props} />;
}

describe('ScrollView', () => {
  let component1;
  let component2;

  beforeEach(() => {
    component1 = renderer.create(
      <ScrollViewTest />,
    );
    component2 = renderer.create(
      <ScrollViewChildTest />,
    );
  });

  it('should render a ScrollView', () => {
    const tree = component1.toJSON();
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0].children[0].children[0]).toEqual('1');
    expect(tree.children[0].children[1].children[0]).toEqual('2');
    expect(tree.children[0].children[2].children[0]).toEqual('3');
  });

  it('child in ScrollView', () => {
    const tree = component2.toJSON();
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0].children.length).toEqual(2);
    expect(tree.children[0].children[0].children[0]).toEqual('1');
    expect(tree.children[0].children[1].children[0]).toEqual('3');
  });
});
