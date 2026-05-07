# Structured Programming C++ — Intelligent MCQ Question Bank

**Al-Mustafa University | Department of AI**
**Instructor: Dr. Husam Salah Mahdi**
**Course: Structured Programming C++ | First Year — Second Course**

> **Total: 180 MCQs** (30 per chapter × 6 chapters)
> Designed to probe **understanding**, not memorisation. Many questions ask the
> student to read a small code snippet, predict its output, find the bug,
> complete a missing line, or pick the correct one-line implementation.
>
> Each question has 4 options (A–D) with one correct answer and an explanation
> that teaches *why* the other choices are wrong.

---

## Chapter 1: Functions in C++

### Q1. Look at the four parts of a function definition. Which part is **always required** even when the function takes no input?
- A) The parameter list
- B) The return type
- C) A `return` statement
- D) The `void` keyword inside the parentheses

**Answer: B) The return type is mandatory in every function definition (it can be `void`, but it must be written). The parameter list may be empty `()`, the `return` statement is only needed for non-void functions, and writing `void` inside the parentheses (C-style) is optional in C++.**

---

### Q2. What is printed by the following program?
```cpp
#include <iostream>
using namespace std;
int f(int x) { return x + 1; }
int g(int x) { return x * 2; }
int main() {
    cout << f(g(3)) << " " << g(f(3));
    return 0;
}
```
- A) `7 7`
- B) `7 8`
- C) `8 7`
- D) `8 8`

**Answer: B) Trace from the inside out. `f(g(3))`: `g(3) = 6`, then `f(6) = 7`. `g(f(3))`: `f(3) = 4`, then `g(4) = 8`. Output: `7 8`.**

---

### Q3. A student writes the following. Why does it **not compile**?
```cpp
#include <iostream>
using namespace std;
int main() {
    cout << add(2, 3);
    return 0;
}
int add(int a, int b) { return a + b; }
```
- A) `cout` cannot print the return value of a function
- B) `add` is called before it is declared or defined
- C) The function `add` has the wrong return type
- D) `main` must come after every other function

**Answer: B) C++ requires a function to be **declared** (via prototype) or **defined** before it is called. Adding `int add(int, int);` above `main` fixes the error. Note: `main` does not have to come last — placing the full definition of `add` above `main` would also work.**

---

### Q4. Which **single line** added at the top would make Q3's program compile?
- A) `int add;`
- B) `extern add;`
- C) `int add(int, int);`
- D) `function add(int, int);`

**Answer: C) `int add(int, int);` is a valid function prototype. Parameter names are optional in a prototype — only the return type, name, and parameter *types* are required.**

---

### Q5. What does the following function return when called as `mystery(5)`?
```cpp
int mystery(int n) {
    if (n > 0) return 1;
    return -1;
    return 0;          // Will this ever execute?
}
```
- A) `1`
- B) `-1`
- C) `0`
- D) Compile error because of two `return` statements

**Answer: A) `n > 0` is true for `n = 5`, so the first `return 1;` executes immediately and the function exits. The other return statements are *unreachable code*. Multiple return statements are perfectly legal — only the first one reached executes.**

---

### Q6. A C++ function intended to return the absolute value of a number is written as below. What is the bug?
```cpp
int absVal(int x) {
    if (x < 0) -x;
    else x;
}
```
- A) The `if` should be a `while`
- B) The function never actually returns anything
- C) `-x` should be `+x`
- D) `int` should be `unsigned`

**Answer: B) The lines `-x;` and `x;` are valid statements (they evaluate an expression and discard it), but the function never executes a `return`. The result is undefined behaviour. The fix: write `return -x;` and `return x;`.**

---

### Q7. Complete the prototype so the following call is legal: `float a = average(3, 4, 5);`
- A) `float average();`
- B) `float average(int, int, int);`
- C) `int average(float, float, float);`
- D) `float average(int);`

**Answer: B) The call passes three `int` arguments and assigns the result to a `float`, so the function must return `float` and accept three `int` parameters in order.**

---

### Q8. What does the following program print?
```cpp
#include <iostream>
using namespace std;
void inc(int n) { n = n + 10; }
int main() {
    int x = 5;
    inc(x);
    cout << x;
    return 0;
}
```
- A) `5`
- B) `15`
- C) `10`
- D) Garbage value

**Answer: A) `inc` receives `n` by **value** (a copy of `x`). Modifying the copy has no effect on `x` in `main`, so `x` is still `5` after the call.**

---

### Q9. Modify Q8 so that `inc` actually changes `x` in `main`. Which signature works?
- A) `void inc(int n)`
- B) `void inc(int& n)`
- C) `void inc(const int n)`
- D) `int inc(int n)`

**Answer: B) `int& n` is a **reference parameter** — the function operates on the same memory cell as `x`, so any change persists after the call.**

---

### Q10. What does this program print?
```cpp
#include <iostream>
using namespace std;
void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}
int main() {
    int x = 1, y = 9;
    swap(&x, &y);
    cout << x << " " << y;
}
```
- A) `1 9`
- B) `9 1`
- C) `1 1`
- D) `9 9`

**Answer: B) The swap function dereferences the pointers and exchanges the values stored at the addresses of `x` and `y`, so the final values are swapped.**

---

### Q11. Why does `swap(x, y);` (without `&`) **not** work for the swap function declared as `void swap(int *a, int *b)`?
- A) Pointer parameters require addresses, not values
- B) `swap` cannot be used in `main`
- C) Pointers can only point to `const` data
- D) The compiler reorders parameters automatically

**Answer: A) The function expects `int *` (a pointer), so the call must supply addresses (`&x`, `&y`). Passing `x` and `y` directly passes values, which the compiler will refuse because the types do not match.**

---

### Q12. Which statement about C++ references is **true**?
- A) A reference can be reassigned to refer to a different object later
- B) A reference variable must be initialised when declared
- C) References can be `null`, just like pointers
- D) References use the `*` operator to access the underlying value

**Answer: B) A reference must be bound to an object at the moment of declaration and cannot be re-bound afterwards. References cannot be null and do not need an explicit dereference operator.**

---

### Q13. Predict the output:
```cpp
int max(int a, int b) { return (a > b) ? a : b; }
int main() {
    cout << max(max(2, 7), max(4, 5));
}
```
- A) `4`
- B) `5`
- C) `7`
- D) `2`

**Answer: C) Inner: `max(2,7) = 7`, `max(4,5) = 5`. Outer: `max(7, 5) = 7`. The ternary `(a > b) ? a : b` is a compact form of an if/else.**

---

### Q14. The function `int f(int n) { return n; }` is called as `f(3.7)`. What value is returned?
- A) `3.7`
- B) `4`
- C) `3`
- D) Compile error

**Answer: C) Passing a `double` (3.7) to an `int` parameter triggers an implicit narrowing conversion that **truncates** the fractional part. The function receives `3` and returns `3`. (Some compilers warn about this conversion.)**

---

### Q15. Which is the **smallest valid** definition of a function that does nothing and returns nothing?
- A) `void nop() { return; }`
- B) `void nop() {}`
- C) `nop() { }`
- D) `void nop;`

**Answer: B) `void nop() {}` is a complete, legal function: void return type, name, empty parameter list, empty body. Option A is also legal but adds an unnecessary `return;`. Option C lacks a return type. Option D is a *variable* declaration of type `void` (illegal).**

---

### Q16. What is wrong with this attempt to compute the average of two integers?
```cpp
float avg(int a, int b) {
    return (a + b) / 2;
}
```
- A) The integer division truncates the decimal part
- B) `float` cannot hold the result
- C) The parameters must be of type `float`
- D) Nothing is wrong

**Answer: A) `a + b` is `int`, and `2` is `int`, so `(a+b)/2` performs **integer division**. To get a true average, write `(a + b) / 2.0` to force floating-point division, or cast one operand to `float`.**

---

### Q17. Fill in the blank so the function correctly returns the larger of two numbers in **one line**.
```cpp
int max(int a, int b) {
    return _________;
}
```
- A) `a > b`
- B) `(a > b) ? a : b`
- C) `if (a > b) a else b`
- D) `max(a, b)`

**Answer: B) The ternary operator `(condition) ? value_if_true : value_if_false` is the idiomatic single-expression way to choose between two values. Option D would be infinite recursion.**

---

### Q18. What does the program print?
```cpp
#include <iostream>
using namespace std;
int squareSum(int a, int b) { return a*a + b*b; }
int main() {
    cout << squareSum(3, 4);
}
```
- A) `7`
- B) `12`
- C) `25`
- D) `49`

**Answer: C) `3*3 + 4*4 = 9 + 16 = 25`. (This is the Pythagorean identity for a 3-4-5 right triangle.)**

---

### Q19. Identify the bug:
```cpp
void greet(string name = "Friend") {
    cout << "Hello, " << name << endl;
}
int main() {
    greet;     // intended: print "Hello, Friend"
}
```
- A) `greet` is missing parentheses, so it is not actually called
- B) `string` is the wrong type
- C) `endl` should be `"\n"`
- D) Default parameters are illegal

**Answer: A) Writing `greet;` only references the function but does not invoke it. The call must be `greet();`. This is a very common beginner mistake.**

---

### Q20. Which of these statements about pass-by-reference is **false**?
- A) The function can modify the caller's variable
- B) No copy of the argument is made, so it is faster for large objects
- C) References must be initialised when they are first declared
- D) Reference parameters always require the `&` operator at the call site

**Answer: D) The `&` is part of the **parameter declaration** (`void f(int& x)`), not the call site. The function is called as `f(y);` — the same syntax used for pass-by-value.**

---

### Q21. What is the output?
```cpp
int triple(int x) { return 3 * x; }
int main() {
    int n = 4;
    cout << triple(triple(n));
}
```
- A) `12`
- B) `24`
- C) `36`
- D) `48`

**Answer: C) `triple(4) = 12`, then `triple(12) = 36`. Functions can be composed by passing the return value of one as the argument of another.**

---

### Q22. Write a one-line function body that returns whether an integer is **even**. Which is correct?
- A) `return n % 2;`
- B) `return n % 2 == 0;`
- C) `return n / 2 == 0;`
- D) `return n == 2;`

**Answer: B) An integer is even iff its remainder when divided by 2 is zero. Option A returns 0 or 1 (the remainder), not a clean boolean for *even*. Option C is true only when `-1 ≤ n ≤ 1`.**

---

### Q23. The following compiles but produces unexpected output. What is happening?
```cpp
int answer(int n) {
    if (n > 0)
        return 1;
}
int main() {
    cout << answer(-3);
}
```
- A) Always prints `0`
- B) Prints garbage — the function returns no value when `n <= 0`
- C) Prints `-3`
- D) Always prints `1`

**Answer: B) The function only returns a value when `n > 0`. For `n = -3`, control falls off the end of a non-void function, which is **undefined behaviour**. The program may print 0, 1, garbage, or crash.**

---

### Q24. Which is the correct prototype declaration corresponding to the function definition `double area(double r) { return 3.14 * r * r; }`?
- A) `area(r);`
- B) `double area;`
- C) `double area(double);`
- D) `double area(double r) { return 3.14 * r * r; }`

**Answer: C) A prototype lists the return type, name, and parameter *types*, terminated by a semicolon. Names are optional. Option D is a definition (not a prototype).**

---

### Q25. The function below is intended to set both `a` and `b` to zero. Which version works?
```cpp
// Goal: after the call, x == 0 and y == 0 in the caller.
```
- A) `void zero(int a, int b) { a = 0; b = 0; }`
- B) `void zero(int *a, int *b) { *a = 0; *b = 0; }`
- C) `int zero(int a, int b) { return 0; }`
- D) `void zero() { a = 0; b = 0; }`

**Answer: B) To modify the caller's variables, the function must receive references or pointers. Pointers (B) work when called as `zero(&x, &y);`. Equivalent reference version: `void zero(int& a, int& b)`.**

---

### Q26. What is the output?
```cpp
void show(int a, int b = 5, int c = 10) {
    cout << a << "," << b << "," << c << " ";
}
int main() {
    show(1);
    show(1, 2);
    show(1, 2, 3);
}
```
- A) `1,5,10 1,2,10 1,2,3`
- B) `1,0,0 1,2,0 1,2,3`
- C) `1,5,10 1,5,10 1,5,10`
- D) Compile error — too few arguments

**Answer: A) C++ allows **default arguments**. Missing arguments at the call are filled in from right to left using the defaults declared in the function signature.**

---

### Q27. Why does this overload pair compile?
```cpp
int sum(int a, int b) { return a + b; }
double sum(double a, double b) { return a + b; }
```
- A) C++ permits **function overloading** — same name, different parameter types
- B) The two functions have different return types, so they are distinct
- C) The compiler renames the second function automatically
- D) It actually does **not** compile

**Answer: A) C++ allows multiple functions with the same name as long as their **parameter lists differ** (different number or types). The compiler picks the right one based on the argument types at the call site. Return types alone are not enough to overload.**

---

### Q28. Which call would the compiler reject for `int sum(int, int);`?
- A) `sum(2, 3)`
- B) `sum(2.5, 3.5)`        *(silently truncates)*
- C) `sum(2, 3, 4)`
- D) `sum(2 + 1, 3 * 2)`

**Answer: C) The number of arguments at the call must match the number of formal parameters (unless defaults are declared). Type mismatches like B trigger an implicit conversion (often with a warning), but a wrong **count** is always a hard error.**

---

### Q29. Predict the output and choose the *reason*:
```cpp
int a = 100;          // global
void show() { cout << a << " "; }
int main() {
    int a = 5;        // local, shadows global
    show();
    cout << a;
}
```
- A) `100 5` — the function uses the global, `main` uses its local
- B) `5 5` — the local `a` overrides everywhere
- C) `100 100` — globals always win
- D) `5 100` — the function uses the most recent assignment

**Answer: A) Each function looks up names in **its own scope** first, then globals. `show()` has no local `a`, so it finds the global `100`. `main` has its own `a = 5`, which shadows the global *only inside `main`*.**

---

### Q30. Which is the **best style** when a function only reads its argument and never modifies it, and the argument is a small built-in type like `int`?
- A) Pass by value: `void f(int x)`
- B) Pass by reference: `void f(int& x)`
- C) Pass by const reference: `void f(const int& x)`
- D) Pass by pointer: `void f(int* x)`

**Answer: A) For small built-in types (`int`, `char`, `float`, `double`), pass-by-value is **simplest and equally fast** — the copy is essentially free. Const-reference is preferred for **large** objects (strings, structs, vectors) where copying is expensive.**

---

## Chapter 2: Advanced Function Concepts

### Q31. Which of the following best describes a **Type 1** function (no arguments, no return value)?
- A) Useful for printing a banner or menu
- B) Useful for computing a math result
- C) Useful for receiving user input and returning it
- D) Cannot exist — every function must return something

**Answer: A) A void function with no parameters is ideal for **side-effect-only** actions such as printing a fixed banner or menu. Its signature looks like `void greet();`.**

---

### Q32. Identify the type:
```cpp
void printSquare(int n) { cout << n*n; }
```
- A) Type 1: no args, no return
- B) Type 2: with args, no return
- C) Type 3: with args, with return
- D) Type 4: with return, no args

**Answer: B) The function receives an `int` argument but its return type is `void`. It performs an action (printing) without returning a value.**

---

### Q33. In the call `add(x, y)`, the names `x` and `y` are called the:
- A) Formal arguments
- B) Actual arguments
- C) Default arguments
- D) Reference arguments

**Answer: B) **Actual arguments** appear in the function call (the *actual* values passed). **Formal arguments** appear in the function definition's parameter list (placeholders that *receive* the values).**

---

### Q34. What must match between actual and formal arguments?
- A) The variable names
- B) Only the number of arguments
- C) The order, number, and type
- D) Only the data types

**Answer: C) The compiler matches arguments by **position**, so the order, number, and type must all be consistent. The names need not match — `add(x, y)` calling `int add(int a, int b)` works fine.**

---

### Q35. What is printed?
```cpp
int x = 10;                      // global
void modify() { x = x + 5; }
int main() {
    modify();
    modify();
    cout << x;
}
```
- A) `10`
- B) `15`
- C) `20`
- D) `30`

**Answer: C) Each call to `modify()` adds 5 to the global `x`. After two calls, `x = 10 + 5 + 5 = 20`.**

---

### Q36. A global variable in C++ is **automatically initialised to**:
- A) Garbage / undefined
- B) `0` (zero) for built-in numeric types
- C) `1` for integers, `0.0` for floats
- D) The value of the previous global with the same name

**Answer: B) Globals (and `static` locals) are zero-initialised by default. Only **non-static local** variables of built-in types start with garbage if not explicitly initialised.**

---

### Q37. Which line will cause a **compile error**?
```cpp
void f() { int k = 5; }
int main() {
    f();
    cout << k;          // line A
    return 0;
}
```
- A) `cout << k;` — `k` is local to `f` and is not visible in `main`
- B) `f();` — `f` cannot be called
- C) `int k = 5;` — `k` is not initialised
- D) None — the program prints `5`

**Answer: A) `k` is a local variable inside `f()`. It exists only during the execution of `f` and is **invisible** outside it. Trying to use `k` in `main` is a scope error.**

---

### Q38. Identify the **two essential components** every recursive function must have.
- A) A loop and a return
- B) A base case and a recursive case
- C) A global variable and a parameter
- D) A pointer and a reference

**Answer: B) A **base case** stops the recursion, and a **recursive case** moves the problem closer to the base case. Without a base case, recursion never stops and causes a stack overflow.**

---

### Q39. What does `factorial(0)` return for the standard recursive factorial below?
```cpp
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```
- A) `0`
- B) `1`
- C) Undefined
- D) Infinite loop

**Answer: B) The base case `n <= 1` covers both `n = 0` and `n = 1`, returning `1`. Mathematically, `0! = 1`.**

---

### Q40. What happens if you remove the base case from a recursive function?
- A) The function still works, just slower
- B) The compiler refuses to compile it
- C) The function calls itself indefinitely until a stack overflow
- D) It returns `0` automatically

**Answer: C) Without a base case, every call makes another call. The call stack grows until memory runs out — a **stack overflow** crash.**

---

### Q41. Trace `sum(3)` for:
```cpp
int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}
```
- A) `3`
- B) `5`
- C) `6`
- D) `7`

**Answer: C) `sum(3) = 3 + sum(2) = 3 + 2 + sum(1) = 3 + 2 + 1 + sum(0) = 3 + 2 + 1 + 0 = 6`.**

---

### Q42. Convert the recursive sum to **iteration**. Which body is correct?
```cpp
int sum(int n) {
    int total = 0;
    _________________________   // fill in
    return total;
}
```
- A) `for (int i = 1; i <= n; i++) total += i;`
- B) `for (int i = 0; i < n; i++) total += n;`
- C) `while (n--) total = n;`
- D) `for (int i = 1; i < n; i++) total = i;`

**Answer: A) Add each integer from 1 to `n` to the running total. Option B adds `n` to itself `n` times (giving `n*n`). Option C and D are buggy.**

---

### Q43. Which **single line** correctly implements a recursive `power(base, exp)` function?
```cpp
int power(int b, int e) {
    if (e == 0) return 1;
    return _________________;
}
```
- A) `b * power(b, e)`        *(infinite recursion)*
- B) `b * power(b, e - 1)`
- C) `b + power(b, e - 1)`
- D) `power(b - 1, e)`

**Answer: B) `b^e = b × b^(e-1)`, with base case `b^0 = 1`. Option A never reduces `e`, so it never reaches the base case.**

---

### Q44. What is the maximum recursion depth (number of simultaneously active stack frames) when computing `factorial(5)` with the standard `if (n <= 1) return 1;` base case?
- A) 1
- B) 5
- C) 6
- D) 25

**Answer: B) Active frames at the deepest point: `factorial(5)`, `factorial(4)`, `factorial(3)`, `factorial(2)`, `factorial(1)` — five frames. `factorial(1)` hits the base case and returns immediately without spawning another call.**

---

### Q45. Why is iteration usually preferred over recursion for **simple sequential** tasks?
- A) Iteration is more readable for repetition without recursive structure
- B) Iteration cannot be implemented in C++
- C) Recursion always crashes on inputs above 10
- D) Compilers do not support recursion

**Answer: A) Loops avoid the per-call stack overhead and are more idiomatic for problems that lack a natural recursive structure (like adding 1..n). Recursion shines for problems with a self-similar shape (trees, divide-and-conquer).**

---

### Q46. What is the output of:
```cpp
int x = 1;                 // global
void f() { int x = 2; cout << x << " "; }
void g() { x = 3; cout << x << " "; }
int main() { f(); g(); cout << x; }
```
- A) `2 3 3`
- B) `1 1 1`
- C) `2 3 1`
- D) `1 3 3`

**Answer: A) Inside `f`, the local `x = 2` shadows the global, so `f` prints `2`. `g` has no local `x`, so it modifies the **global** `x` to `3` and prints `3`. `main` then prints the global, which is now `3`.**

---

### Q47. Which is a **safer alternative** to a global variable for sharing data between two functions?
- A) Pass it explicitly as a parameter and/or return value
- B) Re-declare it in each function as `extern`
- C) Use the same name in both functions to make it global automatically
- D) Make it a `#define`

**Answer: A) Passing data through parameters and return values keeps each function **self-contained**, easier to test, and free of hidden coupling. Globals work but increase coupling and make bugs harder to track.**

---

### Q48. Predict the output:
```cpp
int counter = 0;
void inc() { counter++; }
int main() {
    for (int i = 0; i < 4; i++) inc();
    cout << counter;
}
```
- A) `0`
- B) `1`
- C) `4`
- D) `5`

**Answer: C) Every call to `inc()` increases the global `counter` by 1. The loop runs 4 times → final value `4`.**

---

### Q49. What is **wrong** with this recursive factorial?
```cpp
int fact(int n) {
    return n * fact(n - 1);
}
```
- A) Missing base case — infinite recursion
- B) Wrong return type
- C) `n - 1` should be `n + 1`
- D) Nothing is wrong

**Answer: A) There is no `if` statement to stop the recursion. Every call spawns another call → stack overflow. Add `if (n <= 1) return 1;` at the top.**

---

### Q50. The Fibonacci sequence is `0, 1, 1, 2, 3, 5, 8, ...` Which recursive definition matches `fib(n)` for this sequence?
- A) `fib(n) = fib(n-1) + fib(n+1)`
- B) `fib(n) = fib(n-1) * fib(n-2)`
- C) `fib(0) = 0; fib(1) = 1; fib(n) = fib(n-1) + fib(n-2)` for `n >= 2`
- D) `fib(n) = n + fib(n-1)`

**Answer: C) Two base cases (`fib(0) = 0`, `fib(1) = 1`) and the recurrence `fib(n) = fib(n-1) + fib(n-2)` for `n >= 2`.**

---

### Q51. Predict the output:
```cpp
int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}
int main() { cout << fib(6); }
```
- A) `5`
- B) `6`
- C) `8`
- D) `13`

**Answer: C) `fib(6)` evaluates to `8`. Sequence: `0,1,1,2,3,5,8` — the 7th term (index 6) is `8`.**

---

### Q52. Which function is the more efficient way to compute `n!` for **large `n`**, given that recursion uses O(n) extra stack space?
- A) The recursive version
- B) The iterative version using a `for` loop
- C) Both have identical performance
- D) Recursion is always faster

**Answer: B) The iterative version uses O(1) extra space (a single accumulator) regardless of `n`. Recursion uses O(n) stack space, risking overflow for huge `n`.**

---

### Q53. In the function `int average(int x, int y)` called as `average(p, q)`:
- A) `x` and `y` are actual arguments; `p` and `q` are formal arguments
- B) `p` and `q` are actual arguments; `x` and `y` are formal arguments
- C) Both pairs are formal arguments
- D) `p`, `q`, `x`, `y` are all references to the same variables

**Answer: B) Definitions hold **formal** parameters; calls supply **actual** arguments. Mnemonic: *Formal = in the Function (definition); Actual = at the call*.**

---

### Q54. What is a key difference between **local** and **global** variables?
- A) Local variables persist across function calls; globals do not
- B) Locals exist only during their block's execution; globals last for the whole program
- C) Locals are automatically zero-initialised; globals are not
- D) There is no real difference

**Answer: B) Locals live on the stack for the duration of their block; globals live in the data segment for the lifetime of the program. Default-initialisation is the reverse of (C): **globals** are zero-initialised, **locals** are not.**

---

### Q55. Choose the **best signature** for a function that returns whether a year is a leap year.
- A) `void leapYear(int year)`
- B) `int leapYear(int year)`
- C) `bool isLeapYear(int year)`
- D) `string leapYear(int year)`

**Answer: C) Returning `bool` makes the function self-documenting and works directly with `if`. The `is...` naming convention also makes the call site read like English: `if (isLeapYear(2024)) ...`.**

---

### Q56. Complete the body of `bool isLeapYear(int y)`:
- A) `return y % 4 == 0;`
- B) `return (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);`
- C) `return y % 100 == 0;`
- D) `return y % 400 == 0;`

**Answer: B) The Gregorian rule: divisible by 4 but **not** by 100, **unless** also divisible by 400. Examples: 2000 (leap), 1900 (not leap), 2024 (leap), 2100 (not leap).**

---

### Q57. Trace the call `mystery(4)`:
```cpp
int mystery(int n) {
    if (n == 0) return 0;
    return 2 + mystery(n - 1);
}
```
- A) `4`
- B) `6`
- C) `8`
- D) `10`

**Answer: C) Each call adds `2` and reduces `n` by 1 until `n == 0` returns 0. Total `2 + 2 + 2 + 2 + 0 = 8`. (This computes `2n`.)**

---

### Q58. Identify the bug in the recursive sum below:
```cpp
int sum(int n) {
    if (n == 1) return 1;
    return n + sum(n - 1);
}
```
- A) For `n = 0`, `sum(0)` recurses to `sum(-1)`, `sum(-2)`, … forever
- B) The return type should be `void`
- C) `n + sum(n - 1)` should be `n - sum(n - 1)`
- D) Nothing is wrong

**Answer: A) The base case only fires at `n == 1`. For `n = 0` (or any negative input), the recursion never stops. A safer base case is `if (n <= 0) return 0;`.**

---

### Q59. Predict the output:
```cpp
int x = 10;
void inc() { x = x * 2; }
int main() {
    inc(); inc(); inc();
    cout << x;
}
```
- A) `10`
- B) `30`
- C) `60`
- D) `80`

**Answer: D) Each call doubles `x`. Starting from 10: → 20 → 40 → **80**.**

---

### Q60. Which mathematical series does the chapter's `series` example approximate?
- A) `e^x`
- B) `cos(x)`
- C) `sin(x)`
- D) `ln(1 + x)`

**Answer: C) The series `x − x³/3! + x⁵/5! − x⁷/7! + …` is the Taylor expansion of **sin(x)**. The chapter verifies the result by comparing against `sin(x)` from `<cmath>`.**

---

## Chapter 3: One-Dimensional Arrays

### Q61. What is an array, in one sentence?
- A) A pointer to a single value of any type
- B) A collection of *different* data types stored in contiguous memory
- C) A consecutive group of *homogeneous* memory locations sharing one name
- D) An object with named members accessed by the dot operator

**Answer: C) Arrays are contiguous, fixed-size, homogeneous (same type for every element). Heterogeneous types belong to a `struct`; named-member access is also a struct feature.**

---

### Q62. What is the value of `arr[3]` after `int arr[6] = {10, 20, 30};`?
- A) `30`
- B) `0`
- C) Garbage
- D) Compile error

**Answer: B) When fewer initialisers are given than the declared size, the **remaining elements are zero-initialised**. So `arr` = `{10, 20, 30, 0, 0, 0}`.**

---

### Q63. The shortcut `int arr[100] = {0};` initialises:
- A) Only the first element to 0; the rest are garbage
- B) All elements to 0
- C) Only the last element to 0
- D) All elements to 100

**Answer: B) The first element is explicitly `0`, and the partial-initialisation rule sets every other element to `0` as well.**

---

### Q64. What is the index of the **last** element of `int arr[10];`?
- A) `10`
- B) `9`
- C) `11`
- D) `0`

**Answer: B) Indices run from `0` to `size − 1`. For a size-10 array, valid indices are `0..9`.**

---

### Q65. What happens when you read or write `arr[10]` in a 10-element array?
- A) Compile error — array index out of range
- B) Runtime exception is thrown
- C) Undefined behaviour: anything from garbage to a crash to silent memory corruption
- D) Returns `0` automatically

**Answer: C) C++ does **no bounds checking** on raw arrays. Out-of-range access is undefined behaviour and may corrupt nearby memory or crash unpredictably.**

---

### Q66. Predict the output:
```cpp
int a[] = {3, 1, 4, 1, 5, 9, 2, 6};
int sum = 0;
for (int i = 0; i < 8; i++) sum += a[i];
cout << sum;
```
- A) `30`
- B) `31`
- C) `34`
- D) `0`

**Answer: B) `3+1+4+1+5+9+2+6 = 31`.**

---

### Q67. Complete the body that finds the **maximum** element of `int a[N]`:
```cpp
int maxVal = a[0];
for (int i = 1; i < N; i++)
    ____________________;
```
- A) `if (a[i] < maxVal) maxVal = a[i];`
- B) `if (a[i] > maxVal) maxVal = a[i];`
- C) `maxVal = a[i];`
- D) `maxVal++;`

**Answer: B) Replace `maxVal` whenever a **larger** element appears. Option A would compute the *minimum*. Option C just stores the last element.**

---

### Q68. Predict the output:
```cpp
int a[5] = {2, 4, 6, 8, 10};
for (int i = 4; i >= 0; i--) cout << a[i] << " ";
```
- A) `2 4 6 8 10`
- B) `10 8 6 4 2`
- C) `10 10 10 10 10`
- D) Crash (negative index)

**Answer: B) The loop walks the array backwards from index 4 to 0, printing the elements in reverse order. The loop stops when `i` becomes `-1` because `-1 >= 0` is false.**

---

### Q69. Which line correctly counts how many elements equal `target`?
```cpp
int count = 0;
for (int i = 0; i < N; i++) {
    _____________________
}
```
- A) `count++;`
- B) `if (a[i] == target) count++;`
- C) `if (a[i] = target) count++;`
- D) `count += a[i];`

**Answer: B) Increment only when the element matches. Option C uses `=` (assignment), which silently overwrites and is almost certainly a bug.**

---

### Q70. The `search` function on page 28 of the chapter returns:
- A) The element that matches `x`
- B) The **index** of `x`, or `-1` if not found
- C) The number of times `x` appears
- D) `true` or `false`

**Answer: B) Linear search returns the position (index) of the first occurrence, or `-1` (a sentinel value) when the target is missing.**

---

### Q71. What does the linear-search algorithm have **time complexity**?
- A) O(1)
- B) O(log n)
- C) O(n)
- D) O(n²)

**Answer: C) In the worst case, every element is examined → O(n). Binary search achieves O(log n) but only on **sorted** arrays.**

---

### Q72. What is the bug?
```cpp
int a[5];
for (int i = 1; i <= 5; i++) cin >> a[i];
```
- A) The loop reads `a[1]..a[5]`, but valid indices are `0..4`. `a[0]` is skipped and `a[5]` is out of bounds.
- B) `cin >>` cannot read into array elements
- C) The array must be initialised first
- D) Nothing is wrong

**Answer: A) Off-by-one error — a classic. The correct loop is `for (int i = 0; i < 5; i++)`.**

---

### Q73. What is printed?
```cpp
int a[] = {1, 2, 3, 4, 5};
cout << a[a[0] + a[1]];
```
- A) `3`
- B) `4`
- C) `5`
- D) `Compile error`

**Answer: B) `a[0]+a[1] = 1+2 = 3`, so we print `a[3]` which is `4`.**

---

### Q74. Which of the following is a **valid** array declaration in standard C++?
- A) `int n; int a[n];`           *(VLA — non-standard)*
- B) `int a[];`                    *(no initialiser, no size)*
- C) `int a[5] = {1, 2};`
- D) `int a(5);`

**Answer: C) The size must be a compile-time constant (or deducible from an initialiser list). Variable-length arrays (A) are a GCC extension, not standard C++. (B) is illegal because the compiler cannot determine the size.**

---

### Q75. Two arrays where parallel index positions correspond to a single conceptual record (e.g., `name[i]` and `age[i]`) are called:
- A) Parallel arrays
- B) Mirror arrays
- C) Diagonal arrays
- D) Linked arrays

**Answer: A) **Parallel arrays** are a simple way to associate multiple attributes per record before learning structures.**

---

### Q76. What does the program print?
```cpp
int a[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) a[i] *= 2;
for (int i = 0; i < 5; i++) cout << a[i] << " ";
```
- A) `1 2 3 4 5`
- B) `2 4 6 8 10`
- C) `2 2 2 2 2`
- D) `0 0 0 0 0`

**Answer: B) The first loop doubles every element. The second prints the result.**

---

### Q77. Complete the body of `int sum(int a[], int n)`:
- A) `for (int i = 0; i <= n; i++) s += a[i]; return s;`
- B) `for (int i = 0; i < n; i++) s += a[i]; return s;`        *(with `int s = 0;` first)*
- C) `for (int i = 1; i < n; i++) s += a[i]; return s;`
- D) `return a[0] + a[n];`

**Answer: B) Iterate over `0..n−1`, accumulating into `s`. (A) would read `a[n]` (out of bounds). (C) skips `a[0]`. (D) only sums two elements.**

---

### Q78. Why does the function below behave as if **the array were passed by reference**, even though it looks like an ordinary parameter?
```cpp
void zeroOut(int a[], int n) { for (int i = 0; i < n; i++) a[i] = 0; }
```
- A) C++ secretly clones the array
- B) Array names decay to **pointers** when passed to a function — the function operates on the original memory
- C) Functions cannot modify their parameters at all
- D) The compiler always passes by reference

**Answer: B) When you pass an array, C++ passes a **pointer to its first element**. Modifying `a[i]` inside the function modifies the original array.**

---

### Q79. Inside `void f(int a[])`, what does `sizeof(a)` return?
- A) The number of elements in the array
- B) The total bytes occupied by the array
- C) The size of a **pointer** (typically 4 or 8 bytes), not the array
- D) Always `1`

**Answer: C) Inside the function, `a` is a pointer, so `sizeof(a)` gives the pointer's size, not the array's. To know the array length, **pass it as a separate parameter** (`int n`).**

---

### Q80. Predict the output:
```cpp
int a[] = {5, 3, 8, 1, 9, 2};
int n = sizeof(a) / sizeof(a[0]);
cout << n;
```
- A) `5`
- B) `6`
- C) `24`
- D) `48`

**Answer: B) `sizeof(a)` is the total bytes (`6 * sizeof(int) = 24`), and `sizeof(a[0])` is the size of one element (`4`). So `n = 24/4 = 6`. *Note: this trick only works in the **same scope** where the array is declared, not inside a function that received it.***

---

### Q81. Implement a one-line **swap of two array elements**:
- A) `a[i] = a[j];`
- B) `int t = a[i]; a[i] = a[j]; a[j] = t;`        *(three statements, not one)*
- C) `swap(a[i], a[j]);`        *(from `<algorithm>`)*
- D) `a[i] + a[j] = a[j] + a[i];`

**Answer: C) The standard library's `std::swap(a[i], a[j])` is the cleanest one-liner. Option B is the manual three-line approach. Option A overwrites and loses data.**

---

### Q82. Which describes the result of `int a[5] = {1, 2};`?
- A) `{1, 2, 1, 2, 1}`
- B) `{1, 2, 0, 0, 0}`
- C) `{1, 2}` and the rest are uninitialised
- D) Compile error

**Answer: B) The first two elements take the listed values; the remaining elements are zero-initialised.**

---

### Q83. What does the program print?
```cpp
int a[5] = {1, 2, 3, 4, 5};
int b[5];
for (int i = 0; i < 5; i++) b[i] = a[4 - i];
for (int i = 0; i < 5; i++) cout << b[i] << " ";
```
- A) `1 2 3 4 5`
- B) `5 5 5 5 5`
- C) `5 4 3 2 1`
- D) `1 1 1 1 1`

**Answer: C) `b[i]` receives `a[4 - i]` — the array is copied **in reverse**.**

---

### Q84. Complete the body that splits `arr[N]` into `even[]` and `odd[]`:
```cpp
int evenCount = 0, oddCount = 0;
for (int i = 0; i < N; i++) {
    if (arr[i] % 2 == 0) ____________
    else                 ____________
}
```
- A) `even[i] = arr[i]; ` and `odd[i] = arr[i];`
- B) `even[evenCount++] = arr[i];` and `odd[oddCount++] = arr[i];`
- C) `even[evenCount] = arr[i];` and `odd[oddCount] = arr[i];`        *(no counter increment)*
- D) `even[N] = arr[i];` and `odd[N] = arr[i];`

**Answer: B) Use a separate counter for each output array, and **increment** it after each insertion. Option C overwrites position 0 every iteration. Option A uses the source index (could leave gaps).**

---

### Q85. Predict the output:
```cpp
int a[] = {7, 2, 9, 4, 1};
int min = a[0];
int idx = 0;
for (int i = 1; i < 5; i++)
    if (a[i] < min) { min = a[i]; idx = i; }
cout << min << " " << idx;
```
- A) `1 4`
- B) `7 0`
- C) `1 1`
- D) `9 2`

**Answer: A) Walks the array; the smallest value is `1` at index `4`. (Tracking the **index** as well as the value is a useful pattern.)**

---

### Q86. Which is the cleanest way to **reverse an array in place** with `n` elements?
- A) Copy to a new array, then back, in reverse
- B) Swap `a[i]` with `a[n-1-i]` for `i = 0..n/2-1`
- C) Sort the array in descending order
- D) Use `a[-i]`

**Answer: B) Swap symmetric pairs. Only `n/2` swaps are needed. (C) is wrong because reverse ≠ sorted unless the array is already sorted.**

---

### Q87. What does this print? (Trace carefully.)
```cpp
int a[] = {4, 8, 15, 16, 23, 42};
for (int i = 0; i < 6; i++)
    if (a[i] % 2 == 1) cout << a[i] << " ";
```
- A) `4 8 16 42`
- B) `15 23`
- C) `4 8 15 16 23 42`
- D) `nothing`

**Answer: B) Print only odd elements (`a[i] % 2 == 1`). The odd elements are `15` and `23`.**

---

### Q88. Suppose `int a[] = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};`. How many times does `5` appear?
- A) `1`
- B) `2`
- C) `3`
- D) `4`

**Answer: C) The value `5` appears at indices 4, 8, and 10 → three occurrences. (Counting occurrences is a one-liner with a `for` and an `if`.)**

---

### Q89. What is the issue with `int a[]` (no size, no initialiser)?
```cpp
int a[];
```
- A) The compiler defaults the size to 1
- B) The compiler reports an error: incomplete type / unknown size
- C) Undefined behaviour at runtime
- D) Allocates 0 bytes

**Answer: B) Without an initialiser the compiler cannot determine the array length, so the declaration is rejected.**

---

### Q90. The chapter's `search` function returns `-1` to indicate "not found". This is an example of:
- A) An error code returned through a special integer value (a **sentinel**)
- B) An exception
- C) A null pointer
- D) A reference parameter

**Answer: A) Returning a value that cannot be a valid result (here, `-1`, since indices are non-negative) is a classic C-style way to signal failure. Modern alternatives include exceptions and `std::optional`.**

---

## Chapter 4: Two-Dimensional Arrays

### Q91. How many elements does `int m[3][4]` contain?
- A) 7
- B) 12
- C) 24
- D) 16

**Answer: B) `rows * cols = 3 * 4 = 12`. Total bytes are `12 * sizeof(int)` (typically 48 bytes).**

---

### Q92. Which declaration is **invalid**?
- A) `int m[3][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};`
- B) `int m[][4] = {{1,2,3,4},{5,6,7,8}};`         *(rows deduced)*
- C) `int m[3][] = {{1,2,3},{4,5,6},{7,8,9}};`     *(columns omitted)*
- D) `int m[2][2] = {1, 2, 3, 4};`                  *(flat initialiser allowed)*

**Answer: C) The **column size cannot be omitted**. Only the row count can be deduced because the compiler must know how many elements are in each row to lay them out.**

---

### Q93. After `int m[2][3] = {{1,2,3},{4,5,6}};`, what is `m[1][2]`?
- A) `2`
- B) `3`
- C) `5`
- D) `6`

**Answer: D) Row index `1` (second row) and column index `2` (third column) → `6`.**

---

### Q94. In **row-major** memory layout, the element after `m[i][j]` in memory is:
- A) `m[i][j+1]`
- B) `m[i+1][j]`
- C) `m[i+1][j+1]`
- D) `m[i-1][j]`

**Answer: A) Row-major means an entire row is laid out before the next row begins, so consecutive memory addresses correspond to consecutive **column indices** in the same row.**

---

### Q95. Which loop pair correctly **reads** a 3 × 4 array `arr` from `cin`?
- A) `for (i=0;i<4;i++) for (j=0;j<3;j++) cin >> arr[i][j];`
- B) `for (i=0;i<3;i++) for (j=0;j<4;j++) cin >> arr[i][j];`
- C) `for (i=0;i<3;i++) cin >> arr[i];`
- D) `cin >> arr;`

**Answer: B) The outer loop iterates over rows (size 3) and the inner loop over columns (size 4). Option A swaps the bounds and goes out of range on the rows.**

---

### Q96. For an `n × n` matrix, the **main-diagonal** elements are those where:
- A) `i + j == n - 1`
- B) `i == j`
- C) `i > j`
- D) `i < j`

**Answer: B) Main diagonal: row index equals column index. The condition `i + j == n − 1` describes the *secondary* diagonal.**

---

### Q97. For a 4 × 4 matrix, which positions are on the **secondary diagonal**?
- A) `(0,0), (1,1), (2,2), (3,3)`
- B) `(0,3), (1,2), (2,1), (3,0)`
- C) `(0,0), (0,3), (3,0), (3,3)`
- D) `(0,1), (1,2), (2,3)`

**Answer: B) `i + j == 3` → indices `(0,3), (1,2), (2,1), (3,0)`. (A) is the main diagonal; (C) is the four corners.**

---

### Q98. Complete the line that **sums the main diagonal** of an `n × n` matrix `m`:
```cpp
int s = 0;
for (int i = 0; i < n; i++) ____________;
```
- A) `s += m[0][i]`
- B) `s += m[i][0]`
- C) `s += m[i][i]`
- D) `s += m[n-1-i][i]`

**Answer: C) Main diagonal: `m[i][i]`. Option A sums the first row. Option B sums the first column. Option D sums the secondary diagonal.**

---

### Q99. Complete the line that **sums the secondary diagonal**:
- A) `s += m[i][i];`
- B) `s += m[i][n - i];`
- C) `s += m[i][n - 1 - i];`
- D) `s += m[n - 1][i];`

**Answer: C) The column index for row `i` on the secondary diagonal is `n - 1 - i`. (B) overshoots by one.**

---

### Q100. For an `n × n` matrix, the elements **above the main diagonal** (the upper triangle) satisfy:
- A) `i < j`
- B) `i > j`
- C) `i == j`
- D) `i + j < n - 1`

**Answer: A) Upper triangle: row index is **less** than column index. Lower triangle: `i > j`.**

---

### Q101. Predict the output:
```cpp
int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
int s = 0;
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
        if (i == j) s += m[i][j];
cout << s;
```
- A) `9`
- B) `15`
- C) `21`
- D) `45`

**Answer: B) Main-diagonal sum: `1 + 5 + 9 = 15`.**

---

### Q102. Predict the output for the same matrix:
```cpp
int s = 0;
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
        if (i + j == 2) s += m[i][j];
cout << s;
```
- A) `9`
- B) `15`
- C) `21`
- D) `45`

**Answer: B) Secondary-diagonal sum for a 3 × 3: `m[0][2]+m[1][1]+m[2][0] = 3 + 5 + 7 = 15`. (For this magic-like matrix, both diagonals happen to sum to the same value.)**

---

### Q103. Complete the line that **flattens** a 2D array `m[R][C]` into a 1D array `flat[R*C]` in row-major order:
```cpp
for (int i = 0; i < R; i++)
    for (int j = 0; j < C; j++)
        flat[___________] = m[i][j];
```
- A) `i + j`
- B) `i * j`
- C) `i * C + j`
- D) `j * R + i`

**Answer: C) The element at row `i`, column `j` lands at index `i * C + j` in row-major flat layout. (D) would be column-major.**

---

### Q104. Predict the output:
```cpp
int m[2][3] = {{1,2,3},{4,5,6}};
int sum = 0;
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        sum += m[i][j];
cout << sum;
```
- A) `6`
- B) `15`
- C) `21`
- D) `36`

**Answer: C) `1+2+3+4+5+6 = 21`.**

---

### Q105. To compute the **sum of each column** of an `R × C` matrix, you should:
- A) Reset the accumulator inside the row loop
- B) Reset the accumulator inside the column loop, with the row loop on the inside
- C) Use a single loop over the diagonals
- D) Use one accumulator for the whole matrix

**Answer: B) For column sums, the **outer loop runs over columns** (`j`), the inner loop walks **down the rows** (`i`), and the accumulator resets at the start of each column.**

---

### Q106. What does this print?
```cpp
int a[2][2] = {{1,2},{3,4}}, b[2][2] = {{5,6},{7,8}}, c[2][2];
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 2; j++)
        c[i][j] = a[i][j] + b[i][j];
cout << c[1][1];
```
- A) `4`
- B) `8`
- C) `10`
- D) `12`

**Answer: D) `c[1][1] = a[1][1] + b[1][1] = 4 + 8 = 12`. (Element-wise addition.)**

---

### Q107. The chapter notes that for a matrix with an **odd** dimension, the centre element belongs to:
- A) Only the main diagonal
- B) Only the secondary diagonal
- C) **Both** diagonals
- D) Neither diagonal

**Answer: C) For a 3×3 matrix, position `(1,1)` satisfies `i == j` (main) and `i + j == n − 1 = 2` (secondary). To avoid double-counting in the combined sum, subtract that element once.**

---

### Q108. Replace every `5` in a 2D array with `0`. Which fragment is correct?
- A) `if (m[i][j] = 5) m[i][j] = 0;`
- B) `if (m[i][j] == 5) m[i][j] = 0;`
- C) `m[i][j] == 5 ? m[i][j] = 0;`
- D) `m[i][j] = 5; m[i][j] = 0;`

**Answer: B) Use `==` for comparison. (A) uses `=` (assignment), which sets the element to 5 and is non-zero (true), so the body always runs. (C) is malformed ternary syntax. (D) overwrites everything.**

---

### Q109. Which loop initialises an `n × n` matrix to the **identity matrix** (1s on the main diagonal, 0s elsewhere)?
- A) `for (i=0;i<n;i++) for (j=0;j<n;j++) m[i][j] = i + j;`
- B) `for (i=0;i<n;i++) for (j=0;j<n;j++) m[i][j] = (i == j) ? 1 : 0;`
- C) `for (i=0;i<n;i++) m[i][i] = 1;`
- D) `for (i=0;i<n;i++) for (j=0;j<n;j++) m[i][j] = 1;`

**Answer: B) For each cell, store `1` if on the main diagonal, otherwise `0`. (C) only sets the diagonal but doesn't zero out the rest, so the matrix is left full of garbage (or whatever it had before).**

---

### Q110. The most efficient way to set just the diagonal (assuming the matrix is already zero) is:
- A) Two nested loops with an `if`
- B) One loop: `for (int i = 0; i < n; i++) m[i][i] = 1;`
- C) Recursive function
- D) Switch statement

**Answer: B) A single linear loop visits exactly the `n` diagonal cells — O(n) instead of O(n²).**

---

### Q111. What does this print?
```cpp
int m[3][3] = {{1,0,0},{0,1,0},{0,0,1}};
int trace = 0;
for (int i = 0; i < 3; i++) trace += m[i][i];
cout << trace;
```
- A) `0`
- B) `1`
- C) `3`
- D) `9`

**Answer: C) The sum of the main diagonal of an identity matrix equals its dimension. This sum is called the **trace** of the matrix.**

---

### Q112. To **transpose** a matrix means to:
- A) Sort each row
- B) Swap rows with columns: `T[j][i] = m[i][j]`
- C) Negate every element
- D) Reverse every row

**Answer: B) The transpose flips a matrix over its main diagonal. A 2 × 3 matrix becomes 3 × 2.**

---

### Q113. Implement a transpose into `t[C][R]`:
```cpp
for (int i = 0; i < R; i++)
    for (int j = 0; j < C; j++)
        ____________ = ____________;
```
- A) `t[i][j] = m[j][i]`
- B) `t[j][i] = m[i][j]`
- C) `t[i][j] = m[i][j]`
- D) `t[j][i] = m[j][i]`

**Answer: B) Element at `(i,j)` in the original goes to `(j,i)` in the transpose.**

---

### Q114. What does this fragment compute?
```cpp
int n = 4, count = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        if (i > j) count++;
cout << count;
```
- A) The number of elements on the main diagonal
- B) The number of elements **strictly below** the main diagonal
- C) The total number of elements
- D) The number of elements on the secondary diagonal

**Answer: B) `i > j` defines the **strict lower triangle**. For a 4 × 4 matrix it has `n(n−1)/2 = 6` elements.**

---

### Q115. To read a 2D matrix declared as `int m[R][C]` and pass it to a function, the function must declare:
- A) `void f(int m[][C], int R)`        *(column size required)*
- B) `void f(int m[R][C])`               *(row size unnecessary)*
- C) `void f(int **m)`                    *(only for arrays of pointers)*
- D) `void f(int m[][])`                  *(both sizes optional)*

**Answer: A) When an array is passed, only the **leftmost** dimension can be omitted. The compiler needs the column count to compute the address `m[i][j] = base + i * C + j`.**

---

### Q116. Predict the output:
```cpp
int m[2][2] = {{1,2},{3,4}};
m[0][1] = m[1][0];
m[1][1] = m[0][0] + m[0][1];
cout << m[0][0] << m[0][1] << m[1][0] << m[1][1];
```
- A) `1234`
- B) `1334`
- C) `1234` then `4`
- D) `3344`

**Answer: B) Step 1: `m[0][1] = m[1][0] = 3` → `{{1,3},{3,4}}`. Step 2: `m[1][1] = 1 + 3 = 4` (no change). Print: `1 3 3 4` → `1334`.**

---

### Q117. To print a 3 × 3 matrix in **column-major** order (column by column), the loop nesting is:
- A) Rows outer, columns inner
- B) Columns outer, rows inner
- C) A single loop with index `i*3 + j`
- D) Either nesting works

**Answer: B) To visit cells column by column, put the column loop on the **outside** and step rows on the inside.**

---

### Q118. What is the result of multiplying a 2 × 3 matrix by a 3 × 4 matrix?
- A) A 2 × 4 matrix
- B) A 3 × 3 matrix
- C) A 4 × 2 matrix
- D) Multiplication is undefined

**Answer: A) For matrix product `A × B`, A's columns must equal B's rows. The result has A's rows and B's columns: 2 × 4.**

---

### Q119. The kernel line of standard 3-loop matrix multiply is:
```cpp
for (i ...) for (j ...) for (k ...)
    c[i][j] += ____________;
```
- A) `a[i][j] * b[i][j]`
- B) `a[i][k] * b[k][j]`
- C) `a[k][j] * b[i][k]`
- D) `a[i][k] + b[k][j]`

**Answer: B) The dot product of row `i` of A with column `j` of B accumulates into `c[i][j]`.**

---

### Q120. What's the bug?
```cpp
int m[3][3];
for (int i = 0; i <= 3; i++)        // <-- look here
    for (int j = 0; j < 3; j++)
        m[i][j] = 0;
```
- A) Off-by-one — `i` reaches `3`, so `m[3][j]` writes outside the array
- B) `j < 3` should be `j <= 3`
- C) Cannot assign 0 to an int
- D) The compiler will catch this

**Answer: A) `i <= 3` runs for `i = 0,1,2,3`. When `i = 3`, `m[3][j]` is out of bounds (valid rows are 0..2). C++ will not catch this; expect undefined behaviour.**

---

## Chapter 5: Strings in C++

### Q121. A C-style string is stored as:
- A) An array of characters terminated by `'\0'`
- B) A linked list of characters
- C) An object with a `length` member
- D) A pointer to a single character

**Answer: A) C-strings are arrays of `char` ending in the **null terminator** `'\0'`. The terminator tells library functions where the string ends.**

---

### Q122. The string literal `"ABCD"` occupies how many bytes (assuming `sizeof(char) == 1`)?
- A) 3
- B) 4
- C) 5
- D) 8

**Answer: C) Four visible characters plus one byte for the terminating `'\0'` → 5 bytes total.**

---

### Q123. Which declaration is **too small** to hold the string `"Mazin Alaa"`?
- A) `char s[10];`
- B) `char s[11];`
- C) `char s[12];`
- D) `char s[20];`

**Answer: A) `"Mazin Alaa"` has 10 visible characters, so the array must hold at least 11 chars (10 + null terminator). `char s[10]` would be one byte short.**

---

### Q124. What does `strlen("Hello")` return?
- A) `4`
- B) `5`
- C) `6`
- D) `0`

**Answer: B) `strlen` counts **visible** characters — it does **not** include the null terminator.**

---

### Q125. To read a sentence with spaces into `char s[100]`, you should use:
- A) `cin >> s;`
- B) `cin.getline(s, 100);`
- C) `gets(s);`        *(unsafe, removed from C++14)*
- D) `cin.read(s);`

**Answer: B) `>>` stops at whitespace, so it cannot read a full sentence. `cin.getline(s, 100)` reads up to 99 characters or until newline. `gets` is dangerous and removed.**

---

### Q126. Predict the output:
```cpp
char s[] = "Hello";
for (int i = 0; s[i] != '\0'; i++) cout << s[i];
```
- A) `Hello`
- B) `Hello\0`
- C) Compile error
- D) Infinite loop

**Answer: A) The loop walks character by character and stops when it finds `'\0'`, printing `Hello`. The terminator itself is not printed.**

---

### Q127. After `char a[10] = "abc";`, what does `strlen(a)` return and what does `sizeof(a)` return?
- A) Both `3`
- B) Both `10`
- C) `strlen(a) = 3`, `sizeof(a) = 10`
- D) `strlen(a) = 4`, `sizeof(a) = 10`

**Answer: C) `strlen` counts visible chars (3). `sizeof` is the **storage size** of the array (10 bytes), independent of contents.**

---

### Q128. Which header provides `strlen`, `strcpy`, `strcat`, `strcmp`?
- A) `<string>`
- B) `<cstring>` (or `<string.h>`)
- C) `<iostream>`
- D) `<cstdlib>`

**Answer: B) `<cstring>` is the C++ wrapper for the C `<string.h>`. `<string>` is for the **C++** `std::string` class.**

---

### Q129. After `char a[20] = "abcd"; char b[] = "1234"; strcat(a, b);`, what is `a`?
- A) `"abcd"`
- B) `"1234"`
- C) `"abcd1234"`
- D) `"1234abcd"`

**Answer: C) `strcat` **appends** the second argument to the first. The destination `a` must have enough room (here, 20 chars is plenty).**

---

### Q130. Why is the code below dangerous?
```cpp
char a[5] = "abcd";
char b[] = "1234";
strcat(a, b);
```
- A) `strcat` is deprecated in C++
- B) `a` only has room for `"abcd\0"`; appending `"1234"` writes past its end → **buffer overflow**
- C) Strings cannot be concatenated
- D) `a` and `b` must be the same size

**Answer: B) After concatenation, `a` would need to hold `"abcd1234\0"` = 9 bytes, but only 5 were allocated. The extra characters spill into adjacent memory — undefined behaviour, possibly a crash or security hole.**

---

### Q131. What does `strcmp(s1, s2)` return when the two strings are **equal**?
- A) `0`
- B) A positive integer
- C) A negative integer
- D) `1`

**Answer: A) Equal strings → `0`. Positive → `s1 > s2`, negative → `s1 < s2`. Comparison is lexicographic, character by character.**

---

### Q132. Predict the output:
```cpp
char a[] = "apple", b[] = "banana";
if (strcmp(a, b) < 0) cout << "before";
else cout << "not before";
```
- A) `before`
- B) `not before`
- C) Compile error
- D) `0`

**Answer: A) `'a' < 'b'`, so `apple` comes before `banana` lexicographically. `strcmp` returns negative, so the `if` body runs.**

---

### Q133. What's wrong?
```cpp
char a[20] = "Hello", b[20] = "World";
a = b;          // intend: assign b's content to a
```
- A) Array names are not assignable; use `strcpy(a, b);` instead
- B) `=` only works for `int`s
- C) The arrays must have the same size
- D) Nothing is wrong

**Answer: A) C-style arrays cannot be assigned with `=`. Use `strcpy(a, b)` or `std::string`.**

---

### Q134. Which converts `"123"` to the integer `123`?
- A) `atoi("123")`
- B) `strlen("123")`
- C) `strcat("123", "")`
- D) `cout << "123"`

**Answer: A) `atoi` (ASCII to int) parses a numeric string. (B) returns 3 (length). Modern alternative: `std::stoi("123")`.**

---

### Q135. Which converts `"3.14"` to a `double`?
- A) `atoi("3.14")`         *(returns 3, the integer part)*
- B) `atof("3.14")`
- C) `strlen("3.14")`
- D) `strcat("3", ".14")`

**Answer: B) `atof` (ASCII to floating-point) parses a decimal string into a `double`. Modern alternative: `std::stod`.**

---

### Q136. Why might `itoa` not compile on your machine?
- A) `itoa` is **non-standard** — it's a compiler extension (Borland/MSVC)
- B) `itoa` only works on negative numbers
- C) `itoa` requires `<iostream>`
- D) `itoa` was renamed to `int_to_array`

**Answer: A) `itoa` is **not** part of the C or C++ standard. Use `sprintf(buf, "%d", n)` or `std::to_string(n)` (C++11) for portability.**

---

### Q137. Predict the output:
```cpp
char s[] = "abc";
s[1] = 'X';
cout << s;
```
- A) `abc`
- B) `aXc`
- C) `Xbc`
- D) Compile error

**Answer: B) Strings declared as `char[]` are mutable: replacing index 1 (`'b'`) with `'X'` yields `"aXc"`. Note: a `const char* p = "abc"` literal is **not** writable.**

---

### Q138. Convert all characters of `char s[100]` to **uppercase** in one line. Which is correct?
- A) `for (int i = 0; s[i] != '\0'; i++) s[i] = toupper(s[i]);`
- B) `s = toupper(s);`
- C) `toupper(s);`
- D) `cout << toupper(s);`

**Answer: A) `toupper` operates on a single `char`. Loop through the string until `'\0'`. (B) and (C) and (D) treat the array as a single value, which doesn't work.**

---

### Q139. After `char buf[10]; for (int i=0;i<5;i++) buf[i] = 'A' + i;`, calling `cout << buf;` may print:
- A) Always `ABCDE`
- B) `ABCDE` followed by **garbage**, until a `'\0'` happens to appear
- C) `ABCDEFGHIJ`
- D) Nothing (empty)

**Answer: B) The loop fills 5 characters but **never appends `'\0'`**. `cout << buf;` keeps printing past index 4 until it encounters a zero byte. Always terminate manually: `buf[5] = '\0';`.**

---

### Q140. Which one-line snippet **correctly** copies `src` into `dst` *and* appends a null terminator?
- A) `dst = src;`
- B) `for (int i = 0; src[i]; i++) dst[i] = src[i];`        *(forgets the `'\0'`)*
- C) `strcpy(dst, src);`
- D) `dst[0] = src[0];`

**Answer: C) `strcpy` copies up to and **including** the `'\0'`. Option B copies the visible chars but stops before the terminator, leaving `dst` un-terminated.**

---

### Q141. Predict the output:
```cpp
char s[] = "Programming";
cout << strlen(s) << " " << sizeof(s);
```
- A) `11 11`
- B) `11 12`
- C) `12 12`
- D) `10 11`

**Answer: B) `strlen` ignores `'\0'` → 11 visible chars. `sizeof(s)` includes the terminator → 12 bytes.**

---

### Q142. The character `'\0'` has ASCII value:
- A) `'0'` (which is 48)
- B) `0`
- C) `1`
- D) `255`

**Answer: B) `'\0'` is the **null** character — ASCII value `0`. Don't confuse it with the digit `'0'` (ASCII 48).**

---

### Q143. Implement `bool isEmpty(char *s)` that returns whether the string has length 0.
- A) `return s == nullptr;`
- B) `return s[0] == '\0';`
- C) `return strlen(s) == 1;`
- D) `return s == "";`

**Answer: B) An empty C-string starts with `'\0'`. (A) checks for a null pointer (different concept). (C) checks for length 1. (D) compares pointers, not contents.**

---

### Q144. Reverse a C-string in place, given its length `n`. Which fragment works?
- A) `for (int i = 0; i < n; i++) swap(s[i], s[n - 1 - i]);`        *(swaps twice — no net change)*
- B) `for (int i = 0; i < n / 2; i++) swap(s[i], s[n - 1 - i]);`
- C) `for (int i = 0; i < n; i++) s[i] = s[n - i];`
- D) `for (int i = n; i >= 0; i--) s[i] = s[i + 1];`

**Answer: B) Swap symmetric pairs only **half** the length, otherwise each swap is undone. (A) restores the original. (C) and (D) don't reverse correctly and may go out of bounds.**

---

### Q145. Predict the output:
```cpp
char a[] = "abc", b[] = "abcd";
cout << (strcmp(a, b) < 0 ? "shorter" : "not");
```
- A) `shorter`
- B) `not`
- C) `0`
- D) Garbage

**Answer: A) After comparing the common prefix "abc" equally, `a` ends (`'\0'`) while `b` has another character. `'\0' < 'd'`, so `a` is "less than" `b`. The conditional prints `shorter`.**

---

### Q146. Which sentence about `cin.ignore(80, '\n');` is true?
- A) It deletes the next 80 lines of input
- B) It discards up to 80 characters or until a newline, whichever comes first
- C) It always discards exactly 80 characters
- D) It writes 80 newlines to `cout`

**Answer: B) `ignore` is the standard way to flush leftover input (typically the newline left after `cin >> n`) before a `getline` call.**

---

### Q147. The expression `cout.put('A');` is equivalent to:
- A) `cout << 'A';`
- B) `cout << "A";`
- C) Both A and B
- D) None of the above

**Answer: C) `cout.put(c)` writes a single character — same effect as either `<<`-based form for a single character.**

---

### Q148. Why is `std::string` (from `<string>`) usually preferred over C-style strings in modern C++?
- A) It manages its own memory, supports `+`, `==`, and dynamic resizing
- B) It is faster on every operation
- C) C-style strings are illegal in C++
- D) `std::string` is required by the compiler

**Answer: A) `std::string` removes manual size and `'\0'` management, supports natural operators, and grows automatically — eliminating an entire class of buffer-overflow bugs.**

---

### Q149. Predict the output:
```cpp
char s[] = "Hello";
int count = 0;
for (int i = 0; s[i] != '\0'; i++)
    if (s[i] == 'l') count++;
cout << count;
```
- A) `0`
- B) `1`
- C) `2`
- D) `3`

**Answer: C) The letter `l` appears twice in `"Hello"`.**

---

### Q150. What does the program print?
```cpp
char s[20] = "Hello";
strcat(s, " World");
cout << strlen(s);
```
- A) `5`
- B) `6`
- C) `11`
- D) `12`

**Answer: C) After concatenation: `"Hello World"` → 11 visible characters (5 + 1 space + 5).**

---

## Chapter 6: Structures

### Q151. What is a `struct` in C++?
- A) A grouping of named members of (possibly) **different** data types
- B) A fixed-size array of one type
- C) A function that returns multiple values
- D) A pointer to an object

**Answer: A) A `struct` bundles related data of varying types under one name. Arrays bundle items of the **same** type.**

---

### Q152. The closing brace of a `struct` definition is followed by:
- A) Nothing
- B) A semicolon (`;`)
- C) A comma (`,`)
- D) A colon (`:`)

**Answer: B) `struct Name { ... };` — forgetting the semicolon is one of the most common compile errors.**

---

### Q153. Which is the correct way to access the `age` member of a `Student s;`?
- A) `s->age`
- B) `s.age`
- C) `s::age`
- D) `s[age]`

**Answer: B) The **dot operator** is used on struct *variables*. The arrow `->` is for **pointers** to structs (`Student* p; p->age;`).**

---

### Q154. Given:
```cpp
struct Point { int x, y; };
Point p = {3, 4};
```
What is `p.x + p.y`?
- A) `0`
- B) `3`
- C) `4`
- D) `7`

**Answer: D) Brace initialisation assigns `x = 3`, `y = 4` in declaration order. Sum = 7.**

---

### Q155. Which line is invalid?
```cpp
struct Point { int x, y; };
Point a = {1, 2};
Point b = a;          // line 1
b.x = 10;             // line 2
a = b;                 // line 3
a.x + b.x;             // line 4
```
- A) line 1
- B) line 2
- C) line 3
- D) line 4 — actually all four are valid

**Answer: D) Structs **can** be copied member-wise with `=` (unlike C-style arrays). All four lines compile and behave intuitively.**

---

### Q156. Which is **not** a valid way to declare a struct variable?
- A) `struct Data { int x; }; Data d;`
- B) `struct Data { int x; } d;`
- C) `typedef struct { int x; } Data; Data d;`
- D) `Data d; struct Data { int x; };`

**Answer: D) The struct must be **defined before** any variable of that type is declared.**

---

### Q157. With nested structures
```cpp
struct Distance { int feet; float inches; };
struct Room { Distance length, width; };
Room r;
```
how do you set the length's inches?
- A) `r.length.inches = 6.5;`
- B) `r.inches = 6.5;`
- C) `r->length->inches = 6.5;`
- D) `r[length][inches] = 6.5;`

**Answer: A) Chain dot operators to descend into nested structs.**

---

### Q158. Predict the output:
```cpp
struct P { int a, b; };
P x = {2, 5};
P y = x;
y.a = 99;
cout << x.a << " " << y.a;
```
- A) `99 99`
- B) `2 99`
- C) `2 2`
- D) `99 2`

**Answer: B) `P y = x;` performs a **copy**, so `y` is independent. Modifying `y.a` does not affect `x.a`.**

---

### Q159. What is the size of `struct S { char c; int i; };` on a typical 64-bit system?
- A) 5 bytes
- B) 8 bytes (includes padding for alignment)
- C) 4 bytes
- D) 1 byte

**Answer: B) The compiler adds **padding** between `char c` and `int i` so that `int i` starts on a 4-byte boundary. Total: 1 + 3 padding + 4 = **8** bytes.**

---

### Q160. Which is true of an **array of structures** like `Student arr[10];`?
- A) All 10 elements share the same members' memory
- B) Each element is a complete struct with its own copies of all members
- C) The members must all be of the same primitive type
- D) Cannot iterate with a `for` loop

**Answer: B) An array of structs is just an array — each cell is a full struct. Access: `arr[i].member`.**

---

### Q161. Predict the output:
```cpp
struct E { int code; const char* msg; };
E errs[] = {{1,"OK"},{2,"NotFound"},{3,"Forbidden"}};
cout << errs[1].msg;
```
- A) `OK`
- B) `NotFound`
- C) `Forbidden`
- D) `2`

**Answer: B) Index 1 is the second struct, whose `msg` is `"NotFound"`.**

---

### Q162. Which is the typedef syntax that lets you write `Student s;` instead of `struct Student s;`?
- A) `typedef struct { int age; } Student;`
- B) `typedef Student struct { int age; };`
- C) `typedef int Student;`
- D) `class Student { int age; };`

**Answer: A) `typedef struct { ... } Alias;` creates an alias. (Note: in **C++**, simply writing `struct Student { int age; };` already lets you write `Student s;` — `typedef` is mostly a C carry-over.)**

---

### Q163. To pass a struct **without copying it** so the function can modify it, declare:
- A) `void f(Student s)`            *(by value — copies)*
- B) `void f(Student& s)`            *(by reference — no copy, modifies caller)*
- C) `void f(Student* s)`            *(by pointer — also no copy)*
- D) Both B and C

**Answer: D) Reference and pointer parameters both avoid copying and allow modification. Reference is more idiomatic in modern C++; pointer is necessary when the argument can be `nullptr`.**

---

### Q164. To accept a struct without copying but **prevent modification**, use:
- A) `void f(Student s)`
- B) `void f(const Student& s)`
- C) `void f(Student& s)`
- D) `void f(Student* s)`

**Answer: B) `const Student&` gives the speed of pass-by-reference and the safety of read-only access. This is the standard C++ idiom for large read-only inputs.**

---

### Q165. Through a pointer, struct members are accessed using:
- A) `.`
- B) `->`
- C) `::`
- D) `*`

**Answer: B) `p->member` is shorthand for `(*p).member`.**

---

### Q166. Predict the output:
```cpp
struct V { int x, y, z; };
V v{1, 2, 3};
V* p = &v;
cout << p->y;
```
- A) `1`
- B) `2`
- C) `3`
- D) Garbage

**Answer: B) `p->y` is the second member, `2`.**

---

### Q167. After
```cpp
struct C { int n; };
C arr[3];
for (int i = 0; i < 3; i++) arr[i].n = i * 10;
```
what does `arr[2].n` equal?
- A) `0`
- B) `10`
- C) `20`
- D) `30`

**Answer: C) `arr[i].n = i * 10` → `arr[0].n = 0`, `arr[1].n = 10`, `arr[2].n = 20`.**

---

### Q168. A struct containing a `char name[30];` member uses how many bytes for the name field?
- A) 30 always (regardless of the actual string length)
- B) The length of the stored string + 1
- C) 4 bytes (just a pointer)
- D) 0 bytes if the name is empty

**Answer: A) Storage is fixed by the array declaration. `strlen(s.name)` may be small, but the struct still reserves all 30 bytes.**

---

### Q169. The struct below is intended to model a 2D point. Which constructor-style initialisation works in C++11+?
```cpp
struct Point { double x, y; };
```
- A) `Point p = (1.5, 2.5);`        *(comma operator — wrong)*
- B) `Point p{1.5, 2.5};`             *(brace init — correct)*
- C) `Point p[1.5, 2.5];`              *(array syntax — wrong)*
- D) `Point p = 1.5, 2.5;`             *(assignment list — wrong)*

**Answer: B) Aggregate initialisation with braces sets each member in declaration order.**

---

### Q170. Which is the **biggest difference** between `struct` and `class` in C++?
- A) `struct` cannot have member functions, but `class` can
- B) Default access in `struct` is **public**; default in `class` is **private**
- C) `struct` cannot inherit, but `class` can
- D) There is no difference at all

**Answer: B) Both can have members and methods. The only real difference is the **default access specifier** and default inheritance access. Convention: use `struct` for plain data aggregates and `class` for objects with invariants.**

---

### Q171. Predict the output:
```cpp
struct Box { int w, h; };
int area(Box b) { return b.w * b.h; }
int main() {
    Box b{3, 4};
    cout << area(b);
}
```
- A) `7`
- B) `12`
- C) `0`
- D) Compile error

**Answer: B) `area` returns `w * h` = `3 * 4 = 12`. The struct is passed by value (a small copy is fine here).**

---

### Q172. To **return** a struct from a function, the return type is:
- A) The struct type itself: `Point makePoint() { ... }`
- B) `void` plus an out-parameter
- C) A pointer to a static struct
- D) Impossible in C++

**Answer: A) Functions can return structs by value just like any other type. (B) and (C) are older C-era patterns that are rarely needed in modern C++.**

---

### Q173. Add 1 inch carry-over: feet = 5, inches = 11.5, plus inches = 0.7. What does the chapter's `distance` example produce?
- A) `5 feet, 12.2 inches`
- B) `6 feet, 0.2 inches`
- C) `6 feet, 12.2 inches`
- D) `5 feet, 0.2 inches`

**Answer: B) Total inches = 12.2. Since 12.2 ≥ 12, subtract 12 (→ 0.2) and add 1 to feet (→ 6). Result: 6 feet, 0.2 inches.**

---

### Q174. Implement `bool equal(Point a, Point b)` for a 2D point. Which is correct?
- A) `return &a == &b;`        *(compares addresses of copies)*
- B) `return a == b;`              *(structs have no built-in `==`)*
- C) `return a.x == b.x && a.y == b.y;`
- D) `return a.x + a.y == b.x + b.y;`

**Answer: C) Compare member by member. Aggregate `==` is auto-generated only in C++20 (`= default`); in earlier standards you must write the comparison yourself.**

---

### Q175. Which line is wrong?
```cpp
struct S { int a, b; };
S s = {1, 2};
S t;
t = s;            // line A
s.a = 9;          // line B
S u({3, 4});       // line C
S v[2] = {{1,2},{3,4}};  // line D
```
- A) line A
- B) line B
- C) line C
- D) line D

**Answer: C) `S u({3, 4});` is not standard aggregate-initialisation syntax. Use `S u = {3, 4};` or `S u{3, 4};`. The other lines are all valid.**

---

### Q176. To group a student's name (string), age (int), and GPA (float), the **most natural** choice is:
- A) Three parallel arrays
- B) A `struct` with three named members
- C) An array of three `int`s
- D) Three global variables

**Answer: B) A struct keeps related fields together as one logical record, and an `array of struct` is the natural extension to many students.**

---

### Q177. Predict the output:
```cpp
struct Count { int n = 0; };
Count c;
cout << c.n;
```
- A) Garbage
- B) `0`
- C) Compile error
- D) `1`

**Answer: B) C++11 supports **default member initialisers**. `n = 0` inside the struct sets the default, so any new `Count` has `n = 0` automatically.**

---

### Q178. What does this print?
```cpp
struct Vec { int dx, dy; };
Vec a{1, 2}, b{3, 4};
Vec c = {a.dx + b.dx, a.dy + b.dy};
cout << c.dx << " " << c.dy;
```
- A) `1 2`
- B) `3 4`
- C) `4 6`
- D) `2 4`

**Answer: C) Element-wise vector add: `c.dx = 1 + 3 = 4`, `c.dy = 2 + 4 = 6`.**

---

### Q179. Which sentence is **true**?
- A) Two structs of the same shape are interchangeable types
- B) Each struct definition introduces a **distinct** type, even if the members match
- C) `struct A { int x; };` and `struct B { int x; };` define the same type
- D) Structs cannot be parameters of functions

**Answer: B) `struct A` and `struct B` are different types even with identical members. To convert, you must copy member-by-member or use a common type.**

---

### Q180. To find the student with the **highest GPA** in `Student arr[N]`, the cleanest pattern is:
- A) Sort the array, then take the first element
- B) Track an index `bestIdx = 0; for (i=1..N-1) if (arr[i].gpa > arr[bestIdx].gpa) bestIdx = i;`
- C) Use recursion with the array as a global
- D) Use `strcmp` on the names

**Answer: B) Linear scan with an index of the current best — O(n), in-place, no extra memory. Sorting (A) works but is O(n log n), unnecessary if you only need the max.**

---

## How to Use This Bank

1. **Time-boxed practice:** answer one chapter (30 questions) in 30 minutes; mark the ones you got wrong.
2. **Code questions:** before reading the answer, **type the snippet** and run it. Predicting then verifying builds the strongest mental model.
3. **Bug spotting:** for "what's wrong?" questions, write down the rule that was violated — that rule is what the question is teaching.
4. **Fill-in-the-blank:** after picking the right option, **rewrite the whole function from scratch** without looking. If you can do that, you understand it.

---

*End of Question Bank — 180 MCQs covering Functions, Advanced Functions, 1D Arrays, 2D Arrays, Strings, and Structures.*
