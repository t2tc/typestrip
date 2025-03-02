import { strip } from './dist/typestrip.mjs';
import assert from 'assert';

console.log('Running tests...');

// Test 1: Basic type annotations
const test1 = () => {
  const input = `
    function greet(name: string): string {
      return 'Hello ' + name;
    }
  `;
  const expected = `
    function greet(name) {
  return 'Hello ' + name;
}
  `;
  assert.strictEqual(strip(input).trim(), expected.trim());
  console.log('✓ Test 1: Basic type annotations');
};

// Test 2: Interfaces and type aliases
const test2 = () => {
  const input = `
    interface User {
      name: string;
      age: number;
    }
    type Point = { x: number; y: number };
    const user: User = { name: 'John', age: 30 };
  `;
  const expected = `



    const user = { name: 'John', age: 30 };
  `;
  assert.strictEqual(strip(input).trim(), expected.trim());
  console.log('✓ Test 2: Interfaces and type aliases');
};

// Test 3: Enum declarations
const test3 = () => {
  const input = `
    enum Direction {
      Up = 'UP',
      Down = 'DOWN'
    }
    const dir = Direction.Up;
  `;
  const expected = `
    var
Direction = /*#__PURE__*/function (Direction) {Direction["Up"] = "UP";Direction["Down"] = "DOWN";return Direction;}(Direction || {});



const dir = Direction.Up;
  `;
  assert.strictEqual(strip(input).trim(), expected.trim());
  console.log('✓ Test 3: Enum declarations');
};

// Test 4: Generic type parameters
const test4 = () => {
  const input = `
    function identity<T>(arg: T): T {
      return arg;
    }
    const result = identity<string>('hello');
  `;
  const expected = `
    function identity(arg) {
  return arg;
}
const result = identity('hello');
  `;
  assert.strictEqual(strip(input).trim(), expected.trim());
  console.log('✓ Test 4: Generic type parameters');
};

// Run all tests
try {
  test1();
  test2();
  test3();
  test4();
  console.log('\n✨ All tests passed!');
} catch (error) {
  console.error('\n❌ Test failed:', error.message);
  process.exit(1);
}