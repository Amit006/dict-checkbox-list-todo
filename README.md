# Todo List & Directory Manager with Hierarchical Checkboxes 🗂️✅

[![GitHub license](https://img.shields.io/github/license/Amit006/dict-checkbox-list-todo)](https://github.com/Amit006/dict-checkbox-list-todo/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Amit006/dict-checkbox-list-todo)](https://github.com/Amit006/dict-checkbox-list-todo/stargazers)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

A sophisticated task management system combining todo list functionality with directory-style grouping, featuring intelligent parent-child checkbox relationships and persistent local storage.

![Application Preview](screenshot.png) <!-- Replace with actual screenshot -->

## Features ✨

### 📝 Todo List
- **Add tasks** with Enter key
- **Toggle completion** with checkboxes
- **Delete tasks** permanently
- **Persistent storage** across sessions

### 🗂️ Directory Listing
- **Hierarchical group structure** visualization
- **Smart checkbox propagation**:
  - Parent selection ➔ All children checked
  - All children checked ➔ Parent auto-checked
  - Partial selection ➔ Indeterminate parent state
- **Visual hierarchy** with indentation
- **Bulk operations** through parent checkboxes

### 🎛️ Advanced Functionality
- State persistence using Local Storage
- Responsive design for all screen sizes
- Clean, minimalist user interface
- Error-free keyboard interactions

## Technologies Used 🛠️
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Management**: Nested dictionary structures
- **State Persistence**: Browser Local Storage API
- **UI Patterns**: Component-based organization

## Getting Started 🚀

### Prerequisites
- Modern web browser (Chrome 80+, Firefox 72+, Edge 80+)
- Git (for development)

### Installation
```bash
git clone https://github.com/Amit006/dict-checkbox-list-todo.git
cd dict-checkbox-list-todo
npm run dev
```
Key Implementation Details 🔍
Data Structure
```javascript
{
  "group-1": {
    "name": "Work Tasks",
    "state": "indeterminate",
    "items": {
      "task-1": { "text": "Project Setup", "completed": true },
      "task-2": { "text": "API Documentation", "completed": false }
    }
  }
}
```
Checkbox Logic
```javascript
function updateParentState(groupId) {
  const group = data[groupId];
  const children = Object.values(group.items);
  
  const completedCount = children.filter(item => item.completed).length;
  
  if (completedCount === 0) {
    group.state = 'unchecked';
  } else if (completedCount === children.length) {
    group.state = 'checked';
  } else {
    group.state = 'indeterminate';
  }
}
```

Contributing 🤝:
 - Contributions are welcome! Please follow these guidelines:

 - Fork the repository
 - Create a feature branch (git checkout -b feature/your-feature)
 - Commit changes (git commit -m 'Add some feature')
 - Push to branch (git push origin feature/your-feature)
 - Open a Pull Request
 - Please ensure tests are added for new features.

License 📄:
 - This project is licensed under the MIT License - see LICENSE for details.

Made with ❤️ by Amit
