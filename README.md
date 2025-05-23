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

---

### 🧑‍💻 Built With

<table>
    <tr>
    <td valign="top">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
        <br/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/Next.js-333333?style=for-the-badge&logo=nextdotjs&logoColor=white" />
        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/📅 FullCalendar-f6c259?style=for-the-badge&logoColor=black" />
        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.shields.io/badge/🎉 react--canvas--confetti-ff69b4?style=for-the-badge" />
    </td>
    <td valign="top">
        <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
        <br/>
        <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
        <br />
        <img src="https://img.shields.io/badge/PUSHER-4A148C?style=for-the-badge&logo=pusher&logoColor=white" alt="Pusher Badge" />
        <br />
        <img src="https://img.shields.io/badge/Vercel-333333?style=for-the-badge&logo=vercel&logoColor=white" />
        <br />
       <img src="./assets/neon.png" height="26" alt="Neon Logo" />
    </td>
    </tr>
</table>

---

### 🕹️ Using the App

<table>
  <tr>
    <td align="center">
      When you first visit the page, you'll be in Celebration Mode. <br /> <br />
     You can explore previous dates to see who visited Aria. <br /> <br />
      Click the <img src="./assets/infoIcon.png" alt="Info" width="20" /> icon next to "Aria's Visitors" to open the Info Dialog.
    </td>
    <td align="center">
      <img src="./assets/initialOpening.png" alt="Initial Opening"   height="500" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./assets/liveCalendarBtn.png" alt="Initial Opening" height="500" />
    </td>
    <td align="center">
     Click the "Live Calendar" button to switch to Live Calendar Mode and explore the full functionality of the app.
    </td>
  </tr>
  <tr>
    <td align="center">
     To create a time block, press and hold on a time slot, then drag to your desired start or end time. <br /><br />
      A pop-up will appear, allowing you to enter guest names. If left blank, the entry will default to "Aria's friend".
    </td>
    <td align="center">
      <img src="./assets/createTimeBlock.png" alt="Initial Opening"   height="500" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./assets/filledOutCal.png" alt="Initial Opening" height="500" />
    </td>
    <td align="center">
   Here's an example of the calendar with a few time blocks filled in.
    </td>
  </tr>
  <tr>
    <td align="center">
     While in Live Calendar Mode, you can return to Celebration Mode at any time by clicking the "Celebration" button in the Info Dialog.
    </td>
    <td align="center">
      <img src="./assets/celebrationBtn.png" alt="Initial Opening"   height="500" />
    </td>
  </tr>
</table>

### 🙏 Acknowledgments

This project was inspired by my daughter Aria, during her time in the hospital. Due to visitation limits, only a certain number of people could be with her at once — which made scheduling difficult.

We needed a simple way for both sides of our family to coordinate visits without constantly messaging us, and without us manually juggling everyone’s availability. This app made that possible — and helped us focus on Aria instead of logistics.

It’s a small project with a big heart: built to bring structure to chaos, and make sure no visit was missed.
