# Brain Fit – Interactive Memory Games

**Brain Fit** is an interactive web application designed to train short-term memory and cognitive skills through two mini-games:

🧠 **Visual Memory**  
🔢 **Number Memory**

The project implements authentication, dynamic scoring, responsive layouts and real-time feedback — built entirely with **HTML, CSS, and JavaScript**.

Live Site: https://sori678.github.io/Brain-Fit/  
GitHub Repository: https://github.com/Sori678/Brain-Fit

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
- [Acknowledgements](#acknowledgements)

---

## Project Overview

**Brain Fit** challenges users to memorize patterns, numbers, and track their best scores through a lightweight and accessible user interface.  
User accounts are created with **only a name or email**, and all progress is saved via **LocalStorage**.  
The site is fully responsive and accessible, ensuring a smooth user experience across devices.

---

## Strategy

The main goal is to help users improve memory while receiving immediate feedback and motivation through score tracking.

---

## Target Audience

- Students and professionals working on concentration and memory  
- Users who enjoy mini-games and mental challenges  
- Anyone who wants to train their brain without complex login systems

---

## User Stories

1. As a user, I want to start a game easily so I can play without confusion.  
2. As a user, I want to log in with minimal information so my scores are saved.  
3. As a user, I want to see my top results to track progress.  
4. As a user, I want the site to provide feedback after each round.  
5. As a user, I want the interface to be responsive and accessible.

---

## Design

### Colour Scheme
- Background: light, minimalistic  
- Primary highlight: blue  
- Feedback colors:  
  - Green = correct  
  - Red = wrong  
  - Yellow = warning

### Typography
- **Open Sans** – clean main font  
- **Bitcount Grid Single** – digital-style font for game titles

### Layout Structure
- **Header** with navigation and burger menu  
- **Main Section** containing both games  
- **Scoreboard panel** showing best results  
- **Registration modal** for user identification  
- **Footer** with contact details  

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

## Features

### 1. Visual Memory Game
- Random pattern of highlighted squares  
- Grid expands automatically every **7 levels**  
- Users must repeat the pattern  
- Provides instant feedback  
- Tracks top 3 scores  
- Saves progress locally  

### 2. Number Memory Game
- Shows a number briefly  
- Each level increases digits (1 → 2 → 3 …)  
- User must type the number exactly  
- Failure reveals the correct number  
- Tracks top 3 scores per user  

### 3. Authentication Modal
- Requests only **name or email**  
- Required before any game starts  
- Player is remembered automatically on next visits  

### 4. Scoreboard Panel
- Shows current user  
- Top 3 results per game  
- Switches between Visual/Number Memory automatically  

### 5. Responsive Design
- Fully optimized for phones, tablets, and desktops  
- Grid, buttons, and containers resize smoothly  

### 6. Accessibility
- Uses semantic elements  
- ARIA attributes (`aria-live`)  
- Keyboard friendly  
- Strong contrast and visible focus  

---

## Future Features

- Online leaderboard with database  
- Sound effects  
- Multiple difficulty modes  
- Customizable user profile  
- Export/import score history  

---

## Technologies Used

- **HTML5**  
- **CSS3**  
- **JavaScript (ES6)**  
- **LocalStorage API**  
- **Google Fonts**  
- **Font Awesome Icons**  
- **Git / GitHub** (version control)  
- **GitHub Pages** (deployment)  
- **JSHint**, **W3C Validators** (code quality)

---

## Testing

### Code Validation Results

| Language | Validator | Result |
|----------|-----------|--------|
| HTML | W3C Markup Validator | 0 Errors |
| CSS | W3C Jigsaw | 0 Errors |
| JS | JSHint | No major issues |

### Manual Testing

| Feature | Expected | Result |
|--------|----------|--------|
| Registration Modal | Prevents gameplay before login | ✔ Passed |
| Visual Memory | Highlights random cells | ✔ Passed |
| Number Memory | Increases digits each round | ✔ Passed |
| Scoreboards | Show top 3 results | ✔ Passed |
| Reset Buttons | Restart level 1 | ✔ Passed |
| Responsive Layout | Works on all screens | ✔ Passed |
| Accessibility | ARIA + keyboard controls | ✔ Passed |

---

## Data Model

Player data is stored in **localStorage** as JSON:

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
