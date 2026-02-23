

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?



1. **getElementById** Selects a single element by its unique ID. its return a Single Element <br>
2. **getElementsByClassName** Selects all elements that have a specific class name its return HTMLCollection <br>
3. **querySelector**  Selects the **first** element that matches a CSS selector (ID, Class, or Tag).    its return Single Element <br>
4. **querySelectorAll**  Selects **all** elements matching a CSS selector. its return NodeList 
---

### 2. How do you create and insert a new element into the DOM?
To add a new element to the DOM, follow these three steps:
1. **Create:** `const div = document.createElement('div');`
2. **Set Content:** `div.innerText = 'New Element Added';`
3. **Insert:** `parentElement.appendChild(div);`

---

### 3. What is Event Bubbling? And how does it work?

**Event Bubbling** is a concept where an event starts from the deepest target element (the one you clicked) and then propagates or "bubbles up" to its parent elements in the DOM tree until it reaches the window.



---

### 4. What is Event Delegation in JavaScript? Why is it useful?
**Event Delegation** is a technique of adding a single event listener to a parent element to manage events for all its current and future child elements.

* **Why it's useful:** It improves performance by using less memory and automatically handles events for elements added dynamically (via JavaScript) after the page loads.

---

### 5. What is the difference between preventDefault() and stopPropagation() methods?

1. **`preventDefault()`** method Stops the **default action** of an element (  form from reloading the page or a link from navigating).
2. **`stopPropagation()`** method Stops the **event from bubbling up** to parent elements, preventing their event handlers from being triggered. 

---

