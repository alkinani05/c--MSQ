# Structured Programming C++ — MCQ Sheet (With Answers)

**Al-Mustafa University | Department of AI**
**Instructor: Dr. Husam Salah Mahdi**
**Course: Structured Programming C++ | First Year — Second Course**

> **Total: 150 MCQs** (25 per chapter × 6 chapters)
> Each question has 4 options (A–D) with one correct answer and explanation.

---

## Chapter 1: Functions in C++

### Q1. Which of the following is NOT a component of a function definition in C++?
- A) Return type
- B) Function name
- C) Parameter list
- D) Access specifier

**Answer: D) An access specifier (such as public or private) is a feature of classes, not a required component of a standalone function definition. The four components are: return type, function name, parameter list, and function body.**

---

### Q2. What is the purpose of a function prototype in C++?
- A) It defines the body of the function
- B) It declares the function's return type, name, and parameter types before its full definition
- C) It calls the function from main()
- D) It allocates memory for the function's local variables

**Answer: B) A function prototype tells the compiler about a function's name, return type, and parameter types before the function is fully defined, allowing the function to be called before its definition appears in the source file.**

---

### Q3. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
void greet() {
    cout << "Hello" << endl;
}
int main() {
    greet();
    greet();
    return 0;
}
```
- A) Hello
- B) HelloHello
- C) Hello (on two lines)
- D) Compiler error

**Answer: C) The function greet() prints "Hello" followed by a newline (endl). It is called twice, so "Hello" is printed on two separate lines.**

---

### Q4. Which return type should be used when a function does not return any value?
- A) int
- B) null
- C) void
- D) empty

**Answer: C) The void return type indicates that a function performs an action but does not return a value to the caller.**

---

### Q5. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
int square(int y) {
    return y * y;
}
int main() {
    cout << square(4) + square(3) << endl;
    return 0;
}
```
- A) 7
- B) 25
- C) 24
- D) 49

**Answer: B) square(4) returns 16 and square(3) returns 9. Their sum is 16 + 9 = 25.**

---

### Q6. What happens if you call a function without a prior declaration or definition in C++?
- A) The program runs with a warning
- B) The compiler automatically generates a prototype
- C) The compiler reports an error
- D) The function returns 0 by default

**Answer: C) In C++, a function must be declared (via prototype or full definition) before it is called. Calling an undeclared function causes a compiler error.**

---

### Q7. In the function prototype `int add(int, int);`, what is optional?
- A) The return type
- B) The semicolon
- C) The parameter names
- D) The parentheses

**Answer: C) In a function prototype, parameter names are optional. Only the parameter types are required. The prototype `int add(int, int);` is equivalent to `int add(int a, int b);`.**

---

### Q8. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
float aver(int x1, int x2) {
    float result;
    result = (x1 + x2) / 2;
    return result;
}
int main() {
    cout << aver(7, 13) << endl;
    return 0;
}
```
- A) 10.5
- B) 10
- C) 10.0
- D) 9

**Answer: B) Because the division (7+13)/2 uses integer division (both operands are int), the result is 10 with no decimal part. This is the integer division pitfall — using 2.0 instead of 2 would give 10.5.**

---

### Q9. What does modular programming mean?
- A) Writing code in a single main() function
- B) Dividing a program into smaller, manageable functions that each perform a specific task
- C) Using only global variables
- D) Writing code without any functions

**Answer: B) Modular programming decomposes a program into separate sub-programs (modules or functions), each developed and tested independently, reducing complexity and improving code quality.**

---

### Q10. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
void tryToChange(int n) {
    n = 999;
    cout << n << " ";
}
int main() {
    int x = 5;
    tryToChange(x);
    cout << x << endl;
    return 0;
}
```
- A) 999 999
- B) 5 5
- C) 999 5
- D) 5 999

**Answer: C) The function receives a copy of x (pass by value). Inside the function, n is changed to 999 and printed. Back in main(), x remains 5 because only the local copy was modified.**

---

### Q11. In pass by value, what happens to the original variable when the function modifies the parameter?
- A) The original variable is modified
- B) The original variable is deleted
- C) The original variable remains unchanged
- D) The program crashes

**Answer: C) In pass by value, a copy of the argument is given to the function. Any changes to the parameter affect only the local copy; the original variable in the calling function remains unchanged.**

---

### Q12. What is the output of the following swap using pass by value?
```cpp
#include <iostream>
using namespace std;
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
int main() {
    int x = 10, y = 20;
    swap(x, y);
    cout << x << " " << y << endl;
    return 0;
}
```
- A) 20 10
- B) 10 20
- C) 20 20
- D) 10 10

**Answer: B) Since the swap uses pass by value, only the local copies a and b are swapped. The original variables x and y in main() remain 10 and 20 respectively.**

---

### Q13. In the pointer-based swap function `void swap(int *a, int *b)`, what does `*a = *b;` do?
- A) Copies the address of b into a
- B) Copies the value at the address pointed to by b into the location pointed to by a
- C) Makes both pointers point to the same address
- D) Swaps the addresses stored in a and b

**Answer: B) The dereference operator * accesses the value at the memory address. So `*a = *b` copies the value at the address pointed to by b into the memory location pointed to by a.**

---

### Q14. What is the correct way to call a pointer-based swap function `void swap(int *a, int *b)` for variables x and y?
- A) swap(x, y);
- B) swap(*x, *y);
- C) swap(&x, &y);
- D) swap(x*, y*);

**Answer: C) The & (address-of) operator is used to pass the addresses of x and y to the pointer parameters. The call is swap(&x, &y).**

---

### Q15. What advantage does the C++ reference syntax (`int &a`) have over pointers for pass by reference?
- A) References are faster than pointers
- B) References can be null
- C) References provide cleaner syntax and cannot be null
- D) References allow dynamic memory allocation

**Answer: C) C++ references are generally preferred because they are simpler, safer (cannot be null), and produce cleaner code.**

---

### Q16. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
int max(int a, int b) {
    if (a > b) return a;
    else return b;
}
int max3(int a, int b, int c) {
    return max(max(a, b), c);
}
int main() {
    cout << max3(5, 12, 8) << endl;
    return 0;
}
```
- A) 5
- B) 8
- C) 12
- D) 25

**Answer: C) max3 calls max(max(5,12), 8). The inner call max(5,12) returns 12. Then max(12, 8) returns 12.**

---

### Q17. What does the principle of function composition mean?
- A) Writing all code inside main()
- B) Building complex behaviour by combining simpler functions
- C) Using only void functions
- D) Avoiding function calls inside other functions

**Answer: B) Function composition means building complex behaviour by combining simpler functions.**

---

### Q18. Given `bool XOR(bool a, bool b) { return a != b; }`, what does `XOR(true, true)` return?
- A) true
- B) false
- C) 1
- D) Compiler error

**Answer: B) XOR returns true when the inputs differ and false when they are the same. Since both inputs are true, a != b evaluates to false.**

---

### Q19. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
bool AND(bool a, bool b) { return a && b; }
bool OR(bool a, bool b)  { return a || b; }
bool NOT(bool a)          { return !a; }
int main() {
    bool x = true, y = false;
    cout << OR(AND(x, y), NOT(y)) << endl;
    return 0;
}
```
- A) 0
- B) 1
- C) true
- D) false

**Answer: B) AND(true, false) = false. NOT(false) = true. OR(false, true) = true. When printed with cout, true is displayed as 1.**

---

### Q20. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
int summation(int x) {
    int sum = 0;
    for (int i = 1; i <= x; i++)
        sum += i * i;
    return sum;
}
int main() {
    cout << summation(3) << endl;
    return 0;
}
```
- A) 6
- B) 9
- C) 14
- D) 36

**Answer: C) The function computes the sum of squares: 1×1 + 2×2 + 3×3 = 1 + 4 + 9 = 14.**

---

### Q21. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}
int main() {
    int x = 3, y = 7;
    swap(x, y);
    swap(x, y);
    cout << x << " " << y << endl;
    return 0;
}
```
- A) 7 3
- B) 3 7
- C) 7 7
- D) 3 3

**Answer: B) The first swap exchanges x and y to become 7 and 3. The second swap exchanges them back to 3 and 7.**

---

### Q22. Which of the following is NOT an advantage of using functions?
- A) Easier to debug
- B) Code reusability
- C) Faster execution than inline code
- D) Team development

**Answer: C) Functions add overhead from the call mechanism. The advantages of functions are easier writing, reading, debugging, reusability, and team development — not faster execution.**

---

### Q23. What does the return statement do in a non-void function?
- A) It only terminates the function
- B) It evaluates an expression and sends the value back to the caller, then terminates the function
- C) It prints the returned value
- D) It restarts the function

**Answer: B) In non-void functions, the return statement evaluates the expression, makes the value available at the point of the function call, and terminates the function immediately.**

---

### Q24. Variables declared inside a function are called:
- A) Global variables
- B) Static variables
- C) Local variables
- D) External variables

**Answer: C) Variables declared inside a function are local to that function. They exist only while the function is executing.**

---

### Q25. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
int compute(int a, int b) {
    return a * b + a;
}
int main() {
    int x = 3;
    cout << compute(x, compute(2, 1)) << endl;
    return 0;
}
```
- A) 9
- B) 10
- C) 12
- D) 15

**Answer: D) compute(2, 1) = 2×1 + 2 = 4. Then compute(3, 4) = 3×4 + 3 = 15.**

---

## Chapter 2: Advanced Function Concepts

### Q1. Which type of user-defined function has no arguments and no return value?
- A) `int calculate(int n)`
- B) `void greet()`
- C) `void printSquare(int n)`
- D) `float calcSquare(float n)`

**Answer: B) `void greet()` takes no arguments (empty parameter list) and returns nothing (void). This is Type 1.**

---

### Q2. What is the difference between actual arguments and formal arguments?
- A) Actual arguments appear in the function definition; formal arguments appear in the function call
- B) Actual arguments appear in the function call; formal arguments appear in the function definition
- C) They are two names for the same thing
- D) Actual arguments are always constants; formal arguments are always variables

**Answer: B) Actual arguments are the values specified in the function call. Formal arguments are the variables declared in the function definition header.**

---

### Q3. In the call `add(x, y)` where the function is `int add(int a, int b)`, which are the formal arguments?
- A) x and y
- B) a and b
- C) int and int
- D) add and return

**Answer: B) The variables a and b in the function definition are the formal arguments. x and y in the call are actual arguments.**

---

### Q4. What is the default initial value of a global variable of type `int` in C++?
- A) Undefined (garbage value)
- B) -1
- C) 0
- D) 1

**Answer: C) Global variables in C++ are automatically zero-initialized. An uninitialized global `int` starts at 0.**

---

### Q5. What is the default initial value of a local variable of type `int` in C++?
- A) 0
- B) -1
- C) Undefined (garbage value)
- D) null

**Answer: C) Local variables are not automatically initialized. They contain whatever garbage data happens to be at that memory location.**

---

### Q6. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
int x = 5;
void modify() {
    x = x + 10;
}
int main() {
    modify();
    modify();
    cout << x << endl;
    return 0;
}
```
- A) 5
- B) 15
- C) 25
- D) 10

**Answer: C) x is global, initialized to 5. First modify() makes x = 15. Second modify() makes x = 25.**

---

### Q7. Where are local variables stored in memory?
- A) Heap
- B) Data segment
- C) Stack
- D) Register

**Answer: C) Local variables are allocated on the stack and destroyed when the function returns.**

---

### Q8. Where are global variables stored in memory?
- A) Stack
- B) Heap
- C) Data segment
- D) Code segment

**Answer: C) Global variables are stored in the data segment and persist for the program's entire lifetime.**

---

### Q9. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
int x = 10, y = 5;
void sum(void) {
    int s = x + y;
    cout << s << " ";
}
int main() {
    sum();
    x = 100;
    y = 200;
    sum();
    return 0;
}
```
- A) 15 15
- B) 15 300
- C) 300 300
- D) 10 300

**Answer: B) First call: x=10, y=5, prints 15. Then x and y change. Second call: x=100, y=200, prints 300.**

---

### Q10. What are the two essential components every recursive function must have?
- A) A loop and a counter
- B) A base case and a recursive case
- C) A global variable and a local variable
- D) An input and an output

**Answer: B) Every recursive function needs a base case (stops recursion) and a recursive case (calls itself with modified argument).**

---

### Q11. What does `sum(4)` return given this function?
```cpp
int sum(int n) {
    if (n == 0) return 0;
    else return n + sum(n - 1);
}
```
- A) 4
- B) 6
- C) 10
- D) 15

**Answer: C) sum(4) = 4 + sum(3) = 4 + 3 + sum(2) = 4 + 3 + 2 + sum(1) = 4 + 3 + 2 + 1 + sum(0) = 4 + 3 + 2 + 1 + 0 = 10.**

---

### Q12. What does `factorial(5)` return?
```cpp
long long factorial(int n) {
    if (n <= 1) return 1;
    else return n * factorial(n - 1);
}
```
- A) 24
- B) 60
- C) 120
- D) 720

**Answer: C) 5! = 5 × 4 × 3 × 2 × 1 = 120.**

---

### Q13. What happens if a recursive function has no base case?
- A) The function returns 0
- B) The function runs once and stops
- C) The function calls itself indefinitely, causing a stack overflow
- D) The compiler prevents compilation

**Answer: C) Without a base case, the function calls itself indefinitely, exhausting the stack memory and causing a stack overflow crash.**

---

### Q14. In the recursive sum function, what is the base case?
```cpp
int sum(int n) {
    if (n == 0) return 0;
    else return n + sum(n - 1);
}
```
- A) `return n + sum(n - 1);`
- B) `if (n == 0) return 0;`
- C) `n - 1`
- D) `return n;`

**Answer: B) The condition `if (n == 0) return 0;` stops the recursion without making another recursive call.**

---

### Q15. How many recursive calls are made when computing `sum(5)` (not counting the initial call)?
- A) 4
- B) 5
- C) 6
- D) 10

**Answer: B) sum(5) calls sum(4), sum(3), sum(2), sum(1), sum(0) — that is 5 recursive calls.**

---

### Q16. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
void printSquare(int n) {
    cout << n * n << " ";
}
int main() {
    printSquare(7);
    printSquare(12);
    return 0;
}
```
- A) 7 12
- B) 49 144
- C) 49 12
- D) 14 24

**Answer: B) printSquare(7) prints 49. printSquare(12) prints 144.**

---

### Q17. Which function type is most appropriate for computing a value the caller needs?
- A) Type 1: No arguments, no return value
- B) Type 2: With arguments, no return value
- C) Type 3: With arguments, with return value
- D) Any type works equally well

**Answer: C) Type 3 returns a value the caller can store, pass to another function, or use in expressions.**

---

### Q18. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
float calcSquare(float n) {
    return n * n;
}
int main() {
    float x = 3.5;
    cout << 2 * calcSquare(x) << endl;
    return 0;
}
```
- A) 12.25
- B) 24.5
- C) 7.0
- D) 49.0

**Answer: B) calcSquare(3.5) = 12.25. Then 2 × 12.25 = 24.5.**

---

### Q19. What is the key difference between a void function and one that returns a value?
- A) Void functions cannot accept arguments
- B) Void functions cannot be called from main()
- C) Void function results cannot be stored in variables or used in expressions
- D) Void functions run faster

**Answer: C) A void function performs an action but does not return a value, so its result cannot be stored or used in expressions.**

---

### Q20. What does `factorial(0)` return?
```cpp
long long factorial(int n) {
    if (n <= 1) return 1;
    else return n * factorial(n - 1);
}
```
- A) 0
- B) 1
- C) Undefined behavior
- D) Stack overflow

**Answer: B) Since 0 <= 1 is true, the base case returns 1 immediately. By convention, 0! = 1.**

---

### Q21. Which of the following is a drawback of using global variables?
- A) They cannot store integer values
- B) They make the program run slower
- C) Any function can modify them, making it difficult to track changes
- D) They are destroyed when main() starts

**Answer: C) Global variables can be modified by any function, making it hard to track changes and reducing modularity.**

---

### Q22. What is the output of the following code?
```cpp
#include <iostream>
using namespace std;
int x = 1;
void f1() { x = x + 1; }
void f2() { x = x * 3; }
int main() {
    f1();
    f2();
    f1();
    cout << x << endl;
    return 0;
}
```
- A) 6
- B) 7
- C) 9
- D) 10

**Answer: B) x starts at 1. f1() → x=2. f2() → x=6. f1() → x=7.**

---

### Q23. The Taylor series for sin(x) has what sign pattern?
- A) All positive
- B) All negative
- C) Alternating, starting with positive
- D) Alternating, starting with negative

**Answer: C) The series alternates: +x, −x³/3!, +x⁵/5!, −x⁷/7!, ...**

---

### Q24. What is the output of the following recursive function call?
```cpp
int mystery(int n) {
    if (n == 1) return 1;
    else return n * mystery(n - 1);
}
// Call: mystery(4)
```
- A) 4
- B) 10
- C) 24
- D) 64

**Answer: C) This is factorial. mystery(4) = 4 × 3 × 2 × 1 = 24.**

---

### Q25. Which problem is most naturally solved using recursion?
- A) Printing numbers from 1 to 100
- B) Reading user input
- C) Computing the factorial of a number
- D) Swapping two variables

**Answer: C) Factorial has a natural recursive definition: n! = n × (n−1)! with base case 0! = 1.**

---

## Chapter 3: One-Dimensional Arrays

### Q1. What is an array in C++?
- A) A collection of different data types stored randomly in memory
- B) A consecutive group of homogeneous memory locations sharing the same name and data type
- C) A single variable that can hold multiple data types
- D) A pointer to a dynamic memory block

**Answer: B) An array is a consecutive group of homogeneous memory locations that share the same name and data type, accessed through an index.**

---

### Q2. Which of the following is NOT a characteristic of arrays?
- A) All elements occupy contiguous memory locations
- B) Every element is of the same data type
- C) Elements can be of different data types within the same array
- D) Elements are referenced using a non-negative integer index

**Answer: C) Arrays are homogeneous — every element must be of the same data type.**

---

### Q3. What is the correct syntax to declare an array of 20 integers named `scores`?
- A) `int scores(20);`
- B) `int scores[20];`
- C) `array int scores[20];`
- D) `int[20] scores;`

**Answer: B) The correct C++ syntax is `data-type Array-name[size];`.**

---

### Q4. In `int age[10];`, what are the valid index values?
- A) 1 to 10
- B) 0 to 10
- C) 0 to 9
- D) 1 to 9

**Answer: C) Array indices start at 0 and go up to size−1. For size 10, valid indices are 0–9.**

---

### Q5. How many bytes does `int age[10];` occupy if `sizeof(int)` is 4?
- A) 10 bytes
- B) 14 bytes
- C) 40 bytes
- D) 44 bytes

**Answer: C) 10 × sizeof(int) = 10 × 4 = 40 bytes.**

---

### Q6. What happens when you access `num[10]` in `int num[10];`?
- A) It returns 0
- B) A compile-time error occurs
- C) The behavior is undefined
- D) It returns the last element

**Answer: C) C++ does not perform automatic bounds checking. Accessing an out-of-range index is undefined behavior.**

---

### Q7. Which correctly initializes all elements of a 100-element array to zero?
- A) `int arr[100] = {};`
- B) `int arr[100] = {0};`
- C) `int arr[100] = 0;`
- D) Both A and B

**Answer: D) Both `int arr[100] = {};` and `int arr[100] = {0};` zero-initialize all elements.**

---

### Q8. Given `int y[10] = {8, 10, 13, 15, 0, 1, 17, 22};`, what is `y[9]`?
- A) 22
- B) Garbage value
- C) 0
- D) Undefined

**Answer: C) When fewer initializers are provided, remaining elements are automatically set to 0.**

---

### Q9. What is the size of `int x[] = {12, 3, 5, 0, 11, 7, 30, 100, 22};`?
- A) 8
- B) 9
- C) 10
- D) Won't compile

**Answer: B) The compiler deduces the size from the 9 initializer values.**

---

### Q10. What does this output?
```cpp
int arr[] = {10, 20, 30, 40, 50};
cout << arr[1] + arr[3];
```
- A) 30
- B) 50
- C) 60
- D) 70

**Answer: C) arr[1]=20, arr[3]=40. Sum = 60.**

---

### Q11. Which loop correctly prints an array of size 10 in reverse?
- A) `for (int i = 10; i >= 0; i--)`
- B) `for (int i = 9; i >= 0; i--)`
- C) `for (int i = 9; i > 0; i--)`
- D) `for (int i = 10; i > 0; i--)`

**Answer: B) Valid indices are 0–9. Start at 9, go down to 0 inclusive.**

---

### Q12. What is the correct strategy to find the minimum value in an array?
- A) Sort the array, then return the first element
- B) Assume the first element is the minimum, compare with all others, update if smaller
- C) Compare each element with zero
- D) Sum all elements and divide by count

**Answer: B) Initialize min = arr[0], then scan from index 1, updating min when a smaller element is found.**

---

### Q13. In the minimum-finding algorithm, `min` should initially be set to:
- A) 0
- B) INT_MAX
- C) arr[0]
- D) arr[size-1]

**Answer: C) `min` is initialized to arr[0], and the loop starts from index 1.**

---

### Q14. What does this output?
```cpp
int arr[5] = {3, 8, 15, 22, 7};
int sum = 0;
for (int i = 0; i < 5; i++) sum += arr[i];
cout << sum;
```
- A) 45
- B) 55
- C) 50
- D) 35

**Answer: B) 3 + 8 + 15 + 22 + 7 = 55.**

---

### Q15. What is `distance[4]` for `double distance[] = {23.14, 70.52, 104.08, 468.78, 6.28};`?
- A) 468.78
- B) 6.28
- C) 23.14
- D) 104.08

**Answer: B) Index 4 is the 5th element, which is 6.28.**

---

### Q16. Using two arrays of the same size where element i in one corresponds to element i in the other is called:
- A) Linked arrays
- B) Parallel arrays
- C) Dual arrays
- D) Synchronized arrays

**Answer: B) This is the parallel array technique.**

---

### Q17. In a linear search function, what value is typically returned when the target is not found?
- A) 0
- B) The size of the array
- C) -1
- D) NULL

**Answer: C) The convention is to return -1 when the value is not found.**

---

### Q18. What is the time complexity of linear search?
- A) O(1)
- B) O(log n)
- C) O(n)
- D) O(n²)

**Answer: C) Linear search examines each element one by one, giving O(n).**

---

### Q19. In the odd/even splitting, what serves as both count and next insertion index?
- A) The loop variable i
- B) The array size
- C) The counter variables oddCount and evenCount
- D) A pointer variable

**Answer: C) The counters track how many elements have been inserted and serve as the next index.**

---

### Q20. What does this print?
```cpp
int arr[] = {10, 25, 33, 47, 52};
int x = 33;
for (int i = 0; i < 5; i++) {
    if (arr[i] == x) { cout << i; break; }
}
```
- A) 33
- B) 3
- C) 2
- D) -1

**Answer: C) 33 is at index 2.**

---

### Q21. Why must array size be a constant expression in standard C++?
- A) Arrays cannot hold more than 100 elements
- B) The compiler needs the exact size at compile time to allocate memory
- C) Variable-length arrays use too much memory
- D) The C++ standard requires all variables to be constants

**Answer: B) The compiler allocates array memory at compile time, requiring a constant size.**

---

### Q22. What does this output?
```cpp
int arr[5] = {2, 4, 6, 8, 10};
arr[2] = arr[0] + arr[4];
cout << arr[2];
```
- A) 6
- B) 8
- C) 12
- D) 14

**Answer: C) arr[0]=2, arr[4]=10. Sum = 12 replaces arr[2].**

---

### Q23. How is an array typically passed to a function?
- A) `int search(int arr, int size, int x)`
- B) `int search(int arr[], int size, int x)`
- C) `int search(int arr[size], int x)`
- D) `int search(array<int> arr, int x)`

**Answer: B) Arrays are passed using `int arr[]` with a separate size parameter.**

---

### Q24. What does this output?
```cpp
int arr[5];
arr[0] = 1;
for (int i = 1; i < 5; i++) arr[i] = arr[i-1] * 2;
cout << arr[4];
```
- A) 8
- B) 10
- C) 16
- D) 32

**Answer: C) arr: 1, 2, 4, 8, 16. arr[4] = 16.**

---

### Q25. Given `int arr[] = {3, 8, 15, 22, 7, 40, 11, 6, 9, 18}`, how many even numbers are there?
- A) 4
- B) 5
- C) 6
- D) 3

**Answer: B) Even numbers: 8, 22, 40, 6, 18 — that is 5 elements.**

---

## Chapter 4: Two-Dimensional Arrays

### Q1. A two-dimensional array is:
- A) An array that can store two different data types
- B) An array of arrays arranged in rows and columns
- C) Two separate one-dimensional arrays
- D) An array with exactly two elements

**Answer: B) A 2D array is an array of arrays, arranged in rows and columns, accessed with two indices.**

---

### Q2. What is the correct declaration for 3 rows and 4 columns of integers?
- A) `int num[4][3];`
- B) `int num(3)(4);`
- C) `int num[3][4];`
- D) `int num[3,4];`

**Answer: C) Syntax: `data-type name[Row-size][Col-size];`.**

---

### Q3. How many total elements does `int a[10][10];` contain?
- A) 10
- B) 20
- C) 100
- D) 1000

**Answer: C) 10 × 10 = 100 elements.**

---

### Q4. How are 2D array elements stored in memory in C++?
- A) Column-major order
- B) Row-major order
- C) Random order
- D) Diagonal order

**Answer: B) C++ uses row-major order: all of row 0 first, then row 1, etc.**

---

### Q5. Which correctly initializes a 2×3 array?
- A) `int a[2][3] = {{1, 2, 3}, {4, 5, 6}};`
- B) `int a[2][3] = {1, 2, 3, 4, 5, 6};`
- C) `int a[2][3] = [(1, 2, 3), (4, 5, 6)];`
- D) Both A and B

**Answer: D) Both nested braces and flat list are valid.**

---

### Q6. When initializing a 2D array, which dimension can be omitted?
- A) The column size
- B) The row size
- C) Both
- D) Neither

**Answer: B) The compiler can deduce the row count but the column size must always be specified.**

---

### Q7. What does `arr[1][2]` refer to?
- A) Row 2, Column 1
- B) Row 1, Column 2
- C) The 12th element
- D) Row 0, Column 3

**Answer: B) First index is row, second is column. arr[1][2] = row 1, column 2.**

---

### Q8. What is the output?
```cpp
int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
cout << a[0][2] + a[1][0];
```
- A) 5
- B) 6
- C) 7
- D) 8

**Answer: C) a[0][2]=3, a[1][0]=4. Sum = 7.**

---

### Q9. What loop structure is needed to process all elements of a 2D array?
- A) A single for loop
- B) A while loop only
- C) Nested loops (outer for rows, inner for columns)
- D) A do-while loop

**Answer: C) 2D arrays require nested loops: outer for rows, inner for columns.**

---

### Q10. Where should the row summation accumulator be reset to zero?
- A) Before the outer loop
- B) At the beginning of each iteration of the outer loop
- C) After the inner loop
- D) At the end of the program

**Answer: B) Reset the accumulator at the start of each row iteration to sum each row independently.**

---

### Q11. Given a 3×4 array filled with values 1–12 row by row, what is the sum of row 1?
- A) 10
- B) 22
- C) 26
- D) 42

**Answer: C) Row 1: 5 + 6 + 7 + 8 = 26.**

---

### Q12. What does this code do?
```cpp
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        if (arr[i][j] == 5) arr[i][j] = 0;
```
- A) Sets all elements to 5
- B) Sets all elements to 0
- C) Replaces every occurrence of 5 with 0
- D) Replaces every occurrence of 0 with 5

**Answer: C) Only elements equal to 5 are replaced with 0.**

---

### Q13. Element-wise addition of two 2D arrays uses:
- A) `c[i][j] = a[i][j] * b[i][j];`
- B) `c[i][j] = a[i][j] + b[i][j];`
- C) `c[i][j] = a[i] + b[j];`
- D) `c[i] = a[i] + b[i];`

**Answer: B) `c[i][j] = a[i][j] + b[i][j];` within nested loops.**

---

### Q14. When flattening a 2D array (R rows, C columns), element `[i][j]` maps to 1D index:
- A) i + j
- B) i × R + j
- C) i × C + j
- D) j × R + i

**Answer: C) The formula is i × C + j (row-major order).**

---

### Q15. What 1D array size is needed to flatten a 3×4 array?
- A) 7
- B) 12
- C) 34
- D) 16

**Answer: B) 3 × 4 = 12 elements.**

---

### Q16. Main diagonal elements of an n×n matrix satisfy:
- A) i + j = n
- B) i + j = n − 1
- C) i = j
- D) i > j

**Answer: C) Main diagonal: row index equals column index (i = j).**

---

### Q17. Secondary diagonal elements satisfy:
- A) i = j
- B) i − j = n − 1
- C) i + j = n − 1
- D) i × j = n

**Answer: C) Secondary diagonal: i + j = n − 1.**

---

### Q18. In a 4×4 matrix (n=4), which element is on the secondary diagonal?
- A) arr[0][0]
- B) arr[1][3]
- C) arr[0][1]
- D) arr[1][2]

**Answer: D) For n=4, secondary diagonal has i + j = 3. arr[1][2]: 1 + 2 = 3. ✓**

---

### Q19. Upper triangle elements satisfy:
- A) i > j
- B) i < j
- C) i = j
- D) i + j > n

**Answer: B) Upper triangle: elements above the main diagonal where i < j.**

---

### Q20. How many loops are needed to replace all main diagonal elements with zero?
- A) Two nested loops
- B) One single loop
- C) Three nested loops
- D) No loops

**Answer: B) Since i = j, one loop suffices: `for (int i = 0; i < n; i++) arr[i][i] = 0;`**

---

### Q21. What does this compute?
```cpp
int mainSum = 0;
for (int i = 0; i < n; i++) mainSum += arr[i][i];
```
- A) Sum of all elements
- B) Sum of first row
- C) Sum of main diagonal
- D) Sum of secondary diagonal

**Answer: C) arr[i][i] accesses main diagonal elements.**

---

### Q22. For this matrix, what is the sum of the secondary diagonal?
```
1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16
```
- A) 28
- B) 34
- C) 40
- D) 30

**Answer: B) Secondary diagonal (i+j=3): 4 + 7 + 10 + 13 = 34.**

---

### Q23. Which header is needed for `sqrt`?
- A) `<iostream>`
- B) `<cmath>`
- C) `<cstdlib>`
- D) `<math>`

**Answer: B) The sqrt function is in `<cmath>`.**

---

### Q24. What does `sqrt` return for a negative argument?
- A) 0
- B) Absolute value's square root
- C) NaN (Not a Number)
- D) Compile-time error

**Answer: C) sqrt returns NaN for negative arguments.**

---

### Q25. What does this output?
```cpp
int arr[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
int sum = 0;
for (int i = 0; i < 3; i++) {
    sum += arr[i][i];
    sum += arr[i][3-1-i];
}
cout << sum;
```
- A) 15
- B) 20
- C) 25
- D) 30

**Answer: D) Main diagonal: 1+5+9=15. Secondary diagonal: 3+5+7=15. Total = 30 (center element 5 counted twice).**

---

## Chapter 5: Strings in C++

### Q1. A C-style string is implemented as:
- A) A linked list of characters
- B) An array of characters terminated by '\0'
- C) An object of the string class
- D) A pointer to a single character

**Answer: B) A C-style string is an array of characters with a null terminator '\0'.**

---

### Q2. The correct general form for declaring a C-style string is:
- A) `string name[size];`
- B) `char String_name[size];`
- C) `char[] String_name;`
- D) `String char_name(size);`

**Answer: B) `char String_name[size];` where size includes room for '\0'.**

---

### Q3. What is the minimum array size to store "Mazin Alaa"?
- A) 9
- B) 10
- C) 11
- D) 12

**Answer: C) 10 visible characters + 1 null terminator = 11.**

---

### Q4. What does `char str[] = "ABCD";` produce?
- A) Array of size 4: A, B, C, D
- B) Array of size 5: A, B, C, D, '\0'
- C) Array of size 4: A, B, C, '\0'
- D) Compile error

**Answer: B) Size = 5 (4 characters + null terminator).**

---

### Q5. The ASCII value of '\0' is:
- A) 48
- B) 32
- C) -1
- D) 0

**Answer: D) The null character '\0' has ASCII value 0.**

---

### Q6. What happens if a C-string is missing its null terminator?
- A) Prints normally
- B) Compiler adds one automatically
- C) Functions read past the boundary, causing undefined behaviour
- D) Won't compile

**Answer: C) Without '\0', string functions cannot determine where the string ends — undefined behaviour.**

---

### Q7. The idiomatic loop condition for iterating through a C-string is:
- A) `i < strlen(str)`
- B) `str[i] != '\0'`
- C) `str[i] != ' '`
- D) `str[i] == '\0'`

**Answer: B) Loop while `str[i] != '\0'` — the null character marks the end.**

---

### Q8. What does `cin.getline(str, 50)` do?
- A) Reads up to 50 characters, stopping at first space
- B) Reads up to 49 characters including spaces into str
- C) Reads exactly 50 characters
- D) Reads 50 characters excluding newline and spaces

**Answer: B) Reads up to n−1 characters (including spaces), reserving one position for '\0'.**

---

### Q9. The key difference between `cin >>` and `cin.getline()` is:
- A) `cin >>` reads full lines; `cin.getline()` stops at spaces
- B) `cin >>` stops at whitespace; `cin.getline()` reads including spaces
- C) They are identical
- D) `cin.getline()` reads single characters only

**Answer: B) `>>` stops at whitespace; `getline()` captures the entire line including spaces.**

---

### Q10. What does `cin.ignore(80, '\n')` do?
- A) Reads 80 characters into a string
- B) Discards up to 80 characters or until newline is found
- C) Ignores all input permanently
- D) Puts back 80 characters

**Answer: B) Discards up to 80 characters or stops when the delimiter is found.**

---

### Q11. `cout.put(ch)` does what?
- A) Reads a character
- B) Pushes back a character
- C) Writes a single character to output
- D) Converts to uppercase

**Answer: C) Writes a single character to standard output.**

---

### Q12. `cin.putback(ch)` does what?
- A) Writes to output
- B) Deletes from memory
- C) Pushes ch back into the input buffer
- D) Replaces the last character

**Answer: C) Pushes the character back so it can be read again.**

---

### Q13. What does `strlen("Hello")` return?
- A) 6
- B) 5
- C) 4
- D) 0

**Answer: B) strlen returns character count excluding the null terminator. "Hello" = 5.**

---

### Q14. After `strcpy(b, a)` where `a[] = "abcd"`, what is in b?
- A) "abcd" without null terminator
- B) "abcd" with null terminator
- C) Only 'a'
- D) Empty string

**Answer: B) strcpy copies the entire string including the null terminator.**

---

### Q15. What does this output?
```cpp
char a[20] = "abcd";
char b[] = "1234";
strcat(a, b);
cout << a;
```
- A) abcd
- B) 1234abcd
- C) abcd1234
- D) 1234

**Answer: C) strcat appends b to a → "abcd1234".**

---

### Q16. What does `strcmp("abc", "abc")` return?
- A) 1
- B) -1
- C) 0
- D) true

**Answer: C) strcmp returns 0 when strings are equal.**

---

### Q17. What does `strcmp("a", "b")` return?
- A) 0
- B) A positive value
- C) A negative value
- D) 1

**Answer: C) "a" < "b" lexicographically → negative value.**

---

### Q18. What does `strcmp("b", "a")` return?
- A) 0
- B) A positive value
- C) A negative value
- D) -1

**Answer: B) "b" > "a" → positive value.**

---

### Q19. What does `atoi("2048")` return?
- A) The string "2048"
- B) The double 2048.0
- C) The integer 2048
- D) A character array

**Answer: C) atoi converts string to integer → 2048.**

---

### Q20. What does `atof("3.14159")` return?
- A) The integer 3
- B) The string "3.14159"
- C) The double 3.14159
- D) Compile error

**Answer: C) atof converts string to double → 3.14159.**

---

### Q21. Which is true about `itoa()`?
- A) It is part of the C++ standard
- B) It is a non-standard compiler extension
- C) It converts string to integer
- D) It is in `<cstring>`

**Answer: B) itoa() is not part of the C++ standard — it's a compiler extension.**

---

### Q22. What does `toupper('a')` return?
- A) 'a'
- B) 'A'
- C) 65
- D) Both B and C (same value)

**Answer: D) toupper('a') returns 'A', which is the same as integer 65.**

---

### Q23. What does `strlen(s1)` return for `char s1[30] = "Hello";`?
- A) 30
- B) 6
- C) 5
- D) 4

**Answer: C) strlen counts characters until '\0'. "Hello" = 5, regardless of array size 30.**

---

### Q24. A buffer overflow with C-strings occurs when:
- A) You read more characters than the user typed
- B) You write past the end of a destination array using strcpy or strcat
- C) The null terminator takes up too much space
- D) You use cin.getline instead of cin >>

**Answer: B) Buffer overflow happens when functions write data beyond the allocated array size.**

---

### Q25. What does this output?
```cpp
char str[50];
strcpy(str, "Hello");
strcat(str, " ");
strcat(str, "World");
cout << str << " - " << strlen(str);
```
- A) Hello World - 10
- B) Hello World - 11
- C) HelloWorld - 10
- D) Hello World - 12

**Answer: B) "Hello" + " " + "World" = "Hello World" (11 characters). strlen returns 11.**

---

## Chapter 6: Structures

### Q1. A structure in C++ is used to:
- A) Store multiple values of the same data type
- B) Group several data items of potentially different types into a single entity
- C) Create a new function
- D) Allocate dynamic memory

**Answer: B) A structure groups data items of potentially different types into a single entity using the struct keyword.**

---

### Q2. What keyword defines a structure?
- A) class
- B) union
- C) struct
- D) type

**Answer: C) The `struct` keyword is used to define structures.**

---

### Q3. A common syntax error when defining a structure is:
- A) Using the struct keyword
- B) Omitting the semicolon after the closing brace
- C) Naming the members
- D) Using different data types

**Answer: B) Forgetting the semicolon after the closing brace is the most common struct syntax error.**

---

### Q4. Which correctly defines a structure?
- A) `struct part { int id; float cost; }`
- B) `struct part { int id; float cost; };`
- C) `struct { int id; float cost; } part`
- D) `structure part { int id; float cost; };`

**Answer: B) Must include struct keyword, name, members in braces, and semicolon after closing brace.**

---

### Q5. Structure members are accessed using:
- A) Arrow operator (->)
- B) Dot operator (.)
- C) Square brackets []
- D) Scope resolution (::)

**Answer: B) Members are accessed with the dot operator: `variable.member`.**

---

### Q6. "Method A" of declaring structures means:
- A) Define and declare variable simultaneously
- B) Use typedef
- C) Define structure first, declare variables later
- D) Declare variable before defining structure

**Answer: C) Method A: define the struct type first, then declare variables of that type later.**

---

### Q7. What does this code do?
```cpp
struct data {
    char *name;
    int age;
} student;
```
- A) Defines a structure and declares a variable named student simultaneously
- B) Creates a typedef called student
- C) Compilation error
- D) Defines a function called student

**Answer: A) This is Method B — defines the structure and declares `student` at the same time.**

---

### Q8. The purpose of `typedef` with structures is:
- A) Make the structure private
- B) Create an alias so variables can be declared without the struct keyword
- C) Create a pointer to the structure
- D) Nest structures

**Answer: B) typedef creates an alias, allowing `Student s1;` instead of `struct Student s1;`.**

---

### Q9. Given `typedef struct { char *name; int age; } Student;`, the correct declaration is:
- A) `struct Student s1;`
- B) `Student s1, s2;`
- C) `student s1;`
- D) Both A and B

**Answer: B) With typedef, use `Student s1, s2;` without the struct keyword.**

---

### Q10. The key difference between arrays and structures is:
- A) Arrays hold different types; structures cannot
- B) Structures hold different data types; arrays hold same type
- C) Arrays use dot operator; structures use indices
- D) Structures cannot be assigned

**Answer: B) Arrays are homogeneous (same type); structures are heterogeneous (different types).**

---

### Q11. Array elements vs. structure members are accessed:
- A) Both use dot operator
- B) Both use index notation
- C) Arrays by index (a[0]); structures by name (s.age)
- D) Arrays by name; structures by index

**Answer: C) Arrays use numeric indices; structures use named members with the dot operator.**

---

### Q12. Which statement about structures is TRUE?
- A) Structures cannot be assigned using =
- B) Structures can be assigned directly: s2 = s1; copies all members
- C) Structure members must be the same type
- D) Structure size is always 4 bytes

**Answer: B) Unlike arrays, structure variables can be assigned directly with `=`, copying all members.**

---

### Q13. A nested structure is:
- A) A structure defined inside a function
- B) A structure where a member is itself another structure
- C) An array of structures
- D) A structure with no members

**Answer: B) A nested structure has a member that is itself another structure type.**

---

### Q14. Given nested structs, how do you access `feet` of the room's `length`?
```cpp
struct distance { int feet; float inches; };
struct room { distance length; distance width; };
room dining;
```
- A) `dining.feet`
- B) `dining.length.feet`
- C) `dining->length->feet`
- D) `length.dining.feet`

**Answer: B) Chain dot operators: `dining.length.feet` — first into dining, then into length.**

---

### Q15. How many dot operators are needed to access a member two levels deep?
- A) 1
- B) 2
- C) 3
- D) 0

**Answer: B) Two dots: e.g., `dining.length.feet`.**

---

### Q16. An array of structures is:
- A) A structure containing an array member
- B) An array where each element is a complete structure
- C) A structure that uses array indexing
- D) An array that can hold different types

**Answer: B) Each element is a complete structure with all its members.**

---

### Q17. How to access the name of the second student?
```cpp
struct student { char name[30]; int age; };
student arr[3];
```
- A) `arr.name[1]`
- B) `arr[2].name`
- C) `arr[1].name`
- D) `name.arr[1]`

**Answer: C) Index starts at 0, so second student is arr[1]. Access: `arr[1].name`.**

---

### Q18. What is the output?
```cpp
struct distance { int feet; float inches; };
distance d1, d2, d3;
d1.feet = 5;  d1.inches = 8.5;
d2.feet = 3;  d2.inches = 7.2;
d3.inches = d1.inches + d2.inches;
d3.feet = d1.feet + d2.feet;
if (d3.inches >= 12.0) {
    d3.inches -= 12.0;
    d3.feet += 1;
}
cout << d3.feet << " feet, " << d3.inches << " inches";
```
- A) 8 feet, 15.7 inches
- B) 9 feet, 3.7 inches
- C) 8 feet, 3.7 inches
- D) 9 feet, 15.7 inches

**Answer: B) inches = 8.5+7.2 = 15.7 ≥ 12, so inches = 3.7, feet = 8+1 = 9.**

---

### Q19. In `struct part { int model_no; int part_no; float cost; };`, the member types are:
- A) All integers
- B) All floats
- C) Two integers and one float
- D) One integer and two floats

**Answer: C) model_no (int), part_no (int), cost (float) — two ints and one float.**

---

### Q20. What happens if you omit the semicolon after a struct definition?
- A) Compiles normally
- B) Compilation error
- C) Struct is ignored
- D) Runs but wrong output

**Answer: B) Missing semicolon after struct definition causes a compilation error.**

---

### Q21. In C++, which struct variable declaration(s) are valid (given `struct data { ... };`)?
- A) `data student;`
- B) `struct data student;`
- C) Both A and B
- D) Neither

**Answer: C) In C++, both forms are valid — the struct keyword prefix is optional.**

---

### Q22. Why is `cin.ignore(80, '\n')` used after `cin >>` in the array of structures example?
- A) Ignores the next 80 students
- B) Flushes remaining input after reading a number so cin.getline works correctly
- C) Reads a new line of text
- D) Clears the screen

**Answer: B) After `cin >> age`, the newline remains in the buffer. cin.ignore flushes it for the next getline.**

---

### Q23. What does this output?
```cpp
struct point { int x; int y; };
point p1, p2;
p1.x = 10; p1.y = 20;
p2 = p1;
p2.x = 30;
cout << p1.x << " " << p2.x;
```
- A) 30 30
- B) 10 10
- C) 10 30
- D) 30 10

**Answer: C) `p2 = p1` copies all members. Then p2.x changes to 30 but p1.x stays 10.**

---

### Q24. To convert feet and inches to total inches:
- A) `feet + inches`
- B) `feet / 12 + inches`
- C) `feet * 12 + inches`
- D) `feet * inches + 12`

**Answer: C) 1 foot = 12 inches, so total = feet × 12 + inches.**

---

### Q25. The correct way to declare an array of 3 student structures is:
```cpp
struct student { char name[30]; int age; };
```
- A) `student[3] arr;`
- B) `student arr[3];`
- C) `array<student> arr(3);`
- D) `student arr = new student[3];`

**Answer: B) `student arr[3];` creates an array of 3 structures.**

---

> **End of MCQ Sheet — 150 Questions Total**
> Chapters 1–6 | Structured Programming C++ | Al-Mustafa University
