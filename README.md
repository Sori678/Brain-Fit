# Brain Fit – Interactive Memory Games

**Brain Fit** is an interactive web application designed to train short-term memory and cognitive focus through two dynamic games:

🧠 Visual Memory  
🔢 Number Memory

Users can log in with just a name or email, track their best performances, and enjoy real-time feedback.  
The project is built using **HTML, CSS, and JavaScript**.

Live Site:  
👉 https://sori678.github.io/Brain-Fit/

GitHub Repository:  
👉 https://github.com/Sori678/Brain-Fit

---

## Table of Contents
- [Project Overview](#project-overview)
- [Strategy](#strategy)
- [Target Audience](#target-audience)
- [User Stories](#user-stories)
- [Design](#design)
- [Features](#features)
- [Future Features](#future-features)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Data Model](#data-model)
- [Deployment](#deployment)
- [Cloning the Repository](#cloning-the-repository)
- [Acknowledgements / Attribution](#acknowledgements--attribution)

---

## Project Overview

**Brain Fit** challenges users to memorize patterns and numbers while tracking their best scores.  
User accounts require only a name or email, and all progress is saved using **LocalStorage**.  
The interface is lightweight, responsive, and accessible across all devices.

---

## Strategy

The purpose of this project is to help users improve memory and concentration through short, engaging brain-training exercises.  
The structure encourages repeated play and reward through progressive difficulty and score tracking.

---

## Target Audience

- Students wishing to improve cognitive performance  
- Users who enjoy memory games  
- Anyone looking for simple brain-training activities  

---

## User Stories

1. As a user, I want to start a game easily so I can play without confusion.  
2. As a user, I want minimal login steps so that I can quickly begin.  
3. As a user, I want to track my best scores to monitor progress.  
4. As a user, I want immediate feedback after each round.  
5. As a user, I want the app to be responsive and accessible on all devices.

---

## Design

### Colour Scheme
- Light, minimal background  
- Blue accent colours  
- Feedback indicators:  
  - Green = correct  
  - Red = wrong  
  - Yellow = warning  

### Typography
- **Open Sans** – main UI font  
- **Bitcount Grid Single** – digital-style headings  

### Layout
- Header navigation  
- Main gameplay section  
- Scoreboard panel  
- Authentication modal  
- Footer  

### Wireframes / Screenshots
#### Home Page
![Home Page desktop](assets/images/homepage-desk.png)
![Home Page mobile](assets/images/homepage-mob.png)

#### Visual Memory Game
![Visual Memory Game desk](assets/images/visMemory-desk.png)
![Visual Memory Game mob](assets/images/visMemory-mob.png)

#### Number Memory Game
![Number Memory Game desk](assets/images/numbMem-desk.png)
![Number Memory Game mob](assets/images/numbMem-mob.png)
#### Authentication Modal
![Auth Modal](assets/images/logIn.png)

---

## Features

### 🎮 Visual Memory Game
- Highlights a random sequence of squares  
- Grid expands every **7 levels**  
- User repeats the pattern  
- Lives system provides fairness  
- Top 3 scores saved via LocalStorage  

### 🔢 Number Memory Game
- Displays a number briefly  
- Each level adds more digits  
- User must type the exact number  
- Top 3 scores saved for each user  

### 🔐 Authentication Modal
- Requires only name or email  
- User remembered automatically (LocalStorage)  

### 🏆 Scoreboard Panel
- Displays top 3 scores for both games  
- Shows highest level reached  
- Highlights current user  

### 📱 Responsive Design
- Works on all screen sizes  
- Fluid layout and buttons  

### ♿ Accessibility
- Semantic structure  
- ARIA attributes  
- Keyboard navigation support  

---

## Future Features

- Online global leaderboard  
- Sound effects  
- Difficulty settings  
- Player avatars and profiles  
- Score export/import  

---

## Technologies Used

- **HTML5**  
- **CSS3**  
- **JavaScript (ES6)**  
- **LocalStorage API**  
- **Google Fonts**  
- **Font Awesome**  
- **Git / GitHub**  
- **GitHub Pages**  
- **W3C Validators, JSHint**

---

## Testing

### Code Validation

| Language | Validator | Result |
|----------|-----------|--------|
| HTML | W3C Markup Validator | ✔ 0 errors |
| CSS | W3C Jigsaw | ✔ 0 errors |
| JS | JSHint | ✔ no major issues |

### Manual Testing

| Feature | Expected Result | Outcome |
|--------|----------------|---------|
| Login Modal | Blocks gameplay before login | ✔ Passed |
| Visual Memory | Pattern displays correctly | ✔ Passed |
| Number Memory | Digits increase each level | ✔ Passed |
| Scoreboard | Shows top scores | ✔ Passed |
| Reset buttons | Restart level 1 | ✔ Passed |
| Error Handling | Feedback messages work | ✔ Passed |
| Responsive Layout | Functional on all devices | ✔ Passed |
| Accessibility | Works with keyboard navigation | ✔ Passed |

---

## Data Model

The player data structure stored in **LocalStorage**:

```json
{
  "email:john@example.com": {
    "id": "email:john@example.com",
    "name": "John",
    "records": {
      "visualMemory": { "highLevel": 7, "top": [7, 6, 5] },
      "numberMemory": { "highLevel": 5, "top": [5, 4, 3] }
    }
  }
}
```

---

## Deployment

The project was deployed using **GitHub Pages**.

### Deployment Steps

1. Open the repo:  
   https://github.com/Sori678/Brain-Fit
2. Go to **Settings > Pages**
3. Under **Source**, select:  
   - **Branch:** `main`  
   - **Folder:** `/root`
4. Click **Save**
5. GitHub generates the live link:  
   https://sori678.github.io/Brain-Fit/

### Running Locally

Clone the repository:

```
git clone https://github.com/Sori678/Brain-Fit.git
```

Then open `index.html` in your browser.

---

## Cloning the Repository

```
git clone https://github.com/Sori678/Brain-Fit.git
```

---

## Acknowledgements / Attribution

External resources used:

- **Google Fonts** – typography  
- **Font Awesome** – icons  
- **MDN Web Docs** – documentation for JavaScript behaviour  
- **StackOverflow** – conceptual help (no direct code copied)  
- **YouTube tutorials** – inspiration for memory game mechanics (no code copied)  

All HTML, CSS, and JavaScript code in this project was fully written by me.  
No external code has been copied without attribution, in accordance with Code Institute’s academic integrity policy.

