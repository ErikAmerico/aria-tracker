<p align="center">
  <img src="./assets/banner.png" alt="Visitation Scheduler banner" width="100%" />
</p>

<p>
  <a href="https://visitaria.dad">
    <img src="https://img.shields.io/badge/🌐 Visit%20Live%20Site-0088ff?style=for-the-badge&logo=internet-explorer&logoColor=white" alt="Visit Live Site" />
  </a>
</p>

<br />

Aria Tracker is a visitor scheduling calendar — presented here as **Visitation Scheduler** for clarity.

Originally built to manage hospital visits for Aria, this app includes two modes:

- 🥳 **Celebration Mode (Static):** Created after Aria’s hospital discharge ❤️, this version shows a hardcoded visit history (pulled from the Neon database) with celebratory confetti effects.
- 📅 **Live Calendar Mode (Legacy):** A fully interactive version with database integration, guest management, and real-time updates via Pusher. It's still available for future use or demo purposes.

No login required — it's designed to be fast, friendly, and mobile-ready.

### ✨ Features

- 📅 **Time-block scheduling**
- ⚡ **Real-time updates** with Pusher (legacy mode)
- 🥳 **Confetti animations** (celebration mode)
- ✅ **Visitor-specific editing**
- 📱 **Mobile-friendly**
- 🔐 **Client-only identification** (via localStorage)

### 🧑‍💻 Built With

| Frontend                                                                                                          | Backend / Infra                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)               | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)             |
| ![Next.js](https://img.shields.io/badge/Next.js-333333?style=for-the-badge&logo=nextdotjs&logoColor=white)        | ![Pusher](https://img.shields.io/badge/PUSHER-4A148C?style=for-the-badge&logo=pusher&logoColor=white)             |
| ![📅 FullCalendar](https://img.shields.io/badge/📅%20FullCalendar-f6c259?style=for-the-badge&logoColor=black)     | ![Vercel](https://img.shields.io/badge/Vercel-333333?style=for-the-badge&logo=vercel&logoColor=white)             |
| ![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)                      | <img src="./assets/neon.png" height="26" alt="Neon Logo" />                                                       |
| ![🎉 React Canvas Confetti](https://img.shields.io/badge/🎉%20react--canvas--confetti-ff69b4?style=for-the-badge) |                                                                                                                   |

### 🕹️ Using the App

|                                                                                                                                                                                                                                                   |                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| When you first visit the page, you'll be in Celebration Mode. You can explore previous dates to see who visited Aria. Click the <img src="./assets/infoIcon.png" alt="Info" width="20" /> icon next to "Aria's Visitors" to open the Info Dialog. | <img src="./assets/initialOpening.png" alt="Initial Opening" width="300" />                                     |
| <img src="./assets/liveCalendarBtn.png" alt="Live Calendar Button" width="300" />                                                                                                                                                                 | Click the "Live Calendar" button to switch to Live Calendar Mode and explore the full functionality of the app. |
| To create a time block, press and hold on a time slot, then drag to your desired start or end time. A pop-up will appear, allowing you to enter guest names. If left blank, the entry will default to "Aria's friend".                            | <img src="./assets/createTimeBlock.png" alt="Create Time Block" width="300" />                                  |
| <img src="./assets/filledOutCal.png" alt="Filled Calendar" width="300" />                                                                                                                                                                         | Here's an example of the calendar with a few time blocks filled in.                                             |
| While in Live Calendar Mode, you can return to Celebration Mode at any time by clicking the "Celebration" button in the Info Dialog.                                                                                                              | <img src="./assets/celebrationBtn.png" alt="Celebration Button" width="300" />                                  |

### 🙏 Acknowledgments

This project was inspired by my daughter Aria, during her time in the hospital. Due to visitation limits, only a certain number of people could be with her at once — which made scheduling difficult.

We needed a simple way for both sides of our family to coordinate visits without constantly messaging us, and without us manually juggling everyone’s availability. This app made that possible — and helped us focus on Aria instead of logistics.

It’s a small project with a big heart: built to bring structure to chaos, and make sure no visit was missed.
